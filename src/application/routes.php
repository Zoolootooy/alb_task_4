<?php

$router->get('', 'ControllerMain@index');
$router->get('getCountries', 'ControllerMain@getCountries');
$router->get('members_list', 'ControllerList@index');
$router->get('newForm', 'ControllerMain@newForm');

$router->post('saveData', 'ControllerMain@saveData');
$router->post('updateData', 'ControllerMain@updateData');
$router->post('checkEmail', 'ControllerMain@checkEmail');
$router->post('getMembersNumber', 'ControllerMain@getMembersNumber');
$router->post('getShareConfig', 'ControllerMain@getShareConfig');
$router->post('getMembersList', 'ControllerList@getMembersList');
$router->post('getMember', 'ControllerMain@getMember');