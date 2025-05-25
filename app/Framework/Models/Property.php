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
                concat(pa.surname, ' ', pa.name) AS acquisition_agent,
                concat(sa.surname, ' ', sa.name) AS sale_agent_name,
                pt.name as property_name
            FROM property AS p
            LEFT JOIN agent AS pa ON pa.id = p.acquisition_agent_id
            LEFT JOIN agent AS sa ON sa.id = p.sale_agent_id
            LEFT JOIN td_property_type AS pt ON pt.id = p.property_type
            WHERE p.branch_id = ?;
        query;
        $agents = DB::Query($q, [$branch_id]);
        $response->getBody()->write(json_encode(["payload" => $agents]));
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
            $address = $data['address'] ?? '';
            $city = $data['city'] ?? '';
            $branch_id = $data['branch_id'] ?? 0;
            $property_type = $data['property_type'] ?? 0;
            $acquisition_date = $data['acquisition_date'] ? date("Y-m-d", strtotime($data['acquisition_date'])) : date("Y-m-d");
            $acquisition_price = $data['acquisition_price'] ?? 0;
            $acquisition_agency_percentage = $data['acquisition_agency_percentage'] ?? 0;
            $acquisition_agent_id = $data['acquisition_agent_id'] ?? 0;
            $mandate_expiration = $data['mandate_expiration'] ? date("Y-m-d", strtotime($data['mandate_expiration'])) : date("Y-m-d");
            $res = DB::Query("select package_commission from agent where id = ?", [$acquisition_agent_id]);
            $acquisition_agent_percentage = $res[0]["package_commission"];
            $q = "INSERT INTO property (address, city, branch_id, property_type, acquisition_date, acquisition_price, acquisition_agent_percentage, acquisition_agency_percentage, acquisition_agent_id, mandate_expiration, ucr) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            $params = [$address, $city, $branch_id, $property_type, $acquisition_date, $acquisition_price, $acquisition_agent_percentage, $acquisition_agency_percentage, $acquisition_agent_id, $mandate_expiration, $user_id];
            $row_affected = DB::Execute($q, $params);
            if($row_affected == 0) throw new Exception("Error while insert new property. Query: $q :: " . json_encode($params), 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            file_put_contents('error.log', $e->getMessage() . PHP_EOL, FILE_APPEND);
            $response->getBody()->write(json_encode(["result" => false]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function Edit($request, $response) {
        try {
            $property_id = $request->getAttribute('id');
            if (!$property_id) throw new Exception('Property ID is required', 400);
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $data = json_decode($request->getBody()->getContents(), true);
            $address = $data['address'] ?? '';
            $city = $data['city'] ?? '';
            $branch_id = $data['branch_id'] ?? 0;
            $property_type = $data['property_type'] ?? 0;
            $acquisition_date = $data['acquisition_date'] ? date("Y-m-d", strtotime($data['acquisition_date'])) : date("Y-m-d");
            $acquisition_price = $data['acquisition_price'] ?? 0;
            $acquisition_agency_percentage = $data['acquisition_agency_percentage'] ?? 0;
            $acquisition_agent_id = $data['acquisition_agent_id'] ?? 0;
            $mandate_expiration = $data['mandate_expiration'] ? date("Y-m-d", strtotime($data['mandate_expiration'])) : date("Y-m-d");
            $res = DB::Query("select package_commission from agent where id = ?", [$acquisition_agent_id]);
            $acquisition_agent_percentage = $res[0]["package_commission"];
            $q = 'UPDATE property SET address = ?, city = ?, branch_id = ?, property_type = ?, acquisition_date = ?, acquisition_price = ?, acquisition_agent_percentage = ?, acquisition_agency_percentage = ?, acquisition_agent_id = ?, mandate_expiration = ?, ucr = ? WHERE id = ?';
            $params = [$address, $city, $branch_id, $property_type, $acquisition_date, $acquisition_price, $acquisition_agent_percentage, $acquisition_agency_percentage, $acquisition_agent_id, $mandate_expiration, $user_id, $property_id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while updating property", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            file_put_contents('error.log', $e->getMessage() . PHP_EOL, FILE_APPEND);
            $response->getBody()->write(json_encode(["result" => false]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function MarkAsSold($request, $response) {
        try {
            $property_id = $request->getAttribute('id');
            if (!$property_id) throw new Exception('Property ID is required', 400);
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $data = json_decode($request->getBody()->getContents(), true);
            $sale_date = $data['sale_date'] ? date("Y-m-d", strtotime($data['sale_date'])) : date("Y-m-d");
            $sale_price = $data['sale_price'] ?? 0;
            $sale_agency_percentage = $data['sale_agency_percentage'] ?? 0;
            $sale_agent_id = $data['sale_agent_id'] ?? 0;
            $sale_down_payment = $data['sale_down_payment'] ?? 0;
            $external_agency = $data['external_agency'] ?? "N";
            $external_agency_name = $data['external_agency_name'] ?? "";
            $external_agency_value = $data['external_agency_value'] ?? 0;
            $external_agency_percentage = $external_agency == "N" ? null : ($external_agency == "P" ? 1 : 0);
            $res = DB::Query("select package_commission from agent where id = ?", [$sale_agent_id]);
            $sale_agent_percentage =  $res[0]["package_commission"];
            $q = <<<query
                UPDATE property SET 
                    sale_date = ?, 
                    sale_price = ?, 
                    sale_agency_percentage = ?, 
                    sale_agent_id = ?, 
                    sale_agent_percentage = ?,
                    sale_down_payment = ?, 
                    other_agency_name = ?, 
                    other_agency_percentage = ?, 
                    other_agency_value = ?, 
                    ucr = ? 
                WHERE id = ?
            query;
            $params = [
                $sale_date,
                $sale_price,
                $sale_agency_percentage,
                $sale_agent_id,
                $sale_agent_percentage,
                $sale_down_payment,
                $external_agency_name,
                $external_agency_percentage,
                $external_agency_value,
                $user_id,
                $property_id
            ];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while marking the property sold. Query: $q :: " . json_encode($params), 500);
            //recupero i dati di acquisizione
            $res = DB::Query("select acquisition_date, acquisition_price, acquisition_agent_id, acquisition_agent_percentage, acquisition_agency_percentage from property where id = ?", [$property_id]);
            if(count($res) == 0) throw new Exception("Property $property_id not found. Query: $q :: " . json_encode($params), 500);
            $acquisition_date = $res[0]["acquisition_date"];
            $acquisition_price = $res[0]["acquisition_price"];
            $acquisition_agent_id = $res[0]["acquisition_agent_id"];
            $acquisition_agent_percentage = $res[0]["acquisition_agent_percentage"];
            $acquisition_agency_percentage = $res[0]["acquisition_agency_percentage"];
            //creo il record in expense_report per l'acquisizione
            $agencyAmount = $sale_price * $acquisition_agency_percentage / 100;
            $commissionValue = $agencyAmount * $acquisition_agent_percentage / 100;
            $msg = "Commissione agente del $acquisition_agent_percentage% sull'importo di $agencyAmount (importo vendita $sale_price - commissione agenzia $acquisition_agency_percentage%)";
            $q = "insert into expense_report (agent, property, expense_type, dt, reason, value, ucr) values (?,?,?,?,?,?,?)";
            $params = [$acquisition_agent_id, $property_id, "A", $acquisition_date, $msg, $commissionValue, $user_id];
            $row_affected = DB::Execute($q, $params);
            if($row_affected == 0) throw new Exception("Error while insert record in expense_report for acquisition. Query: $q :: " . json_encode($params), 500);
            //creo il record in expense_report per la vendita
            $agencyAmount = $sale_price * $sale_agency_percentage / 100;
            $commissionValue = $agencyAmount * $sale_agent_percentage / 100;
            $msg = "Commissione agente del $sale_agent_percentage% sull'importo di $agencyAmount (importo vendita $sale_price - commissione agenzia $sale_agency_percentage%)";
            $q = "insert into expense_report (agent, property, expense_type, dt, reason, value, ucr) values (?,?,?,?,?,?,?)";
            $params = [$sale_agent_id, $property_id, "S", $sale_date, $msg, $commissionValue, $user_id];
            $row_affected = DB::Execute($q, $params);
            if($row_affected == 0) throw new Exception("Error while insert record in expense_report. Query: $q :: " . json_encode($params), 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            file_put_contents('error.log', $e->getMessage() . PHP_EOL, FILE_APPEND);
            $response->getBody()->write(json_encode(["result" => false]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        }
    }
}
