<?php
use App\Http\Controllers\AuthController;

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
$router->post('/auth/register','AuthController@register');
$router->post('/auth/login','AuthController@login');


// $router->post('/auth/getstudentprofile',['middleware'=>'jwt.auth', 'uses'=>'MyUsersController@getStudentByEmailMatric']);
$router->post('/auth/getstudentprofile','MyUsersController@getStudentByEmailMatric');
$router->post('/auth/registerstudentforprofile','MyUsersController@RegisterStudentforProfile');


$router->get('/auth',['middleware'=>'jwt.auth', 'uses'=>'AuthController@logout']);

$router->get('send_email' ,'Mailcontroller@mail');
$router->get('forgetpw' ,'AuthController@sendChangePasswordMail');

$router->post('/password/reset-request', 'RequestPasswordController@sendResetLinkEmail');
$router->post('/password/reset', [ 'as' => 'password.reset', 'uses' => 'ResetPasswordController@reset' ]);

$router->post('/password/email', 'RequestPasswordController@sendResetLinkEmail');
$router->post('/password/reset/{token}', 'PasswordController@postReset');

