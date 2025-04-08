<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class Package {
    /**
     * @throws Exception
     */
    public static function GetAll($request, $response) {
        $q = <<<query
            select 
                p.*, 
                (select count(*) from agent where package_id = p.id) as tot_agents
            from package as p
            order by p.name
        query;
        $packages = DB::Query($q);
        $response->getBody()->write(json_encode(["payload" => $packages]));
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
            $params = [$name, $fixed_cost, $percentage, $note, $user_id];
            $row_affected = DB::Execute($q, $params);
            if($row_affected == 0) throw new Exception("Error inserting package", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to add package: ' . $e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public static function GetItem($request, $response) {
        $package_id = (int)$request->getAttribute('id');
        $rows = DB::Query("select * from package where id = ?", [$package_id]);
        if(count($rows) == 0) throw new Exception("Package not found", 400);
        $response->getBody()->write(json_encode(["payload" => $rows[0]]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    public static function Edit($request, $response) {
        try {
            $id = $request->getAttribute('id');
            if (!$id) throw new Exception('Package ID is required', 400);
            $data = json_decode($request->getBody()->getContents(), true);
            $name = $data['name'] ?? "";
            $fixed_cost = $data['fixed_cost'] ?? 0;
            $percentage = $data['percentage'] ?? 0;
            $note = $data['note'] ?? "";
            if(empty($name)) throw new Exception('Name field required', 400);
            $q = 'UPDATE package SET name = ?, fixed_cost = ?, percentage = ?, note = ? WHERE id = ?';
            $params = [$name, $fixed_cost, $percentage, $note, $id];
            $row_affected = DB::Execute($q, $params);
            if($row_affected == 0) throw new Exception("Error while updating package", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to update the package details: ' . $e->getMessage());
        }
    }
    
    public static function Delete($request, $response) {
        try {
            $id = $request->getAttribute('id');
            if (!$id) throw new Exception('Package ID is required', 400);
            $q = "DELETE from package WHERE id = ?";
            $params = [$id];
            $row_affected = DB::Execute($q, $params);
            if($row_affected == 0) throw new Exception("Error while deleting the package", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to delete the package: ' . $e->getMessage());
        }
    }
    
    public static function GetLinkedAgents($request, $response) {
        try {
            $id = $request->getAttribute('id');
            if (!$id) throw new Exception('Package ID is required', 400);
            $q = "SELECT * from agent WHERE package_id = ?";
            $params = [$id];
            $linkedAgents = DB::Query($q, $params);
            $response->getBody()->write(json_encode(["payload" => $linkedAgents]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to get the linked agents: ' . $e->getMessage());
        }
    }
}