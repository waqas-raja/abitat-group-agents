<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class Agent {
    /**
     * @throws Exception
     */
    public static function GetAll($request, $response) {
        $branch = isset($_GET['b']) ? intval($_GET['b']) : 1;
        $q = <<<query
            select 
                c.*, 
                p.name as package_name, 
                p.percentage as package_percentage, 
                p.fixed_cost as package_fixed_cost,
                0 as managed_properties,
                0 as properties_sold,
                0 as total_sales,
                0 as total_commissions
            from agent as c
            LEFT JOIN package as p on p.id = c.package_id 
            WHERE c.enabled = 1 and c.branch_id = ?
        query;
        $params = [$branch];
        $agents = DB::Query($q, $params);
        $response->getBody()->write(json_encode(["payload" => $agents]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetItem($request, $response) {
        $agent_id = (int)$request->getAttribute('id');
        $q = <<<query
            select 
                a.*,
                b.name as branch_name,
                p.name as package_name,
                p.fixed_cost as package_fixed_cost,
                p.percentage as package_percentage,
                p.dtcr as package_start
            from agent as a
            inner join branch as b on b.id = a.branch_id
            inner join package as p on p.id = a.package_id
            where a.id = ?
        query;
        $rows = DB::Query($q, [$agent_id]);
        if(count($rows) == 0) throw new Exception("Agent not found", 400);
        $response->getBody()->write(json_encode(["payload" => $rows[0]]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Delete($request, $response) {
        $aid = (int)$request->getAttribute('id');
        $row_affected = DB::Execute("update agent set enabled = 0 where id = ?", [$aid]);
        if ($row_affected == 0) throw new Exception("Error while deleting the agent", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Add($request, $response) {
        try {
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $user_role = $token_info['role'];
            $data = json_decode($request->getBody()->getContents(), true);
            $name = $data['name'] ?? "";
            $surname = $data['surname'] ?? "";
            $package_id = $data['package_id'] ?? 0;
            $branch_id = $data['branch_id'] ?? 0;
            $q = "INSERT INTO agent(name, surname, branch_id, package_id, ucr) VALUES (?,?,?,?,?)";
            $params = [$name, $surname, $branch_id, $package_id, $user_id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while insert agent", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to add agent: ' . $e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public static function Update($request, $response) {
        $aid = (int)$request->getAttribute('id');
        $data = json_decode($request->getBody()->getContents(), true);
        $name = $data['name'] ?? "";
        $surname = $data['surname'] ?? "";
        $package_id = $data['package_id'] ?? 0;
        $branch_id = $data['branch_id'] ?? 0;
        $phone = $data['phone'] ?? "";
        $email = $data['email'] ?? "";
        $q_check = 'SELECT name, surname, branch_id, phone, email, package_id FROM agent WHERE id = ?';
        $curr = DB::Query($q_check, [$aid]);
        if(!$curr) throw new Exception("Agent $aid not found", 404);
        $curr = $curr[0];
        if(
            $curr['name'] === $name &&
            $curr['surname'] === $surname &&
            $curr['branch_id'] == $branch_id &&
            $curr['phone'] === $phone &&
            $curr['email'] === $email &&
            $curr['package_id'] == $package_id
        ) {
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        }
        $q = 'UPDATE agent SET name = ?, surname = ?, branch_id = ?, phone = ?, email = ?, package_id = ? WHERE id = ?';
        $params = [$name, $surname, $branch_id, $phone, $email, $package_id, $aid];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error while updating agent", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    private static function GetColumns(bool $restricted = true): array {
        $rows = DB::Query("show columns from contact");
        $restricted_values = ['id', 'ucr', 'ule', 'dtcr', 'dtle', 'agent', 'list_id'];
        $columns = [];
        foreach ($rows as $row) {
            $column_name = $row['Field'];
            if ($restricted) {
                if (!in_array($column_name, $restricted_values))
                    $columns[] = $column_name;
            } else $columns[] = $column_name;
        }
        return $columns;
    }
}
