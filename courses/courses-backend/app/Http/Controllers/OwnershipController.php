<?php

namespace App\Http\Controllers;
use App\Models\Ownership;
use Illuminate\Http\Request;
use App\Http\Controllers;
use Illuminate\Support\Facades\App;
use App\Models\Course;



// use Laravel\Lumen\Routing\Controller as BaseController;

class OwnershipController  extends Controller
{
    //
    function getAllCourses(){
        $auser = App::make('User');
        $myownerships = Ownership::where('email','=',$auser->email)->get();
        if ($myownerships==null){
            return  response()->json(['error'=>'No data found']);
        }
        return response()->json(['ownership'=>$myownerships], 200);

    }
    function getAllCoursesnDetails(){
        $auser = App::make('User');
        $myownerships = Ownership::where('email','=',$auser->email)->get();
        if ($myownerships==null){
            return  response()->json(['error'=>'No data found']);
        }
        $result = [];
        foreach($myownerships as $anownership){

            $anownership['coursedetail'] = $this->getCourseDetails( $anownership['course']);
            array_push($result, $anownership);

        }
        return response()->json(['ownership'=>$result], 200);
    }

    function getCourseDetails($course){
        $mycourse =  Course::where('course','=',$course)->first();
        return $mycourse;
    }

    function getAllAvailableCourses(){
        $myownerships = Ownership::all();
        if ($myownerships==null){
            return  response()->json(['error'=>'No data found']);
        }
        return response()->json(['ownership'=>$myownerships], 200);

    }

    function getAllAvailableCoursesnDetails(){

        $myownerships = Ownership::all();
        if ($myownerships==null){
            return  response()->json(['error'=>'No data found']);
        }
        $result = [];
        foreach($myownerships as $anownership){

            $anownership['coursedetail'] = $this->getCourseDetails( $anownership['course']);
            array_push($result, $anownership);

        }
        
        return response()->json(['ownership'=>$result], 200);
    }

    function removeCourse($course){

        $myownerships = Ownership::where('course',$course)->delete();
        if ($myownerships==null){
            return  response()->json(['error'=>'No data found']);
        }

        return response()->json(['ownership'=>$myownerships], 200);

    }

    function removeAdminFromCourse(Request $request){
        $this->validate($request, [
            'course' => 'required',
            'email' => 'required',
        ]);
        $myownerships = Ownership::where([['course', '=', $request->course],['email', '=', $request->email]])->delete();
        if ($myownerships==null){
            return  response()->json(['error'=>'No data found']);
        }
        return $this->getAllAdminForCourse($request->course);
    }

    function getAllAdminForCourse($course){
        $auser = App::make('User');
        $myownerships = Ownership::where('course','=',$course)->get();
        if ($myownerships==null){
            return  response()->json(['error'=>'No data found']);
        }
        return response()->json(['ownership'=>$myownerships], 200);

    }


    function addAdminToCourse(Request $request){
        $this->validate($request, [
            'course' => 'required',
            'info' => 'required',
            'status' => 'required'
        ]);
        $auser = App::make('User');

        $this->addUsertoCourse($request->email, $request->course, $request->status, $request->info);
        return $this->getAllAdminForCourse($request->course);
    }

    function addUsertoCourseRequest(Request $request){
        $this->validate($request, [
            'course' => 'required',
            'info' => 'required',
            'status' => 'required'
        ]);
        $auser = App::make('User');

        return $this->addUsertoCourse($auser->email, $request->course, $request->status, $request->info);
    }

    function addNewUsertoCourseRequest(Request $request){
        $this->validate($request, [
            'email' => 'required',
            'course' => 'required',
            'info' => 'required',
            'status' => 'required'
        ]);
        $auser = App::make('User');
        $mycourse =  Course::where('course','=',$course)->first();
        if($mycourse->createdby != $auser->email){
            return response()->json(['error'=>"You dont have permission to do this"], 403);
            ;
        }
        return $this->addUsertoCourse($request->email, $request->course, $request->status, $request->info);
    }
    function addUsertoCourse($email, $course, $status, $info){
        // $this->validate($request, [
        //     'course' => 'required|unique:courses',
        //     'info' => 'required',
        //     'more' => 'required',
        //     // 'createdby' => 'required',
        //     'numberpergroup' => 'required'
        // ]);
        // $auser = App::make('User');
        $newownership = Ownership::create([
            'course'=>$course,
            'email'=>$email,
            'status' =>$status,
            'info'=> $info,
        ]);
        return response()->json(['ownership'=>$newownership], 200);

    }
}
