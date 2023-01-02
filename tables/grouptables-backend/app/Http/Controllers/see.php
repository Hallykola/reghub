<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

use Illuminate\Http\Request;



class TestController extends BaseController
{
    //
    public function saymessage(Request $request){

        return response()->json(['message'=>$request->message]);
    }

}
