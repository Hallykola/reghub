<?php

namespace App\Http\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Illuminate\Support\Facades\App;

use Firebase\JWT\Key;

use Closure;

class JWTMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public $payload = '';

    public function handle($request, Closure $next)
    {

        $token = $request->header('token');
        if($token==null){
            return response()->json(['error'=>'Token cannot be empty'],400);
        }
        try{
            $this->payload = JWT::decode($token,new Key(env('JWT_SECRET'), 'HS256'));
        }catch(ExpiredException $e){
            return response()->json(['error'=>'Token expired'],400);
        }catch(Exception $e){
            return response()->json(['error'=>'Token could not be validated'],400);
        }
        // return response()->json(['token'=>$payload],200);
        App::bind('User',function(){
            $user = $this->payload->sub;
            return  $user;
        });

        return $next($request);
    }
}
