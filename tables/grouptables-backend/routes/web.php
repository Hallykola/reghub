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

$router->get('/grouptables/{course}/{group}/','GroupTablesController@read');
$router->get('/grouptables/{course}/{group}/{skip}/{take}','GroupTablesController@readskip');

$router->get('/grouptables/{course}/{group}/{groupno}','GroupTablesController@readone');

$router->post('/grouptables','GroupTablesController@newupdated');
$router->post('/grouptables/edit','GroupTablesController@updateone');

$router->put('/grouptables','GroupTablesController@updated');
$router->delete('/grouptables','GroupTablesController@delete');

// ['middleware'=>'jwt.auth', 'uses'=>'AuthController@create']


