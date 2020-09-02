<?php

namespace application\controllers;

use application\core\Controller;

class Controller404 extends Controller
{
    public function index()
    {
        $this->view->generate('404.php', 'TemplateView.php');
    }
}