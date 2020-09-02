<?php

namespace application\core;

class View
{

    public function generate($contentView, $data = null)
    {
        if (is_array($data)) {
            extract($data);
        }

        include 'application/views/'.$contentView;
    }
}