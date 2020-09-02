<?php

namespace application\models;

use application\core\Model;
use PDOStatement;

class ModelCountry extends Model
{
    public function getCountryByID($id)
    {
        $country = $this->conn->query("SELECT * FROM country WHERE country.id =".$id);
        return $country;
    }

    public function getCountries()
    {
        $countries = $this->conn->query("SELECT * FROM country ORDER BY name");
        return $countries;
    }
}