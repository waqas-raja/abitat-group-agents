<?php

namespace App\Framework\Tools;

use Exception;
use PDO;

class DB {
    public static int $LastId = 0;
    private static ?PDO $db = null;
    private static string $lastError = '';

    /**
     * @throws Exception
     */
    public static function DbConn(): ?PDO
    {
        try {
            if (self::$db != null) return self::$db;
            $dbHost = getenv("DB_HOST");
            if (empty($dbHost)) throw new Exception("Fatal error :: DB_HOST ENV not found!");
            $dbName = getenv("DB_NAME");
            if (empty($dbName)) throw new Exception("Fatal error :: DB_NAME ENV not found!");
            $dbPort = getenv("DB_PORT");
            if (empty($dbPort)) throw new Exception("Fatal error :: DB_PORT ENV not found!");
            $dbUsr = getenv("DB_USR");
            if (empty($dbUsr)) throw new Exception("Fatal error :: DB_USR ENV not found!");
            $dbPsw = getenv("DB_PSW");
            if (empty($dbPsw)) throw new Exception("Fatal error :: DB_PSW ENV not found!");
            $dsn = sprintf("mysql:host=%s;dbname=%s;port=%s", $dbHost, $dbName, $dbPort);
            self::$db = new PDO($dsn, $dbUsr, $dbPsw, [PDO::ATTR_PERSISTENT => true]);
            return self::$db;
        } catch (Exception $ex) {
            error_log($ex->getMessage());
            self::$lastError = $ex->getMessage();
            return null;
        }
    }

    public static function Query(string $query, array $params = [], ?PDO $dbSource = null): array
    {
        $result = [];
        try {
            $db = $dbSource != null ? $dbSource : self::DbConn();
            if ($db == null) throw new Exception("Invalid db connection. Internal error: " . DB::$lastError);
            if (str_contains($query, "?")) {
                $stmt = $db->prepare($query);
                if (!$stmt) throw new Exception("The creation of the statement was failed with query $query");
                $check = $stmt->execute(count($params) > 0 ? $params : null);
                if (!$check) throw new Exception("Statement execution was failed with query $query and params " . json_encode($params));
                $result = $stmt->fetchAll();
            } else {
                $res = $db->query($query, PDO::FETCH_ASSOC);
                if (!$res) throw new Exception("Query execution was failed with query $query");
                $result = $res->fetchAll();
            }
        } catch (Exception $exGen) {
            self::$lastError = $exGen->getMessage();
        } finally {
            return $result;
        }
    }

    public static function Execute(string $query, array $params = [], ?PDO $dbSource = null): int
    {
        $result = 0;
        $db = null;
        try {
            $db = $dbSource != null ? $dbSource : self::DbConn();
            if ($db == null) throw new Exception("Invalid db connection. Internal error: " . DB::$lastError);
            if (str_contains($query, "?")) {
                $stmt = $db->prepare($query);
                if (!$stmt) throw new Exception("The creation of the statement was failed with query $query");
                $check = $stmt->execute(count($params) > 0 ? $params : null);
                if (!$check) throw new Exception("Statement execution was failed with query $query and params " . json_encode($params));
                $result = $stmt->rowCount();
            } else $result = $db->exec($query);
        } catch (Exception $exGen) {
            self::$lastError = $exGen->getMessage();
        } finally {
            $isInsert = preg_match("/insert.*$/i", nl2br($query));
            self::$LastId = $isInsert && $result > 0 ? $db->lastInsertId() : 0;
            return $result;
        }
    }

    public static function GetLastError(): string
    {
        $error = self::$lastError;
        self::$lastError = '';
        return $error;
    }
}
