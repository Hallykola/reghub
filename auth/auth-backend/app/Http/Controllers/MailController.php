<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
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

    //
     public function mail($resettoken) {
        $data = array("name"=>"Haliru", "mytoken"=>$resettoken);
        Mail::send("mail", $data, function($message) {
        $message->to("haliruyusuf6@gmail.com","Hally")->subject("Reset your Password");
        $message->from("info@reghub.com","RegHub Password Center");
        });
        echo "Email Sent. Check your inbox.";
        }
}
