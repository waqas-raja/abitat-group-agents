<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;

final class Request {
    public static function GetAll($id, $is_lead = true): array
    {
        $q = <<<query
            select 
                r.id, 
                r.dt_start,
                r.code, 
                p.name as product_name,
                s.name as status_name,
                r.installment_value as value_tot,
                r.expositions,
                r.reason
            from request as r
            inner join td_product as p on p.code = r.product
            inner join td_request_status as s on s.id = r.status_id
        query;
        if($is_lead) $q .= " where r.contact_id = ?"; else $q .= " where r.company_id = ?";
        $q .= " order by r.dt_start desc";
        return DB::Query($q, [$id]);
    }
}
