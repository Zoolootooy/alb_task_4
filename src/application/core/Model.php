<?php

namespace application\core;

abstract class Model
{
    protected $conn;

    public function __construct()
    {
        $this->conn = Database::connect();
    }
}
