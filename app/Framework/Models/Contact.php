<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class Contact {
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
                concat(c.surname, ' ', c.name) as full_name, 
                TIMESTAMPDIFF(YEAR, c.born_on, CURDATE()) AS age,
                c.derivation,
                c.gender,
                m.code as municipality,
                d.name as district,
                n.name as nation,
                c.phone1,
                c.phone2,
                c.email,
                c.fiscalcode,
                coalesce(last_call.event_dt, 'N/A') as last_date,
                coalesce(last_call.name, 'N/A') as last_closed,
                coalesce(last_call.extraction_dt,'N/A') as extraction,
                c.derivation,
                c.list_id,
                l.name as list_name,
                c.agent as agent_id,
                u.surname as agent_name
            from contact as c 
            left outer join (
                select ca.contact_id, td_cas.name, ca.event_dt, ca.extraction_dt
                from contact_activity as ca
                inner join td_contact_activity_status as td_cas on td_cas.id = ca.status
                where ca.event_dt < now() 
                order by ca.event_dt desc 
                limit 1
            ) as last_call on last_call.contact_id = c.id
            left outer join td_list as l on l.id = c.list_id
            left outer join user as u on u.id = c.agent
            left outer join td_municipality as m on c.municipality = m.code
            left outer join td_district as d on d.code = m.district_code
            left outer join td_nation as n on n.code = d.nation_code
        query;
        $params = [];
        if($user_role < Role::STAFF) {
            $q .= " where c.agent = ?";
            $params[] = $user_id;
        }
        $q .= " order by c.surname";
        $leeds = DB::Query($q, $params);
        $response->getBody()->write(json_encode(["payload" => $leeds]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetItem($request, $response) {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $cid = (int)$request->getAttribute('id');
        $q = <<<query
            select 
                c.*,
                p.name as profession_name,
                td_dw.name as dwelling_name,
                doc.name as doctype_name,
                ct.name as contract_type_name,
                l.name as list_name,
                u.name as agent_name,
                m.name as municipality_name,
                d.name as district,
                n.name as nation,
                td_sm.name as source_name,
                td_tls.name as tl_session_name
            from contact as c 
            left outer join td_tl_session as td_tls on td_tls.id = c.tl_session
            left outer join td_sw_manager as td_sm on td_sm.id = c.sw_manager
            left outer join td_profession as p on p.id = c.profession_id
            left outer join td_typeof_dwelling as td_dw on td_dw.id = c.dwelling_id
            left outer join td_doctype as doc on doc.id = c.doctype
            left outer join td_contract as ct on ct.id = c.contract_type_id
            left outer join td_list as l on l.id = c.list_id
            left outer join user as u on u.id = c.agent
            left outer join td_municipality as m on c.municipality = m.code
            left outer join td_district as d on d.code = m.district_code
            left outer join td_nation as n on n.code = d.nation_code 
            where c.id = ?
        query;
        $rows = DB::Query($q, [$cid]);
        if(empty($rows)) throw new Exception("Contact not found", 404);
        if(count($rows) > 1) throw new Exception("More than one contact found", 500);
        if($user_role < Role::STAFF && $rows[0]['agent'] != $user_id)
            throw new Exception("Unauthorized", 401);
        $response->getBody()->write(json_encode(["payload" => $rows[0]]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Delete($request, $response) {
        $token_info = User::GetTokenInfo($request);
        $user_role = $token_info['role'];
        $cid = (int)$request->getAttribute('id');
        if($user_role < Role::STAFF) throw new Exception("Unauthorized", 401);
        $q = "delete from contact where id = ?";
        $rows_affected = DB::Execute($q, [$cid]);
        if($rows_affected == 0)
            throw new Exception("An error occurred while I was trying do delete a contact", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Add($request, $response) {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $data = json_decode($request->getBody()->getContents(), true);
        $q = "insert into contact(name, surname, email, phone1, ucr, ule) values (?,?,?,?,?,?)";
        $params = [$data['name'], $data['surname'], $data['email'], $data['phone'], $user_id, $user_id];
        $rows_affected = DB::Execute($q, $params);
        if($rows_affected == 0)
            throw new Exception("An error occurred while I was trying do add a contact", 500);
        $response->getBody()->write(json_encode(["result" => true, "id" => DB::$LastId]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Update($request, $response) {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $data = $request->getParsedBody();
        $cid = (int)$request->getAttribute('id');
        $columns_allowed = self::GetColumns($user_role < Role::STAFF);
        $q = "update contact set ";
        $params = [];
        foreach ($data as $key => $value) {
            if (in_array($key, $columns_allowed)) {
                $q .= "$key = ?, ";
                $params[] = $value;
            }
        }
        $q .= "ule = ?";
        $params[] = $user_id;
        $q .= " where id = ?";
        $params[] = $cid;
        $rows_affected = DB::Execute($q, $params);
        if($rows_affected == 0)
            throw new Exception("An error occurred while I was trying do update a contact", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    private static function GetColumns(bool $restricted = true) : array {
        $rows = DB::Query("show columns from contact");
        $restricted_values = ['id', 'ucr', 'ule', 'dtcr', 'dtle', 'agent', 'list_id'];
        $columns = [];
        foreach($rows as $row) {
            $column_name = $row['Field'];
            if ($restricted) {
                if (!in_array($column_name, $restricted_values))
                    $columns[] = $column_name;
            } else $columns[] = $column_name;
        }
        return $columns;
    }

    /**
     * @throws Exception
     */
    public static function GetLinkedCompanies($request, $response): array {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $cid = (int)$request->getAttribute('id');
        $q = <<<query
            select 
                c.id, 
                c.bizname,
                c.vat,
                jobtitle
            from tr_company_contact as tr_cc 
            inner join company as c on c.id = tr_cc.company_id
            inner join contact as l on l.id = tr_cc.contact_id
            where contact_id = ?
        query;
        $params = [$cid];
        if($user_role < Role::STAFF) {
            $q .= " and c.agent = ?";
            $params[] = $user_id;
        }
        $rows = DB::Query($q, $params);
        error_log("WAQ :: GetLinkedCompanies rows = " . print_r($rows, true));
        // if(empty($rows)) throw new Exception("Companies not found", 404);
        if (empty($rows)) {
            $rows = [];
        }
        $response->getBody()->write(json_encode(["payload" => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetCalls($request, $response): array {
        $token_info = User::GetTokenInfo($request);
        $user_role = $token_info['role'];
        $cid = (int)$request->getAttribute('id');
        $calls = ContactActivity::GetCalls($cid, $user_role);
        $response->getBody()->write(json_encode(["payload" => $calls]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetRequests($request, $response): array {
        $token_info = User::GetTokenInfo($request);
        $user_role = $token_info['role'];
        $cid = (int)$request->getAttribute('id');
        $calls = Request::GetAll($cid);
        $response->getBody()->write(json_encode(["payload" => $calls]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}