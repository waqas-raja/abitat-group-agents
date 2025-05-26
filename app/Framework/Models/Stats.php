<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class Stats {
    /**
     * @throws Exception
     */
    public static function GetTop10Agents($request, $response) {
        $rows = DB::Query('select * from v_top10_agents');
        $response->getBody()->write(json_encode(['payload' => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public static function GetHistogram($request, $response) {
        $rows = DB::Query('select * from v_stats_histogram');
        $response->getBody()->write(json_encode(['payload' => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public static function GetPie($request, $response) {
        $rows = DB::Query('select * from v_stats_pie');
        $response->getBody()->write(json_encode(['payload' => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
}