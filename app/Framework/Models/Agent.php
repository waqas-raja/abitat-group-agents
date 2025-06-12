<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use DateTimeZone;
use Exception;

final class Agent {
    /**
     * @throws Exception
     */
    public static function GetAll($request, $response) {
        $branch = isset($_GET['b']) ? intval($_GET['b']) : 1;
        $full = isset($_GET['f']) ? intval($_GET['f']) == 1 : false;
        if($full) $q = "call get_agents(?)";
        else $q = "select * from agent where enabled = 1 and branch_id = ?";
        $agents = DB::Query($q, [$branch]);
        $response->getBody()->write(json_encode(["payload" => $agents]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetItem($request, $response) {
        $agent_id = (int)$request->getAttribute('id');
        $q = <<<query
            select a.*, b.name as branch_name
            from agent as a
            inner join branch as b on b.id = a.branch_id
            where a.id = ?
        query;
        $rows = DB::Query($q, [$agent_id]);
        if(count($rows) == 0) throw new Exception("Agent not found", 400);
        $response->getBody()->write(json_encode(["payload" => $rows[0]]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }


    /**
     * @throws Exception
     */
    public static function GetReport($request, $response) {
        $agent_id = (int)$request->getAttribute('id');
        $q = <<<query
            select e.*, 
                case 
                    when p.id is not null then concat(p.address, ' - ', p.city)
                    else ''
                end as property
            from expense_report as e
            left outer join property as p on p.id = e.property
            where e.agent = ?
            order by e.dtcr desc
        query;
        $rows = DB::Query($q, [$agent_id]);
        $response->getBody()->write(json_encode(["payload" => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetReportAgent($request, $response) {
        $agent_id = (int)$request->getAttribute('id');
        $q = <<<query
            select e.* 
            from expense_report_agent as e
            where e.agent = ?
            order by e.dtcr desc
        query;
        $rows = DB::Query($q, [$agent_id]);
        $response->getBody()->write(json_encode(["payload" => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Delete($request, $response) {
        $aid = (int)$request->getAttribute('id');
        $row_affected = DB::Execute("update agent set enabled = 0 where id = ?", [$aid]);
        if ($row_affected == 0) throw new Exception("Error while deleting the agent", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Add($request, $response) {
        try {
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $data = json_decode($request->getBody()->getContents(), true);
            $name = $data['name'] ?? "";
            $surname = $data['surname'] ?? "";
            $package_id = $data['package_id'] ?? 0;
            $branch_id = $data['branch_id'] ?? 0;
            //recupero i dati del pacchetto
            $row = DB::Query("select * from package where id = ?", [$package_id]);
            if(count($row) == 0) throw new Exception("Package not found", 400);
            $package_name = $row[0]["name"];
            $package_fee = $row[0]["fee"];
            $package_commission = $row[0]["commission"];
            //inserisco il record in agent
            $today = (new \DateTime("now", new \DateTimeZone("Europe/Rome")))->format('Y-m-d');
            $q = "INSERT INTO agent(name, surname, branch_id, package_id, package_name, package_fee, package_commission, package_dt, ucr) VALUES (?,?,?,?,?,?,?,?,?)";
            $params = [$name, $surname, $branch_id, $package_id,$package_name, $package_fee, $package_commission, $today, $user_id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while insert agent", 500);
            //recupero l'id dell'agente creato
            $q = "select max(id) as id from agent where name = ? and surname = ? and branch_id = ?";
            $row = DB::Query($q, [$name, $surname, $branch_id]);
            $lastId = $row[0]["id"];
            //aggiungo il record in tr_agent_package_history
            $row_affected = DB::Execute("INSERT INTO tr_agent_package_history(agent, package) VALUES (?,?)", [$lastId, $package_id]);
            if ($row_affected == 0) throw new Exception("Error while insert record in tr_agent_package_history with agent $lastId and package $package_id", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to add agent: ' . $e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public static function AddPayment($request, $response) {
        try {
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $aid = (int)$request->getAttribute('id');
            $data = json_decode($request->getBody()->getContents(), true);
            $amount = $data['amount'] ?? 0;
            $isAgent = $data['is_agent'];
            if($amount <= 0) throw new Exception("Amount must be greater than 0", 400);
            $now = (new \DateTime("now", new \DateTimeZone("Europe/Rome")))->format('Y-m-d');
            $reason = $isAgent ? "Pagamento rientro" : "Pagamento provvigione";
            $tbl = $isAgent ? "expense_report_agent" : "expense_report";
            $q = "insert into $tbl (agent, expense_type, dt, reason, value, ucr) values (?,?,?,?,?,?)";
            $params = [$aid, "P", $now, $reason, $amount, $user_id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while insert record in $tbl for agent $aid and amount $amount", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to add agent: ' . $e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public static function Update($request, $response) {
        $aid = (int)$request->getAttribute('id');
        $data = json_decode($request->getBody()->getContents(), true);
        $name = $data['name'] ?? "";
        $surname = $data['surname'] ?? "";
        $package_id = $data['package_id'] ?? 0;
        $branch_id = $data['branch_id'] ?? 0;
        $phone = $data['phone'] ?? "";
        $email = $data['email'] ?? "";
        $q_check = 'SELECT name, surname, branch_id, phone, email, package_id FROM agent WHERE id = ?';
        $curr = DB::Query($q_check, [$aid]);
        if(!$curr) throw new Exception("Agent $aid not found", 404);
        $curr = $curr[0];
        if(
            $curr['name'] === $name &&
            $curr['surname'] === $surname &&
            $curr['branch_id'] == $branch_id &&
            $curr['phone'] === $phone &&
            $curr['email'] === $email &&
            $curr['package_id'] == $package_id
        ) {
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        }
        $q = 'UPDATE agent SET name = ?, surname = ?, branch_id = ?, phone = ?, email = ?, package_id = ? WHERE id = ?';
        $params = [$name, $surname, $branch_id, $phone, $email, $package_id, $aid];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error while updating agent", 500);
        //se è cambiato il pacchetto aggiorno i dati
        if($curr['package_id'] != $package_id) {
            $row = DB::Query("select * from package where id = ?", [$package_id]);
            if(count($row) == 0) throw new Exception("Package $package_id not found", 400);
            $package_name = $row[0]["name"];
            $package_fee = $row[0]["fee"];
            $package_commission = $row[0]["commission"];
            $today = (new \DateTime("now", new \DateTimeZone("Europe/Rome")))->format('Y-m-d');
            $q = "update agent set package_id = ?, package_name = ?, package_fee = ?, package_commission = ?, package_dt = ?";
            $params = [$package_id,$package_name, $package_fee, $package_commission, $today];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while update package info for agent $aid", 500);
            //aggiungo il record in tr_agent_package_history
            $row_affected = DB::Execute("INSERT INTO tr_agent_package_history(agent, package) VALUES (?,?)", [$aid, $package_id]);
            if ($row_affected == 0) throw new Exception("Error while insert record in tr_agent_package_history with agent $aid and package $package_id", 500);
            $response->getBody()->write(json_encode(["result" => true]));
        }
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function UpdateAlternatePackage($request, $response) {
        $pid = (int)$request->getAttribute('id');
        $data = json_decode($request->getBody()->getContents(), true);
        $agent_id = $data['agent_id'] ?? 0;
        $row_affected = DB::Execute("update agent set package_id = ? where id = ?", [$pid, $agent_id]);
        if ($row_affected == 0) throw new Exception("Error while updating alternate package for agent", 500);
        $response->getBody()->write(json_encode(["result" => true, "package" => $pid, "agent" => $agent_id,]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
