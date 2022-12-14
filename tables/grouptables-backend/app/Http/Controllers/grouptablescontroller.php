<?php

namespace App\Http\Controllers;

use App\Models\GroupTable;

use Illuminate\Http\Request;

class GroupTablesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     //
    // }

    //
     function read(Request $request,$course,$group){

        $this->createrowifnotcreated ($course);
        $therow = GroupTable::where([["group","=",$group],["course","=",$course]])->get();

        if ($therow ==null || sizeof($therow)==0 ){
            return response()->json(["response"=>"group not found"],404);
        }
        return response()->json(["response"=>$therow],200);

    }

     function readskip(Request $request,$course,$group,$skip,$take){
        $therow = GroupTable::where([["group","=",$group],["course","=",$course]])->skip($skip)->take($take)->get();
        if ($therow ==null || sizeof($therow)==0 ){
            return response()->json(["response"=>"group not found"],404);
        }
        return response()->json(["response"=>$therow],200);
    }

     function readone($course,$group,$groupno){

        $therow = GroupTable::where([["group","=",$group],["groupno","=",$groupno],["course","=",$course]])->get();

        if ($therow ==null || sizeof($therow)==0 ){
            return response()->json(["response"=>"group not found"],404);
        }
        return response()->json(["response"=>$therow],200);

    }

     function create(Request $request){
        $group= $request->group;
        //$groupno = $request->groupno;
        $course = $request->course;
        $data = $request->data;



        //gimme a fact of the rows and column i am working with
        $rows= intval($request->rows);
        $cols = intval($request->cols);

        for($i = 1; $i<$rows+1; $i++){

            //prepare mass insertion array

            $values = array();
            $columnarray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            for($j=0;$j<$cols; $j++){
                $values[$columnarray[$j]]= (array_key_exists($i, $data) && array_key_exists($j, $data[$i])) ? $data[$i][$j]:"";

            }
            $values['group']=$group;
            $values['groupno']= $i;
            $values['course'] = $course;
            $therow = GroupTable::create($values);

        }
        return response()->json(["response"=>"tables created"],201);
    }

     function update(Request $request){
        $group= $request->group;
        $course = $request->course;
        $data = $request->data;

        //gimme a fact of the rows and column i am working with
        $rows= intval($request->rows);
        $cols = intval($request->cols);


        for($i = 1; $i<$rows+1; $i++){
            $therow = GroupTable::where([["group","=",$group],["groupno","=",$i],["course","=",$course]])->get();

            if ($therow ==null || sizeof($therow)==0 ){
               // return response()->json(["response"=>"group not found"],404);
               $values = array();
               $values['group']=$group;
               $values['groupno']= $i;
               $values['course'] = $course;
               GroupTable::create($values);
               $therow = GroupTable::where([["group","=",$group],["groupno","=",$i],["course","=",$course]])->get();
            }
            //prepare mass insertion array

            $values = array();
            $columnarray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            // $values['group'] = $group;
            // $values['groupno'] = $i;
            for($j=0;$j<$cols; $j++){
            $values[$columnarray[$j]]= (array_key_exists($i, $data) && array_key_exists($j, $data[$i])) ? $data[$i][$j]:"";
            }

            $therow->first()->update($values);

        }
        return response()->json(["response"=>"tables updated "],201);
    }


     function updated (Request $request){
        $group= $request->group;
        $course = $request->course;
        $data = $request->data;

        //gimme a fact of the rows and column i am working with
        // $rows= intval($request->rows);
        // $cols = intval($request->cols);


        foreach($data as $mykey => $myvalue){
            $therow = GroupTable::where([["group","=",$group],["groupno","=",$mykey],["course","=",$course]])->get();

            if ($therow ==null || sizeof($therow)==0 ){
               // return response()->json(["response"=>"group not found"],404);
               $values = array();
               $values['group']=$group;
               $values['groupno']= $mykey;
               $values['course'] = $course;
               GroupTable::create($values);
               $therow = GroupTable::where([["group","=",$group],["groupno","=",$mykey],["course","=",$course]])->get();
            }
            //prepare mass insertion array

            $values = array();
            $columnarray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            // $values['group'] = $group;
            // $values['groupno'] = $i;
            $counter = 0;
            foreach ($myvalue as $content){
            $values[$columnarray[$counter]]= $content;
            $counter +=1;
            }

            $therow->first()->update($values);

        }
        return response()->json(["response"=>"tables updated "],201);
    }

     function newupdated (Request $request){
        try{
        $data = $request->data;
        $some= [];
        foreach($data as $agroup){

            $course = $agroup['course'];
            $group = $agroup['group'];
            $groupno = $agroup['groupno'];

            $therow = GroupTable::where([["group","=",$group],["groupno","=",$groupno],["course","=",$course]])->get();
            if ($therow ==null || sizeof($therow)==0 ){
                $values = array();
                $values['group']=$group;
                $values['groupno']= $groupno;//$mykey;
                $values['course'] = $course;
                GroupTable::create($values);
                $therow = GroupTable::where([["group","=",$group],["groupno","=",$groupno],["course","=",$course]])->get();
             }
             //prepare mass insertion array

             $values = array();
             $columnarray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];


             foreach ($columnarray as $cell){
             $values[$cell]= $agroup[$cell];
            //  array_push($some,$agroup[$cell]);
             }

             $therow->first()->update($values);

         }
         return response()->json(["response"=>"tables updated ", "data"=>$data],201);
        }catch(Error $e){
            return response()->json(["error"=>$e]);
        }

    }

    function createrowifnotcreated ($course){
        try{
        $mycurl = new MyCurl();
        $response = $mycurl->visit('localhost:8002/course/'.$course.'/all-assigned');
        //  print_r($response);
           if($response==""||$response==null){

            return;
           }
        // $val = $response->course[0]->assigned;
         foreach ($response->course as $index => $courseobject){
            // print_r($response);
         foreach ($courseobject->assigned as $groupname => $groupnosarray) {
            $course = $courseobject->course;
            $group  = $groupname ;
            $groupnos = $groupnosarray;
            foreach($groupnos as $groupno){
                // print_r($courseobject->course);
                // print_r($group);
                // print_r($groupno);
                // print_r('/n');


            $therow = GroupTable::where([["group","=",$group],["groupno","=",$groupno],["course","=",$course]])->get();
            // print_r(sizeof($therow));
            if ($therow ==null || sizeof($therow)==0 ){
                $values = array();
                $values['group']=$group;
                $values['groupno']= $groupno;//$mykey;
                $values['course'] = $course;
                GroupTable::create($values);
            //     $therow = GroupTable::where([["group","=",$group],["groupno","=",$groupno],["course","=",$course]])->get();
            // //  }
            //  //prepare mass insertion array

            //  $values = array();
            //  $columnarray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];


            //  foreach ($columnarray as $cell){
            //  $values[$cell]= $agroup[$cell];
            // //  array_push($some,$agroup[$cell]);
            //  }

            //  $therow->first()->update($values);
            }
        }

        }
    }
        //  print_r($response);


        }catch(Error $e){
            return response()->json(["error"=>$e]);
        }

    }

    public function updateone (Request $request){
        $group= $request->group;
        $course = $request->course;
        $data = $request->data;
        $groupno = $request->groupno;



        // foreach($data as $mykey => $myvalue){
            $therow = GroupTable::where([["group","=",$group],["groupno","=",$groupno],["course","=",$course]])->get();

            if ($therow ==null || sizeof($therow)==0 ){
               // return response()->json(["response"=>"group not found"],404);
               $values = array();
               $values['group']=$group;
               $values['groupno']= $groupno;
               $values['course'] = $course;
               GroupTable::create($values);
               $therow = GroupTable::where([["group","=",$group],["groupno","=",$groupno],["course","=",$course]])->get();
            }
            //prepare mass insertion array

            $values = array();
            $columnarray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            // $values['group'] = $group;
            // $values['groupno'] = $i;
            $counter = 0;
            foreach ($data as $col=> $val){
            $values[$columnarray[$col]]= $val;
            $counter +=1;
            }

            $therow->first()->update($values);

        // }
        return response()->json(["response"=>"tables updated "],201);
    }

     function delete(Request $request){
        $group= $request->group;
        $groupno = $request->groupno;
        $course = $request->course;
        $deleted = Grouptable::where([["group","=",$group],["groupno","=",$groupno],["course","=",$course]])->delete();
        if($deleted==0){
            return response()->json(["response"=>"Row not found or could not delete row."],404);
        }
        return response()->json(["response"=>"row deleted ", "data"=>$deleted],200);
    }
    public function more(Request $request){

    }
}


class MyCurl{
    public static function visit($url){

        $cURLConnection = curl_init();

        curl_setopt($cURLConnection, CURLOPT_URL, $url);
        curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

        $content = curl_exec($cURLConnection);
        curl_close($cURLConnection);


        $result = json_decode($content);
        return $result;

    }
}
