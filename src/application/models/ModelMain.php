<?php

namespace application\models;

use application\core\Model;

class ModelMain extends Model
{
    public function uploadImage($photo, $tmp){
        if (isset($photo) && !empty($photo)) {
            $extension = pathinfo($photo, PATHINFO_EXTENSION);
            $filename = uniqid() . "." . $extension;;
            $target = 'public/images/' . $filename;
            move_uploaded_file($tmp, $target);
        } else {
            $filename = null;
        }
        return $filename;
    }

    public function getAllMembers()
    {
        $members = $this->conn->query("SELECT * FROM person ORDER BY id");
        return $members;
    }

    function getMember($id, $email)
    {
        $member = $this->conn->query("SELECT * FROM person WHERE person.id =? AND person.email=?", [$id, $email]);
        return $member;
    }

    public function getMembersNumber(){
        $number = $this->conn->query("SELECT COUNT(id) as number FROM person");
        return $number;
    }

    public function saveData($data)
    {
        $executeQuery = $this->conn->query("
            INSERT INTO person (firstname, lastname, birthdate, rep_subject, country_id, phone, email)
            VALUES (?,?,?,?,?,?,?)",
            [
                $data['firstname'],
                $data['lastname'],
                $data['birthdate'],
                $data['rep_subject'],
                $data['country_id'],
                $data['phone'],
                $data['email']
            ]
        );

        if ($executeQuery) {
            return $this->conn->lastInsertId();
        } else {
            return false;
        }
    }


    public function checkEmail($email)
    {
        $result = $this->conn->query("SELECT COUNT(id) AS total FROM person WHERE email=?", [$email])[0];
        return $result['total'] > 0 ? true : false;
    }

    public function updatePhoto($filename, $id, $email)
    {
        $executeQuery = $this->conn->query("
            UPDATE person SET
            photo = ?
            WHERE 
            id = ? AND
            email = ?",
            [
                $filename,
                $id,
                $email
            ]
        );

        if ($executeQuery) {
            return $this->conn->lastInsertId();
        } else {
            return false;
        }
    }

    public function updateData($data, $id, $email)
    {
        if (empty($data['company'])) {
            $data['company'] = null;
        }
        if (empty($data['position'])) {
            $data['position'] = null;
        }
        if (empty($data['about'])) {
            $data['about'] = null;
        }


        $executeQuery = $this->conn->query("
            UPDATE person SET
            company = ?,
            position = ?, 
            about = ?
            WHERE 
            id = ? AND
            email = ?",
            [
                $data['company'],
                $data['position'],
                $data['about'],
                $id,
                $email
            ]
        );

        if ($executeQuery) {
            return $this->conn->lastInsertId();
        } else {
            return false;
        }
    }


}