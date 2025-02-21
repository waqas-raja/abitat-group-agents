<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class ExpenseReport {
    public static function GetAll($request, $response) {
        $q = <<<query
            select er.*, concat(a.name, ' ', a.surname) as agent_name 
            from expense_report as er 
            inner join agent as a on er.agent = a.id
        query;
        $rows = DB::Query($q);
        $response->getBody()->write(json_encode(['payload' => $rows]));
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
        throw new Exception('Not implemented', 400);
    }

    /**
     * @throws Exception
     */
    public static function Edit($request, $response) {
        throw new Exception('Not implemented', 400);
    }

    /**
     * @throws Exception
     */
    public static function Delete($request, $response) {
        throw new Exception('Not implemented', 400);
    }
}