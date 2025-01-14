<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class ContactActivity {
    public static function GetCalls($user_id, $user_role): array
    {
        $q = <<<query
            select 
                ca.id, 
                c.agent as assigned_to_id,
                u.name as assigned_to_name,
                ca.contact_id,
                concat(c.name, ' ', c.surname) as contact_name,
                c.phone1,
                c.phone2,
                c.email,
                date_format(ca.event_dt, '%Y-%m-%d') as event_dt,
                date_format(ca.event_dt, '%H:%i') as event_hour,
                ca.owner_note,
                ca.temperature,
                ca.status as status_id,
                td_cas.name as status_name
            from contact_activity as ca
            inner join contact as c on c.id = ca.contact_id
            inner join user as u on u.id = c.agent
            inner join td_contact_activity_status as td_cas on td_cas.id = ca.status
            where ca.atype = 'C' and ca.done = 0 and ca.event_dt > now();
        query;
        $params = [];
        if($user_role == 'agent') {
            $q .= " and assigned_to = $user_id";
            $params[] = $user_id;
        }
        $q .= " order by event_dt ";
        return DB::query($q, $params);
    }

    /**
     * @throws Exception
     */
    public static function Add($request, $response) {
        $token_info = User::GetTokenInfo($request);
        $uid = $token_info['id'];
        $cid = (int)$request->getAttribute('id');
        $data = $request->getParsedBody();
        $aid = $data["aid"];
        $event_dt = $data["event_id"];
        $event_type = $data["event_type"];
        $owner_note = $data["owner_note"];
        $temperature = 0;
        $q = <<<query
            insert into contact_activity (
                  assigned_to, contact_id, event_dt, ucr, 
                  atype, owner_note, temperature
            ) values (?,?,?,?,?,?,?)
        query;
        $affected_rows = DB::Execute($q, [$aid, $cid, $event_dt, $uid, $event_type, $owner_note, $temperature]);
        if($affected_rows != 0) throw new Exception("Error adding contact activity", 500);
        $lid = DB::$LastId;
        $response->getBody()->write(json_encode(["result" => $lid > 0]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public static function GetAllStatus($request, $response) {
        $rows = DB::Query("select * from td_contact_activity_status");
        $response->getBody()->write(json_encode(["payload" => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
