<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Models\StudentProfile;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


use Illuminate\Http\Request;



class MyUsersController extends BaseController
{
    //
    public function getStudentByEmailMatric(Request $request){
        $this->validate($request, [
            'email' => 'required|email',
            // 'matricnumber' => 'required',

        ]);
        $profile = StudentProfile::where([['email',$request->email]
        // ,['matricnumber',$request->matricnumber]
        ])->get()->first();
        if($profile == null){
            return response()->json(['error'=>'User profile does not exist']);
        }
        return response()->json(['profile'=>$profile]);
    }
    public function registerStudentforProfile(Request $request){
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:studentprofiles|unique:users',
            'department' => 'required',
            'matricnumber' => 'required',
            'phonenumber' => 'required',
            'level' => 'required',
            'password' => 'required',


        ]);

        $user = User::create(['name' => $request->name,'email'=>$request->email, 'password'=>Hash::make($request->password)]);
        $profile = StudentProfile::create(['name' => $request->name,'email'=>$request->email,'department'=>$request->department,'matricnumber'=>$request->matricnumber,'phonenumber'=>$request->phonenumber,'level'=>$request->level]);
        return response()->json(['profile'=>$profile]);
    }
}
