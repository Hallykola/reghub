<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/course','AssignController@create');
$router->post('/course','AssignController@create');
$router->put('/course','AssignController@update');
$router->delete('/course','AssignController@delete');

$router->get('/checklicense','AssignController@isLicenseValidnUnused');
$router->get('/uselicense','AssignController@useLicense');




// ['middleware'=>'jwt.auth', 'uses'=>'AuthController@create']
