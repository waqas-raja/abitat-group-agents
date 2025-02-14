<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class Package {
    /**
     * @throws Exception
     */
    public static function GetAll($request, $response) {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $rows = DB::Query("select * from package order by name");
        $response->getBody()->write(json_encode(["payload" => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public static function Add($request, $response) {
        try {
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $user_role = $token_info['role'];
            $data = json_decode($request->getBody()->getContents(), true);
            $name = $data['name'] ?? "";
            $fixed_cost = $data['fixed_cost'] ?? 0;
            $percentage = $data['percentage'] ?? 0;
            $note = $data['note'] ?? "";
            if(empty($name))
                throw new Exception('Name field required', 400);
            $q = "INSERT INTO package(name, fixed_cost, percentage, note, ucr) VALUES(?,?,?,?,?)";
            $params = [$name, $fixed_cost, $percentage, $note, $user_id, $user_id];
            $row_affected = DB::Execute($q, $params);
            if($row_affected == 0) throw new Exception("Error inserting package", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to add package: ' . $e->getMessage());
        }
    }
}