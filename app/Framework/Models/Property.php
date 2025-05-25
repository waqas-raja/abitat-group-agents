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
            $acquisition_agent_percentage = $res[0]["package_commission"]/100;
            $q = "INSERT INTO property (address, city, branch_id, property_type, acquisition_date, acquisition_price, acquisition_agent_percentage, acquisition_agency_percentage, acquisition_agent_id, mandate_expiration, ucr) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            $params = [$address, $city, $branch_id, $property_type, $acquisition_date, $acquisition_price, $acquisition_agent_percentage, $acquisition_agency_percentage, $acquisition_agent_id, $mandate_expiration, $user_id];
            $row_affected = DB::Execute($q, $params);
            if($row_affected == 0) throw new Exception("Error while insert new property. Query: $q :: " . json_encode($params), 500);
            //recupero l'id dell'agente creato
            $q = "select max(id) as id from property where address = ? and city = ? and branch_id = ?";
            $row = DB::Query($q, [$address, $city, $branch_id]);
            $propertyId = $row[0]["id"];
            error_log("ELI :: immobile creato con id $propertyId");
            //se il salvataggio è andato a buon fine creo il record in expense_report
            $agencyAmount = $acquisition_price * $acquisition_agent_percentage / 100;
            $commissionValue = $agencyAmount * $acquisition_agent_percentage / 100;
            $msg = "Commissione agente del $acquisition_agent_percentage% sull'importo di $agencyAmount (importo acquisizione $acquisition_price - commissione agenzia $acquisition_agency_percentage%)";
            error_log("ELI :: $msg");
            $q = "insert into expense_report (agent, property, expense_type, dt, reason, value, ucr) values (?,?,?,?,?,?,?)";
            $params = [$acquisition_agent_id, $propertyId, "A", $acquisition_date, $msg, $commissionValue, $user_id];
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
            $acquisition_agent_percentage = $res[0]["package_commission"]/100;
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
            $q = "select percentage from package where id = (select package_id from agent where id = ?)";
            $res = DB::Query($q, [$sale_agent_id]);
            if (count($res) < 1) throw new Exception("package not found from user $sale_agent_id", 500);
            $sale_agent_percentage = $res[0]["percentage"];
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
            error_log("$q :: " . json_encode($params));
            if ($row_affected == 0) throw new Exception("Error while marking the property sold", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            file_put_contents('error.log', $e->getMessage() . PHP_EOL, FILE_APPEND);
            $response->getBody()->write(json_encode(["result" => false]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        }
    }
}
