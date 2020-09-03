<?php

namespace application\controllers;

use application\core\Controller;
use application\models\ModelCountry;
use application\models\ModelMain;

class ControllerList extends Controller
{
    public function index()
    {
        $this->view->generate('list.php');
    }


    public function getMembersList()
    {
        $this->model = new ModelMain();
        echo json_encode($members = $this->model->getAllMembers());
    }
}