<?php

namespace App\Framework\Models;

final class Role {
    public const int ADMIN = 900;
    public const int STAFF = 500;
    public const int AGENT = 100;

    private function __construct() { }

    public static function ToList(): array { return [self::ADMIN, self::STAFF, self::AGENT]; }

    public static function isAdmin(int $role_id): bool { return $role_id >= self::ADMIN; }

    public static function isStaff(int $role_id): bool { return $role_id >= self::STAFF; }

    public static function isAgent(int $role_id): bool { return $role_id >= self::AGENT; }
}
