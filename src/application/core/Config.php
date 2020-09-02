<?php

namespace application\core;

class Config {
    public function get($file){
        $str = 'application/config/'.$file.'.php';
        return include($str);
    }
}