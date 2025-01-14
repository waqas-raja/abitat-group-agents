<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class ContactList {
    public const int GL_SVILUPPO = 1;
    public const int SVILUPPO_PERSONALE = 2;
    public const int CREDITI = 3;
    
    public const string GL_SVILUPPO_TXT = "GL Sviluppo";
    public const string SVILUPPO_PERSONALE_TXT = "Sviluppo Personale";
    public const string CREDITI_TXT = "Crediti";

    private function __construct() {}

    public static function GetString($id): string { return self::GetAll()[$id]; }

    public static function GetAll(): array {
        return [
            self::GL_SVILUPPO => self::GL_SVILUPPO_TXT, 
            self::SVILUPPO_PERSONALE => self::SVILUPPO_PERSONALE_TXT, 
            self::CREDITI => self::CREDITI_TXT
        ];
    }

    /**
     * @throws Exception
     */
    public static function GetChartInfo($user_id, $role_id) : array {
        $answer = [];
        foreach (self::GetAll() as $key => $value) {
            $chart_info_raw = self::GetChartInfoRaw($key, $role_id, $user_id);
            $answer[] = [
                "list_id" => $key,
                "list_name" => $value,
                "working" => $chart_info_raw["working"],
                "waiting" => $chart_info_raw["waiting"],
                "closed" => $chart_info_raw["closed"],
                "priority" => $chart_info_raw["priority"]
            ];
        }
        return $answer;
    }

    /**
     * @throws Exception
     */
    private static function GetChartInfoRaw($graph_type, $role_id, $agent_id): array {
//        $q_working = "select count(c.id) as qt from contact as c where c.list_id = ? and c.status = 3";
//        $params = [$graph_type];
//        if($role_id == Role::AGENT) {
//            $q_working .= " and c.agent = ?";
//            $params[] = $agent_id;
//        }
//        $q_waiting = "select count(c.id) as qt from contact as c where c.list_id = ? and c.status = 2";
//        $params[] = $graph_type;
//        if($role_id == Role::AGENT) {
//            $q_waiting .= " and c.agent = ?";
//            $params[] = $agent_id;
//        }
//        $q_closed = "select count(c.id) as qt from contact as c where c.list_id = ? and c.status = 1";
//        $params[] = $graph_type;
//        if($role_id == Role::AGENT) {
//            $q_closed .= " and c.agent = ?";
//            $params[] = $agent_id;
//        }
//        $q_empty = "select count(c.id) as qt from contact as c where c.list_id = ? and c.status = 4";
//        $params[] = $graph_type;
//        if($role_id == Role::AGENT) {
//            $q_empty .= " and c.agent = ?";
//            $params[] = $agent_id;
//        }
//        $q = "select ($q_working) as qt_working, ($q_waiting) as qt_waiting, ($q_closed) as qt_closed, ($q_empty) as qt_empty";
//        $rows = DB::Query($q, $params);
//        if(count($rows) != 1)
//            throw new Exception("Invalid answer from db for GetChartInfoRaw for list $graph_type", 500);
        return [
            "list_id" => $graph_type,
            "list_name" => self::GetString($graph_type),
            "working" => 0, //$rows[0]["qt_working"],
            "waiting" => 0, //$rows[0]["qt_waiting"],
            "closed" => 0, //$rows[0]["qt_closed"],
            "priority" => 0 //$rows[0]["qt_priority"]
        ];
    }
}