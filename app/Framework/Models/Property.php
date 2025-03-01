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
    
    /**
     * @throws Exception
     */
    public static function GetAllPropertyTypes($request, $response) {
        $list = isset($_GET['list']) ? intval($_GET['list']) : 0;
        if ($list === 1) {
            $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
            $offset = ($page - 1) * $limit;
            $search = isset($_GET['search']) ? trim($_GET['search']) : "";
            $params = [];
            $q = 'SELECT * from td_property_type as p';
            if (!empty($search)) {
                $q .= " WHERE (p.name LIKE '%$search%')";
            }
            $q .= " ORDER BY p.id LIMIT $limit OFFSET $offset";
            $pTypes = DB::Query($q, $params);

            $countQuery = "SELECT COUNT(*) FROM td_property_type as c";
            if (!empty($search)) {
                $countQuery .= " WHERE (c.name LIKE '%$search%')";
            }
            $totalRecords = DB::Query($countQuery)[0]['COUNT(*)'];

            $response->getBody()->write(json_encode(["payload" => $pTypes, "totalCount" => $totalRecords]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } else {
            $types = DB::Query('SELECT * from td_property_type');
            $response->getBody()->write(json_encode(["payload" => $types]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        }

    }
    
    /**
     * @throws Exception
     */
    public static function Add($request, $response) {
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $data = json_decode($request->getBody()->getContents(), true);
        $address = $data['address'] ?? '';
        // TODO... CHECK CITY FIELD IS MONDATORY IN TABLE BUT NOT ASKED ON ADD PROPERTY MODAL 
        $city = 'Turino';
        $branch_id = $data['branch_id'] ?? 0;
        $property_type = $data['property_type'] ?? 0;
        $purchase_date = $data['purchase_date'] ? date("Y-m-d", strtotime($data['purchase_date'])) : date("Y-m-d");
        $purchase_price = $data['purchase_price'] ?? 0;
        $purchase_agency_percentage = $data['purchase_agency_percentage'] ?? 0;
        // TODO... CHECK THE PURCHASE AGENT PERCENTAGE IS MONDATORY IN TABLE BUT NOT ASKED ON ADD PROPERTY MODAL 
        $purchase_agent_percentage = 5;
        $purchase_agent_id = $data['purchase_agent_id'] ?? 0;
        $mandate_expiration = $data['mandate_expiration'] ? date("Y-m-d", strtotime($data['mandate_expiration'])) : date("Y-m-d");
        $q = "INSERT INTO property (address, branch_id, city, property_type, purchase_date, purchase_price, purchase_agent_percentage, purchase_agency_percentage, purchase_agent_id, mandate_expiration, ucr) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        $params = [$address, $branch_id, $city, $property_type, $purchase_date, $purchase_price, $purchase_agent_percentage, $purchase_agency_percentage, $purchase_agent_id, $mandate_expiration, $user_id];

        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error while insert new property", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    /**
     * @throws Exception
     */
    public static function Edit($request, $response) {
        $property_id = $request->getAttribute('id');
        if (!$property_id)
            throw new Exception('Property ID is required', 400);
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $data = json_decode($request->getBody()->getContents(), true);
        $address = $data['address'] ?? '';
        // TODO... CHECK CITY FIELD IS MONDATORY IN TABLE BUT NOT ASKED ON ADD PROPERTY MODAL 
        $city = 'Turino';
        $branch_id = $data['branch_id'] ?? 0;
        $property_type = $data['property_type'] ?? 0;
        $purchase_date = $data['purchase_date'] ? date("Y-m-d", strtotime($data['purchase_date'])) : date("Y-m-d");
        $purchase_price = $data['purchase_price'] ?? 0;
        $purchase_agency_percentage = $data['purchase_agency_percentage'] ?? 0;
        // TODO... CHECK THE PURCHASE AGENT PERCENTAGE IS MONDATORY IN TABLE BUT NOT ASKED ON ADD PROPERTY MODAL 
        $purchase_agent_percentage = 5;
        $purchase_agent_id = $data['purchase_agent_id'] ?? 0;
        $mandate_expiration = $data['mandate_expiration'] ? date("Y-m-d", strtotime($data['mandate_expiration'])) : date("Y-m-d");

        $q = 'UPDATE property SET address = ?, branch_id = ?, city = ?, property_type = ?, purchase_date = ?, purchase_price = ?, purchase_agent_percentage = ?, purchase_agency_percentage = ?, purchase_agent_id = ?, mandate_expiration = ?, ucr = ? WHERE id = ?';
        $params = [$address, $branch_id, $city, $property_type, $purchase_date, $purchase_price, $purchase_agent_percentage, $purchase_agency_percentage, $purchase_agent_id, $mandate_expiration, $user_id, $property_id];

        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error while updating property", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    /**
     * @throws Exception
     */
    public static function MarkAsSold($request, $response) {
        $property_id = $request->getAttribute('id');
        if (!$property_id)
            throw new Exception('Property ID is required', 400);
        $token_info = User::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $data = json_decode($request->getBody()->getContents(), true);
        $sale_date = $data['sale_date'] ? date("Y-m-d", strtotime($data['sale_date'])) : date("Y-m-d");
        $sale_price = $data['sale_price'] ?? 0;
        $sale_agency_percentage = $data['sale_agency_percentage'] ?? 0;
        $sale_agent_id = $data['sale_agent_id'] ?? 0;
        $delta = $data['delta'] ?? 0;
        $q = 'UPDATE property SET sale_date = ?, sale_price = ?, sale_agency_percentage = ?, sale_agent_id = ?, delta = ?, ucr = ? WHERE id = ?';
        $params = [$sale_date, $sale_price, $sale_agency_percentage, $sale_agent_id, $delta, $user_id, $property_id];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error while marking the property sold", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function AddPropertyType($request, $response) {
        $data = json_decode($request->getBody()->getContents(), true);
        $type = $data['type'] ?? '';
        $q = "INSERT INTO td_property_type (name) VALUES (?)";
        $params = [$type];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error while insert new property type", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function EditPropertyType($request, $response) {
        $type_id = $request->getAttribute('id');
        if (!$type_id)
            throw new Exception('Property ID is required', 400);
        $data = json_decode($request->getBody()->getContents(), true);
        $type = $data['type'] ?? '';
        $q = "UPDATE td_property_type SET name = ? where id = ?";
        $params = [$type, $type_id];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error while updating property type", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
