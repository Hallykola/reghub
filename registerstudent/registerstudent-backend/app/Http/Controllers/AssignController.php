<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Grouping;

class AssignController extends Controller
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
    public function create(Request $request){
        $this->validate($request, [
            // 'userid' => 'required|unique:groupings',
            // 'info' => 'required',
            // 'more' => 'required',
            // 'createdby' => 'required',
            // 'numberpergroup' => 'required'
        ]);
        $course = $request->course;
        $dept = $request->department;
        $userid = $request->userid;

        // check if student is already registered
        $registered = Grouping::where([['course','=',$course],['userid','=',$userid]]);
        $details = $registered->get()->first();

        if( $registered->count() > 0){
            return response()->json(['error'=> "User already registered to group ".$details->group.$details->number],406);
        }

        $url = 'http://host.docker.internal:8002/course/pluckgroupnumber';
        $curl_data = ['course' => $course,
        'feature' => $dept,
        ];
        $options = array(
            CURLOPT_RETURNTRANSFER => true,         // return web page
            CURLOPT_HEADER         => false,        // don't return headers
            CURLOPT_FOLLOWLOCATION => true,         // follow redirects
            CURLOPT_ENCODING       => "",           // handle all encodings
            CURLOPT_USERAGENT      => "paddy",     // who am i
            CURLOPT_AUTOREFERER    => true,         // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,          // timeout on connect
            CURLOPT_TIMEOUT        => 120,          // timeout on response
            CURLOPT_MAXREDIRS      => 10,           // stop after 10 redirects
            CURLOPT_POST            => 1,            // i am sending post data
            CURLOPT_POSTFIELDS     => $curl_data,    // this are my post vars
            CURLOPT_SSL_VERIFYHOST => 0,            // don't verify ssl
            CURLOPT_SSL_VERIFYPEER => false,        //
            CURLOPT_VERBOSE        => 1                //
        );

        $ch      = curl_init($url);
        curl_setopt_array($ch,$options);
        $content = curl_exec($ch);
        $err     = curl_errno($ch);
        $errmsg  = curl_error($ch) ;
        $header  = curl_getinfo($ch);
        curl_close($ch);

        $result = json_decode($content);

        if(property_exists( $result , "error" )){
            return response()->json(['error'=>"Could not get group number from courses", "errormessage"=>$result->error],404);
        }

        //server may return error handle it here todo

        //if license could not be validated/used
        if(!useLicense($license)){
            return response()->json(['error'=>'Could not register student to group', 'message'=>'License has been used or is license is not valid'],201);
        }
        $grouping = Grouping::create(['userid'=>$userid, 'course'=>$course, 'group'=> $result->group, 'number'=> $result->number]);
        return response()->json(['grouping'=>$grouping],201);

    }
    public function update(Request $request){
        return response()->json(['profile'=>'hello'],201);

    }
    public function read(Request $request){
        return response()->json(['profile'=>'hello'],201);

    }
    public function delete(Request $request){
        return response()->json(['profile'=>'hello'],201);

    }


    //

    function isLicenseValidnUnused(Request $request){
        $license = $request->license;
        $url = 'http://host.docker.internal:8002/wp-json/lmfwc/v2/licenses/validate/'.$license;
        $mycurl = new MyCurl();
        $response = $mycurl->visit($url);

        if (isset($response->data->status)&&$response->data->status == 404){
            return response()->json(['status'=>false, 'message'=>'License is not valid'],201);
        }


        if (isset($response->data->remainingActivations)&&$response->data->timesActivated ==0 && $response->success==1){
            return response()->json(['status'=>true, 'message'=>'License is valid'],201);
        }
        else{
            return response()->json(['status'=>false, 'message'=>'License has been used'],201);

        }
        // print_r([$response->success,$response->data->timesActivated,$response->data->remainingActivations]);

    }

    function useLicense($license){

        $url = 'http://host.docker.internal:8002/wp-json/lmfwc/v2/licenses/activate/'.$license;
        $mycurl = new MyCurl();
        $response = $mycurl->visit($url);

        if (isset($response->data->status)&&$response->data->status == 404){
            return false;
            // return response()->json(['status'=>false, 'message'=>'License is not valid or has been used'],201);
        }
        if (isset($response->data->status)&&$response->data->status > 0&& $response->success==1){
            return true;
            // return response()->json(['status'=>true, 'message'=>'License is just validated and now used'],201);
        }



    }
}


class Grouper
{
    public $sorton = 'dept';
    public $groupsize = 4;
    public $aassignedgroupnos =[];
    public $aleftgroupnos =[1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5];
    public $bassignedgroupnos =[];
    public $bleftgroupnos =[1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5];
    public $cassignedgroupnos =[];
    public $cleftgroupnos =[1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5];
    public $dassignedgroupnos =[];
    public $dleftgroupnos =[1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5];
    public $groupdef = ['A'=>['physics'],'B'=>['marine','education'], 'C'=>['medicine'], 'D'=>['chemical']];
    public $thegroup = "";

    public function __construct(){

    }
    public function group($dept,$course)
    {

        foreach($this->groupdef as $group){

            if (in_array($dept,$group)){
                $this->thegroup = array_search($group,$this->groupdef);
                break ;
            }
        }

        $slot = $array_shift($leftslots);
        $assignedslot = array_push($assignedslots,$slot);
        print_r($assignedslots);
        print_r($leftslots);
        Grouping::create(['userid'=>$user, 'course'=>$course, $slot]);


    }


}

class GroupOrganizer{
    public $prefix = '';
    public $assignedslots= [];
    public $leftslots = [];
    public $course = '';
    public function __construct($prefix, $assignedslots,$leftslots,$course){
        $this->prefix  = $prefix;
        $this->assignedslots = $assignedslots;
        $this->leftslots = $leftslots;
        $this->course = $course;
    }

    public function createmember($user){
        $slot = $array_shift($leftslots);
        $assignedslot = array_push($assignedslots,$slot);
        print_r($assignedslots);
        print_r($leftslots);
        Grouping::create(['userid'=>$user, 'course'=>$course, $slot]);
    }

    public function updatemember(){

    }
    public function readmember(){

    }
    public function deletemember(){

    }
}

class MyCurl{
    public static function visit($url){
        // $url = 'http://host.docker.internal:8002/course/pluckgroupnumber';

        $cURLConnection = curl_init();

        curl_setopt($cURLConnection, CURLOPT_URL, $url."?consumer_key=ck_2b682ca7f22a9ec17539a62cddad2169a7f6f3a8&consumer_secret=cs_964e7d8381ffe4c6694d30c942f956e805b14650");
        curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

        $content = curl_exec($cURLConnection);
        curl_close($cURLConnection);


        $result = json_decode($content);
        return $result;

    }
}
