<?php

namespace application\core;

class Request
{
    /**
     * Fetch the request URI.
     *
     * @return string
     */
    public static function uri()
    {
        return trim(
            parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH),
            '/'
        );
    }

    /**
     * Fetch the request method.
     *
     * @return string
     */
    public static function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    public static function post($name = null, $type = null) {
        $val = null;
        if(!empty($name) && isset($_POST[$name])) {
            $val = $_POST[$name];
        } elseif(empty($name)) {
            $val = $_POST;
        }

        if($type == 'string') {
            return strval(preg_replace('/[^\p{L}\p{Nd}\d\s_\-\.\%\s]/ui', '', $val));
        }

        if($type == 'integer') {
            return intval($val);
        }

        if($type == 'float') {
            return floatval($val);
        }

        if($type == 'boolean') {
            return !empty($val);
        }

        return $val;
    }

    public static function files($name, $name2 = null) {
        if(!empty($name2) && !empty($_FILES[$name][$name2])) {
            return $_FILES[$name][$name2];
        } elseif(empty($name2) && !empty($_FILES[$name])) {
            return $_FILES[$name];
        } else {
            return null;
        }
    }
}
