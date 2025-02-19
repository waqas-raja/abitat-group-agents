<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class Agent
{
    /**
     * @throws Exception
     */
    public static function GetAll($request, $response)
    {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        //TODO MARCO
        // TODO
        $branch = isset($_GET['branch_id']) ? intval($_GET['branch_id']) : 1;
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
        $offset = ($page - 1) * $limit;
        $search = isset($_GET['search']) ? trim($_GET['search']) : "";

        $q = <<<query
            select c.*, p.name as package_name, p.percentage as package_percentage, p.note as package_note, p.fixed_cost as package_fixed_cost 
            from agent as c
            LEFT JOIN package as p on p.id = c.package_id 
            WHERE c.branch_id = ?
        query;

        $params = [$branch];
        // if($user_role < Role::STAFF) {
        //     $q .= " where c.agent = ?";
        //     $params[] = $user_id;
        // }
        if (!empty($search)) {
            $q .= " AND (
                c.surname LIKE '%$search%' 
                OR c.name LIKE '%$search%' 
                ";
        }
        $q .= " ORDER BY c.surname LIMIT $limit OFFSET $offset";
        $agents = DB::Query($q, $params);

        $countQuery = "SELECT COUNT(*) FROM agent as c WHERE c.branch_id = ?";
        if (!empty($search)) {
            $countQuery .= " AND (
                c.surname LIKE '%$search%' 
                OR c.name LIKE '%$search%' 
                OR c.fixed_cost LIKE '%$search%')
                ";
        }
        $totalRecords = DB::Query($countQuery)[0]['COUNT(*)'];

        $response->getBody()->write(json_encode(["payload" => $agents, "totalCount" => $totalRecords]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetItem($request, $response)
    {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $cid = (int)$request->getAttribute('id');
        //TODO MARCO
        $response->getBody()->write(json_encode(["payload" => []]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Delete($request, $response)
    {
        $token_info = User::GetTokenInfo($request);
        $user_role = $token_info['role'];
        $cid = (int)$request->getAttribute('id');
        //TODO MARCO
        $response->getBody()->write(json_encode(["result" => false]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Add($request, $response)
    {
        try {
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $user_role = $token_info['role'];
            $data = json_decode($request->getBody()->getContents(), true);
            $name = $data['name'] ?? "";
            $surname = $data['surname'] ?? "";
            $fixed_cost = $data['fixed_cost'] ?? 0;
            $package_id = $data['package_id'] ?? 0;
            $branch_id = $data['branch_id'] ?? 0;
            $q = "INSERT INTO agent(name, surname, branch_id, fixed_cost, package_id, ucr) VALUES (?, ?, ?, ?, ?, ?)";
            $params = [$name, $surname, $branch_id, $fixed_cost, $package_id, $user_id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error inserting agent", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to add agent: ' . $e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public static function Update($request, $response)
    {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $data = $request->getParsedBody();
        $cid = (int)$request->getAttribute('id');
        //TODO MARCO
        //        $columns_allowed = self::GetColumns($user_role < Role::STAFF);
        //        $q = "update contact set ";
        //        $params = [];
        //        foreach ($data as $key => $value) {
        //            if (in_array($key, $columns_allowed)) {
        //                $q .= "$key = ?, ";
        //                $params[] = $value;
        //            }
        //        }
        //        $q .= "ule = ?";
        //        $params[] = $user_id;
        //        $q .= " where id = ?";
        //        $params[] = $cid;
        //        $rows_affected = DB::Execute($q, $params);
        //        if($rows_affected == 0)
        //            throw new Exception("An error occurred while I was trying do update a contact", 500);

        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    private static function GetColumns(bool $restricted = true): array
    {
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
