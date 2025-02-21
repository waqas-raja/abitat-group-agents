<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class Property
{
    /**
     * @throws Exception
     */
    public static function GetAll($request, $response) {
        $branch_id = isset($_GET['branch_id']) ? intval($_GET['branch_id']) : 1;
        $q = <<<query
            SELECT
                p.*,
                concat(pa.surname, ' ', pa.name) AS purchase_agent,
                concat(sa.surname, ' ', sa.name) AS sale_agent_name
            FROM property AS p
            LEFT JOIN agent AS pa ON pa.id = p.purchase_agent_id
            LEFT JOIN agent AS sa ON sa.id = p.sale_agent_id
            WHERE p.branch_id = ?;
        query;
        $agents = DB::Query($q, [$branch_id]);
        $response->getBody()->write(json_encode(["payload" => $agents]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
