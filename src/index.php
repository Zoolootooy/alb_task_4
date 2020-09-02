<?php
use application\core\Router;
use application\core\Request;

ini_set('display_errors', 0);
require __DIR__.'/vendor/autoload.php';


Router::load('application/routes.php')
    ->direct(Request::uri(), Request::method());