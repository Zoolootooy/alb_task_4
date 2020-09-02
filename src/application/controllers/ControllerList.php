<?php

namespace application\controllers;

use application\core\Controller;
use application\models\ModelCountry;
use application\models\ModelMain;

class ControllerList extends Controller
{
    public function index()
    {
        $this->model = new ModelMain();
        $members = $this->model->getAllMembers();
        $this->view->generate('list.php', ['members' => $members]);
    }
}