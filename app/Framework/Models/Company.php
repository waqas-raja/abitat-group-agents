<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class Company {
    /**
     * @throws Exception
     */
    public static function GetAll($request, $response) {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $q = <<<query
            select
                c.id, 
                c.bizname, 
                c.vat,
                c.size,
                c.municipality,
                c.district,
                c.nationality
            from tr_company_contact as tr_cc
            inner join company as c on tr_cc.company_id = c.id
            


            
        query;
        $params = [];
        if($user_role < Role::STAFF) {
            $q .= " where c.agent = ?";
            $params[] = $user_id;
        }
        $q .= " order by c.name, c.surname";
        $rows = DB::Query($q, $params);
        $response->getBody()->write(json_encode(["payload" => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}