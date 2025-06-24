<?php
namespace App\Framework\Models;

use App\Framework\Tools\BrevoManager;
use App\Framework\Tools\DB;
use DateInterval;
use DateTime;
use DateTimeZone;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Random\RandomException;
use GuzzleHttp\Client;

final class User {
    /**
     * @throws Exception
     */
    public static function GetTokenInfo($request): array  {
        $jwtSecret = getenv('JWT_SECRET');
        $tokenCookie = $_COOKIE['token'] ?? '';
        if(empty($tokenCookie)) throw new Exception('Token not found', 401);
        $decoded = JWT::decode($tokenCookie, new Key($jwtSecret, 'HS256'));
        return (array)$decoded;
    }

    /**
     * @throws RandomException
     * @throws Exception
     */
    public static function SignIn($request, $response) {
        $body = $request->getBody()->getContents();
        $data = json_decode($body, true);
        $email = $data['email'] ?? '';
        $psw = $data['psw'] ?? '';
        $ip = $data['ip'] ?? '';
        $mobile = $data['mobile'] ?? '';
        $os = $data['os'] ?? '';
        if(empty($email) || empty($psw)) throw new Exception('Email and password are required', 400);
        $q = "SELECT u.id, u.name, u.role_id, u.location FROM user as u WHERE u.email = ? AND u.psw = ?";
        $rows = DB::Query($q, [$email, sha1($psw)]);
        if(count($rows) == 0) throw new Exception('Invalid email or password', 401);
        if(count($rows) > 1) throw new Exception("Invalid number of users with the same email", 500);
        $u = $rows[0];
        $payload = [
            'id' => $u['id'],
            'name' => $u['name'],
            'role' => $u['role_id'],
            'exp' => time() + 3600 * 24, // 1D
        ];
        $jwtSecret = getenv('JWT_SECRET');
        $token = JWT::encode($payload, $jwtSecret, 'HS256');
        $host = explode(':', $_SERVER["HTTP_HOST"])[0];
        // set token cookie
        $cookieParams = [
            'expires' => time() + 3660 * 24,
            'path' => '/',
            'domain' => $host,
            'secure' => ($host !== 'localhost' && $host !== '127.0.0.1'),
            'httponly' => true
        ];
        setcookie('token', $token, $cookieParams);
        $response->getBody()->write(json_encode(['name' => $u['name'], 'role' => $u['role_id'], 'location' => $u['location']]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function AuthRenew($request, $response) {
        $body = $request->getBody()->getContents();
        $data = json_decode($body, true);
        $refresh_token = $data['refresh_token'] ?? '';
        $q = "select token from user_session where token = ?";
        $rows = DB::Query($q, [$refresh_token]);
        if(count($rows) == 0) throw new Exception('Invalid refresh token', 401);
        if(count($rows) > 1) throw new Exception("Invalid number of users with the same refresh token", 500);
        $token_info = self::GetTokenInfo($request);
        $jwtSecret = getenv('JWT_SECRET');
        $payload = [
            'id' => $token_info['id'],
            'name' => $token_info['name'],
            'role' => $token_info['role'],
            'exp' => time() + 3600, // 1H
        ];
        $token = JWT::encode($payload, $jwtSecret, 'HS256');
        $response->getBody()->write(json_encode(['token' => $token]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function AuthValidate($request, $response) {
        $token_info = self::GetTokenInfo($request);
        $response->getBody()->write(json_encode(["is_valid" => !empty($token_info)]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws RandomException
     * @throws Exception
     */
    public static function PasswordRecoveryRequest($request, $response) {
        try {
            $body = $request->getBody()->getContents();
            $data = json_decode($body, true);
            $email = $data['email'] ?? '';
            if (empty($email)) throw new Exception('Email empty', 400);
            $request_code = BrevoManager::generateCode(32);
            $row_affected = DB::Execute("update user set request_code = ? where email = ?", [$request_code, $email]);
            if ($row_affected == 0) throw new Exception("Email $email not found in database", 400);
            // Fetch the password recovery template
            $templatePath = 'static/template/psw-recovery.html';
            if (!is_readable($templatePath)) throw new Exception("Cannot read the email template at path: {$templatePath}");
            $emailContent = file_get_contents($templatePath);
            $link = getenv('URL_SITE') . "/psw-recovery?code={$request_code}";
            $emailContent = str_replace('[LINK]', $link, $emailContent);
            $isEmailSent = BrevoManager::email($email, $emailContent);
            if (!$isEmailSent) throw new Exception("Failed to send the password recovery email.");
            $response->getBody()->write(json_encode(['result' => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $ex) {
            error_log($ex->getMessage());
            $response->getBody()->write(json_encode(['result' => false]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    public static function PasswordRecoveryChange($request, $response) {
        try {
            $body = $request->getBody()->getContents();
            $data = json_decode($body, true);
            $ip = $data["ip"] ?? "";
            $code = $data["code"] ?? "";
            $psw = $data["psw"] ?? "";
            $confirm = $data["confirm"] ?? "";
            if($ip == "" ||  $code == "" || $psw == "" || $confirm == "")
                throw new Exception("Missing arguments", 400);
            if($psw != $confirm)
                throw new Exception("Passwords do not match", 400);
            $q = "update user set psw = sha1(?), request_code = '' where request_code = ?";
            $row_affected = DB::Execute($q, [$psw, $code]);
            if($row_affected == 0) {
                DB::Execute("insert into attempt_failed (ip) values (?)", [$ip]);
                throw new Exception("Error updating user password", 500);
            }
            $response->getBody()->write(json_encode(['result' => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $ex) {
            error_log($ex->getMessage());
            $response->getBody()->write(json_encode(['result' => false]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws RandomException
     * @throws Exception
     */
    public static function ResetPassword($request, $response) {
        $token_info = self::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $data = json_decode($request->getBody()->getContents(), true);
        $emailTo = $data['email'] ?? '';
        if($emailTo === '') throw new Exception("Email address is needed to send new pasword", 500);
        $query = "SELECT id, name, surname from user where email = ?";
        $row = DB::Query($query, [$emailTo]);
        if (empty($row)) throw new Exception("L'e-mail fornita non è disponibile nel sistema", 500);
        $rnd_psw = bin2hex(random_bytes(16));
        // $rnd_psw = 'Test123#';
        $q = "update user set psw = sha1(?), force_change_psw = 1 where id = ?";
        $params = [$rnd_psw, $row[0]['id']];
        $row_affected = DB::Execute($q, $params);
        if($row_affected == 0) throw new Exception("Error updating user password", 500);
        $name = $row[0]['name'] . ' ' . $row[0]['surname'];
        //TODO send transactional email with new psw
        // Load environment variables
        $API_KEY = getenv('BREVO_PSW');
        $SENDER_EMAIL = getenv('BREVO_USER');
        $SENDER_NAME = getenv('BREVO_USER');
        $BASE_URI = getenv('URL_SITE');
        
        $client = new Client([
            'base_uri' => $BASE_URI,
            'verify' => false,
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'api-key' => $API_KEY
            ]
        ]);
        
        $body = [
            'sender' => [
                'name' => $SENDER_NAME,
                'email' => $SENDER_EMAIL
            ],
            'to' => [
                [
                    'email' => $emailTo,
                    'name' => $name
                ]
            ],
            'subject' => 'Your New Password',
            'htmlContent' => "<p>Hello $name,</p>
                              <p>Your new password is: <b>$rnd_psw</b></p>
                              <p>Please change it after logging in.</p>"
        ];
        
        try {
            $res = $client->post('smtp/email', [
                'json' => $body
            ]);
            $response->getBody()->write(json_encode(['result' => true]));
        } catch (\Exception $e) {
            $errorMessage = "Error sending email: " . $e->getMessage();
            $response->getBody()->write(json_encode(['result' => false, "errorMessage" => $errorMessage]));
        }
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetAll($request, $response) {
        $token_info = self::GetTokenInfo($request);
        if($token_info['role'] < Role::STAFF) throw new Exception('Unauthorized request', 401);
        $q = <<<query
            select u.id, u.name, u.surname, concat(u.name, ' ', u.surname) as full_name, u.email, r.id as role_id, r.name as role_name 
            from user as u 
            inner join `td_role` as r on r.id = u.role_id
            order by u.role_id desc, u.surname
        query;
        $rows = DB::Query($q);
        $response->getBody()->write(json_encode(['payload' => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Dashboard($request, $response) {
        $token_info = self::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $data = [
            "charts_info" => ContactList::GetChartInfo($user_id, $user_role),
            "calls" => ContactActivity::GetCalls($user_id, $user_role)
        ];
        $response->getBody()->write(json_encode(["payload" => $data]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Add($request, $response) {
        $token_info = self::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        if($user_role < Role::STAFF) throw new Exception('Unauthorized request', 401);
        $data = json_decode($request->getBody()->getContents(), true);
        $name = $data['name'] ?? "";
        $surname = $data['surname'] ?? "";
        $email = $data['email'] ?? "";
        $role_id = $data['role'] ?? "";
        $location_id = $data['location'] ?? null;
        if(empty($name) || empty($surname) || empty($email))
            throw new Exception('Name, surname and email are required', 400);
        if(!in_array($role_id, Role::ToList()))
            throw new Exception('Role id is not allowed', 400);
        $rnd_psw = $data['password'] ?? bin2hex(random_bytes(16));
        $q = "insert into user (name, surname, email, role_id, location, psw, force_change_psw, ucr, ule) values (?, ?, ?, ?, ?, sha1(?), 1, ?, ?)";
        $params = [$name, $surname, $email, $role_id, $location_id, $rnd_psw, $user_id, $user_id];
        $row_affected = DB::Execute($q, $params);
        if($row_affected == 0) throw new Exception("Error inserting user", 500);
        $response->getBody()->write(json_encode(["result" => true, "psw" => $rnd_psw]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Delete($request, $response) {
        $token_info = self::GetTokenInfo($request);
        $user_role = $token_info['role'];
        if($user_role < Role::STAFF) throw new Exception('Unauthorized request', 401);
        $id = (int)$request->getAttribute('id');
        $q = "delete from user where id = ?";
        $params = [$id];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error deleting user or user not found", 404);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetItem($request, $response) {
        $token_info = self::GetTokenInfo($request);
        $user_role = $token_info['role'];
        if ($user_role < Role::STAFF) throw new Exception('Unauthorized request', 401);
        $id = (int)$request->getAttribute('id');
        $q = "select * from user where id = ?";
        $params = [$id];
        $rows = DB::Query($q, $params);
        if (count($rows) == 0) throw new Exception("User not found", 404);
        $response->getBody()->write(json_encode(["payload" => $rows[0]]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    /**
     * @throws Exception
     */
    public static function GetRoles($request, $response) {
        $rows = DB::Query("select * from td_role");
        if (count($rows) == 0) throw new Exception("Roles not found", 404);
        $response->getBody()->write(json_encode(["payload" => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Update($request, $response) {
        $token_info = self::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        if ($user_role < Role::STAFF) throw new Exception('Unauthorized request', 401);
        $id = (int)$request->getAttribute('id');
        $parsedBody = $request->getParsedBody();
        $name = $parsedBody['name'] ?? "";
        $surname = $parsedBody['surname'] ?? "";
        $email = $parsedBody['email'] ?? "";
        $q = "update user set name = ?, surname = ?, email = ?, ule = ? where id = ?";
        $params = [$name, $surname, $email, $user_id, $id];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error updating user", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetProfile($request, $response) {
        $token_info = self::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $q = "select name, surname, email from user where id = ?";
        $params = [$user_id];
        $rows = DB::Query($q, $params);
        if(count($rows) == 0) throw new Exception("Error retrieving user profile", 400);
        if(count($rows) > 1) throw new Exception("Invalid number of users with the same id", 400);
        $response->getBody()->write(json_encode(["payload" => $rows[0]]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws \DateMalformedStringException
     * @throws Exception
     */
    public static function UpdateCurrentUser($request, $response) {
        $token_info = self::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $data = json_decode($request->getBody()->getContents(), true);
        $dtle = date('Y-m-d H:i:s');
        $fields = [];
        $params = [];
        if (isset($data['name'])) { $fields[] = "name = ?"; $params[] = $data['name']; }
        if (isset($data['surname'])) { $fields[] = "surname = ?"; $params[] = $data['surname']; }
        if (isset($data['email'])) { $fields[] = "email = ?"; $params[] = $data['email']; }
        if (isset($data['role_id'])) { $fields[] = "role_id = ?"; $params[] = $data['role_id']; }
        if (isset($data['blocked'])) { $fields[] = "blocked = ?"; $params[] = $data['blocked']; }
        $fields[] = "ule = ?";
        $params[] = $user_id;
        $fields[] = "dtle = ?";
        $params[] = $dtle;
        $params[] = $user_id;
        $q = "UPDATE user SET " . implode(", ", $fields) . " WHERE id = ?";
        $row_affected = DB::Execute($q, $params);
        if($row_affected == 0) throw new Exception("Error updating user", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function ChangePassword($request, $response) {
        $token_info = self::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $data = json_decode($request->getBody()->getContents(), true);
        $old_psw = $data['old_psw'] ?? "";
        $new_psw = $data['new_psw'] ?? "";
        if($old_psw == $new_psw) throw new Exception('Old and new password are the same', 400);
        if(empty($old_psw) || empty($new_psw)) throw new Exception('Old and new password are required', 400);
        $q = "select id from user where id = ? and psw = sha1(?)";
        $params = [$user_id, $old_psw];
        $rows = DB::Query($q, $params);
        if(count($rows) == 0) throw new Exception('Invalid old password', 401);
        $q = "update user set psw = sha1(?) where id = ?";
        $params = [$new_psw, $user_id];
        $row_affected = DB::Execute($q, $params);
        if($row_affected == 0) throw new Exception("Error updating user password", 400);
        $response->getBody()->write(json_encode(['result' => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}