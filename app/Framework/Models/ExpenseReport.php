<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class ExpenseReport {
    public static function GetAll($request, $response) {
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
        $offset = ($page - 1) * $limit;
        $search = isset($_GET['search']) ? trim($_GET['search']) : "";
        $q = <<<query
            select er.*, a.id as agent_id, concat(a.name, ' ', a.surname) as agent_name, a.branch_id, b.name as branch_name 
            from expense_report_agent as er 
            left join agent as a on er.agent = a.id
            left join branch as b on a.branch_id = b.id
        query;
        $params = [];
        if (!empty($search)) {
            $q .= " WHERE (
                er.value LIKE '%$search%' 
                OR er.reason LIKE '%$search%' 
                OR b.name LIKE '%$search%' 
                OR CONCAT(a.name, ' ', a.surname) LIKE '%$search%')
                ";
        }
        $q .= " ORDER BY er.dt desc LIMIT $limit OFFSET $offset";
        $er = DB::Query($q, $params);
        $countQuery = "SELECT COUNT(*) FROM expense_report as c";
        if (!empty($search)) $countQuery .= " WHERE (c.value LIKE '%$search%' OR c.reason LIKE '%$search%') ";
        $totalRecords = DB::Query($countQuery)[0]['COUNT(*)'];
        $response->getBody()->write(json_encode(["payload" => $er, "totalCount" => $totalRecords]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetItem($request, $response) {
        $q = <<<query
            select er.*, concat(a.name, ' ', a.surname) as agent_name 
            from expense_report as er 
            inner join agent as a on er.agent = a.id
            inner join user as u on u.id = er.ucr
            where er.id = ?
        query;
        $rows = DB::Query($q, [$request->getAttribute('id')]);
        if(count($rows) == 0) throw new Exception("Expense report not found", 400);
        $response->getBody()->write(json_encode(['payload' => $rows[0]]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Add($request, $response) {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $data = json_decode($request->getBody()->getContents(), true);
        $date = $data['date'] ?? "";
        $agent_id = $data['agent_id'] ?? 0;
        $cost = $data['cost'] ?? 0;
        $reason = $data['reason'] ?? "";
        $q = "INSERT INTO expense_report_agent (agent, dt, reason, value, ucr) VALUES (?,?,?,?,?)";
        $params = [$agent_id, $date, $reason, $cost, $user_id];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error while insert expense report", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Edit($request, $response) {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $id = $request->getAttribute('id');
        if (!$id) throw new Exception('Expense Report ID is required', 400);
        $data = json_decode($request->getBody()->getContents(), true);
        $date = $data['date'] ?? "";
        $agent_id = $data['agent_id'] ?? 0;
        $cost = $data['cost'] ?? 0;
        $reason = $data['reason'] ?? "";
        $q = 'UPDATE expense_report_agent SET agent = ?, dt = ?, reason = ?, value = ?, ucr = ? WHERE id = ?';
        $params = [$agent_id, $date, $reason, $cost, $user_id, $id];
        $row_affected = DB::Execute($q, $params);
        if($row_affected == 0) throw new Exception("Error while updating expene report", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Delete($request, $response) {
        $id = $request->getAttribute('id');
        if (!$id) throw new Exception('Expense report ID is required', 400);
        $q = "DELETE from expense_report_agent WHERE id = ?";
        $params = [$id];
        $row_affected = DB::Execute($q, $params);
        if($row_affected == 0) throw new Exception("Error while deleting the expense report", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    /**
     * @throws Exception
     */
    public static function GetAllBranches($request, $response) {
        $rows = DB::Query('select * from branch');
        $response->getBody()->write(json_encode(['payload' => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    /**
     * @throws Exception
     */
    public static function GetAgentsByBranchId($request, $response) {
        $rows = DB::Query('select * from agent where enabled = 1 and branch_id = ?', [$request->getAttribute('id')]);
        $response->getBody()->write(json_encode(['payload' => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}