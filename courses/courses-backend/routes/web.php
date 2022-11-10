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

$router->post('/course/adduser',['middleware'=>'jwt.auth', 'uses'=>'OwnershipController@addNewUsertoCourseRequest']);
$router->post('/course/getallcourses','OwnershipController@getAllCourses');


$router->get('/course','CourseController@read');
$router->post('/course/all',['middleware'=>'jwt.auth', 'uses'=>'OwnershipController@getAllCourses']);

// $router->post('/course/all',['middleware'=>'jwt.auth', 'uses'=>'OwnershipController@removeCourse']);
$router->post('/course/addadmin/{course}',['middleware'=>'jwt.auth', 'uses'=>'OwnershipController@addAdminToCourse']);
$router->post('/course/removeadmin/{course}',['middleware'=>'jwt.auth', 'uses'=>'OwnershipController@removeAdminFromCourse']);
$router->get('/course/getalladmin/{course}',['middleware'=>'jwt.auth', 'uses'=>'OwnershipController@getAllAdminForCourse']);

$router->post('/course/all',['middleware'=>'jwt.auth', 'uses'=>'OwnershipController@getAllCourses']);
$router->post('/course/edit',['middleware'=>'jwt.auth', 'uses'=>'CourseController@update']);

$router->get('/course/pluckgroupnumber','CourseController@pluckgroupnumber');
$router->post('/course/pluckgroupnumber','CourseController@pluckgroupnumber');

$router->post('/course',['middleware'=>'jwt.auth', 'uses'=>'CourseController@create']);
$router->put('/course','CourseController@update');
$router->delete('/course/{course}','CourseController@delete');
// ['middleware'=>'jwt.auth', 'uses'=>'AuthController@create']
