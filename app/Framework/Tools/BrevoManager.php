<?php
namespace App\Framework\Tools;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

final class BrevoManager {
    public static function email(string $to, string $body): bool {
        $smtpHost = getenv('BREVO_SMTP');
        $smtpPort = getenv('BREVO_PORT');
        $smtpUser = getenv('BREVO_USER');
        $smtpPass = getenv('BREVO_PSW');
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host       = $smtpHost;
            $mail->SMTPAuth   = true;
            $mail->Username   = $smtpUser;
            $mail->Password   = $smtpPass;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = (int)$smtpPort;
            $mail->setFrom($smtpUser, 'Team Icon');
            $mail->addAddress($to);
            $mail->isHTML(true);
            $mail->Subject = 'Reset Password';
            $mail->Body    = $body;
            return $mail->send();
        } catch (\Exception $e) {
            error_log("Mailer Error: " . $mail->ErrorInfo);
            return false;
        }
    }

    public static function generateCode(int $length = 32): string {
        $chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $code = '';
        for ($i = 0; $i < $length; $i++) $code .= $chars[random_int(0, strlen($chars) - 1)];
        return $code;
    }

    public static function reset_password(int $uid): bool {
        $user = DB::Query("SELECT id, name, email FROM user WHERE id = ?", [$uid]);
        if (empty($user)) return false;
        $name  = $user[0]['name'];
        $email = $user[0]['email'];
        $code = self::generateCode(32);
        $n = DB::Execute("UPDATE user SET secure_code = ? WHERE id = ?", [$code, $uid]);
        if ($n !== 1) return false;
        $templatePath = __DIR__ . '/../../../static/template/change_password.html';
        if (!file_exists($templatePath)) return false;
        $template = file_get_contents($templatePath);
        $link = sprintf("/auth/change-psw?uid=%d&code=%s", $uid, $code);
        $body = str_replace(['{{name}}', '{{link}}'], [htmlspecialchars($name, ENT_QUOTES, 'UTF-8'), $link], $template);
        return self::email($email, $body);
    }
}
