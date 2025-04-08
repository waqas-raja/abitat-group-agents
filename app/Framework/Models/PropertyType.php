<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use Exception;

final class PropertyType {
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
