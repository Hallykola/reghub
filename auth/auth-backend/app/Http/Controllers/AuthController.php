<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\StaffProfile;
use App\Models\StudentProfile;
use App\Http\Controllers\MailController;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function jwt($user){
        $payload = [
            'iss'=>'jwt',
            'sub'=>$user,
            'iat'=>time(),
            'exp'=> time()+60*60*24

        ];
        return JWT::encode($payload,env('JWT_SECRET'),'HS256');
    }
    public function register(Request $request){

        switch ($request->usertype) {
            case 'STAFF':
                return $this->RegisterStaff($request);
                break;

            case 'STUDENT':
                return $this->RegisterStudent($request);
                break;
            default:
                return $this->RegisterStudent($request);
                break;
        }



    }
    public function login(Request $request){
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',

        ]);
        $user = User::where('email',$request->email)->get()->first();
        // switch ($request->usertype) {
        //     case 'STAFF':
        //         return $this->RegisterStaff($request);
        //         break;

        //     case 'STUDENT':
        //         return $this->RegisterStudent($request);
        //         break;
        //     default:
        //         return $this->RegisterStudent($request);
        //         break;
        // }
        if ($user==null){
            return response()->json(['error'=>'email or password is incorrect'],404);
        }
        if(Hash::check($request->password,$user->password)){
            return response()->json(['user'=>$user, 'token'=>$this->jwt($user)],200);
        }
        return response()->json(['error'=>'email or password is incorrect'],404);

    }
    public function logout(Request $request){

    }
    public function forgotpassword(Request $request){
        $email = User::where('email',$request->email)->get()->first();
        //set token

        //send token

    }
    public function getUserbyToken(Request $request){
        $email = User::where('token',$request->token)->get()->first();
        //set token

        //send token

    }
    public function resetpassword(Request $request){
        $email = User::where('token',$request->token)->get()->first();
        //change password


       //login user

    }


    //sendforgotpasswordmail
    public function sendChangePasswordMail(){

        //generate token and add to user column
        $token = rand(10,100);

        //send mail containing token
         $mailCon = new MailController();
        $mailCon->mail($token);



    }

    //changepassword
    public function changePassword(){

    }

    ////////////////////////////////////////
    public function RegisterStudent($request){
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
        return response()->json(['user'=>$user, 'token'=>$this->jwt($user)]);
    }
    public function RegisterStaff($request){
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:staffprofiles|unique:users',
            'department' => 'required',
            'phonenumber' => 'required',
            'password' => 'required',

        ]);
        $user = User::create(['name' => $request->name,'email'=>$request->email, 'password'=>Hash::make($request->password)]);

        $profile = StaffProfile::create(['name' => $request->name,'email'=>$request->email,'department' => $request->department,'phonenumber' => $request->phonenumber]);
        return response()->json(['user'=>$user, 'token'=>$this->jwt($user)]);
    }
}
