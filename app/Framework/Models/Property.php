<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class Property
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
        $branch_id = isset($_GET['branch_id']) ? intval($_GET['branch_id']) : 1;
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
        $offset = ($page - 1) * $limit;
        $search = isset($_GET['search']) ? trim($_GET['search']) : "";
        // TODO CONFIRM THE QUERY TO SELECT THE RELEVANT DATA...
        $q = <<<query
            SELECT
                p.*,
                pa.name AS purchase_agent_name,
                pa.surname AS purchase_agent_surname,
                psa.name AS purchase_subagent_name,
                psa.surname AS purchase_subagent_surname,
                sa.name AS sale_agent_name,
                sa.surname AS sale_agent_surname,
                ssa.name AS sale_subagent_name,
                ssa.surname AS sale_subagent_surname
            FROM property AS p
            LEFT JOIN agent AS pa ON pa.id = p.purchase_agent
            LEFT JOIN agent AS psa ON psa.id = p.purchase_subagent
            LEFT JOIN agent AS sa ON sa.id = p.sale_agent
            LEFT JOIN agent AS ssa ON ssa.id = p.sale_subagent
            WHERE p.branch_id = ?;
        query;
        $params = [$branch_id];
        // if($user_role < Role::STAFF) {
        //     $q .= " where c.agent = ?";
        //     $params[] = $user_id;
        // }
        if (!empty($search)) {
            $q .= " AND (
                p.address LIKE '%$search%' 
                OR p.city LIKE '%$search%' 
                ";
        }
        $q .= " ORDER BY p.address LIMIT $limit OFFSET $offset";
        $agents = DB::Query($q, $params);

        $countQuery = "SELECT COUNT(*) FROM property as p WHERE p.branch_id = ?";
        if (!empty($search)) {
            $countQuery .= " AND (
                c.address LIKE '%$search%' 
                OR c.city LIKE '%$search%')
                ";
        }
        $totalRecords = DB::Query($countQuery)[0]['COUNT(*)'];

        $response->getBody()->write(json_encode(["payload" => $agents, "totalCount" => $totalRecords]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
