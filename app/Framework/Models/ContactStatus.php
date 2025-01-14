<?php

namespace App\Framework\Models;

final class ContactStatus {
    public const int CLOSED = 1;
    public const int WAITING = 2;
    public const int WORKING = 3;

    public const string CLOSED_TXT = "Chiuso";
    public const string WAITING_TXT = "Da lavorare";
    public const string WORKING_TXT = "In gestione";

    private function __construct() { }

    public static function GetAll(): array {
        return [
            self::CLOSED => self::CLOSED_TXT,
            self::WAITING => self::WAITING_TXT,
            self::WORKING => self::WORKING_TXT
        ];
    }
}