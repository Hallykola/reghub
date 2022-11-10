<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Http\Controllers\OwnershipController;
use Illuminate\Support\Facades\App;

class CourseController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function read(Request $request){
        $mycourse = Course::where('course','=',$request->course)->first();
        if ($mycourse==null){
            return  response()->json(['error'=>'No course found']);
        }
        return response()->json(['course'=>$mycourse, 'assigned'=> $mycourse['assigned']], 200);
    }

    public function readall(Request $request){
        $mycourse = Course::where([]);
        return response()->json(['course'=>$mycourse], 200);
    }

    public function create(Request $request){
        $this->validate($request, [
            'course' => 'required|unique:courses',
            'info' => 'required',
            'more' => 'required',
            // 'createdby' => 'required',
            'groupingmap' => 'required'
        ]);
        $auser = App::make('User');
         print_r($auser->email);

        $unassigned = array();
        $assigned = array();
        $groupingmap = $request->groupingmap;
        //handle assigned
        foreach($groupingmap as $group => $depts){
            $container = array();
            $numberpergroup = intval($depts['numberpergroup']);
            for ($i=0; $i<$numberpergroup; $i++){
                array_push($container, ...range(1,1000));

            }
            sort($container);
            $unassigned[$group]=$container;

        }
        //handle unassigned
        foreach($groupingmap as $group => $depts){
            $container = array();
            $assigned[$group]=$container;
        }
        $newcourse = Course::create([
            'course'=>$request->course,
            'unassigned'=>$unassigned,
            'assigned' =>$assigned,
            'groupingmap'=>$groupingmap,
            'info'=> $request->info,
            'createdby'=>$auser->email,
            'more'=>$request->more
        ]);
        $oc = new OwnershipController();
        $oc->addUsertoCourse($auser->email, $request->course, 'ADMIN', $request->info);

        return response()->json(['course'=>$newcourse], 201);
    }
    public function update(Request $request){
        $this->validate($request, [
            'info' => 'required',
            'more' => 'required',
            // 'createdby' => 'required',
            'groupingmap' => 'required'
        ]);
        $course = $request->course;
        $info = $request->info;
        $more = $request->more;
        $groupingmap = $request->groupingmap;

        //fetch group
        $mycourse =  Course::where('course','=',$course)->first();


        if($mycourse->update(['info'=>  $info,'more' =>  $more, 'groupingmap' =>  $groupingmap])){
        $mycourse->save();

        //return udpdated group details
        $mycourseupdated =  Course::where('course','=',$course)->first();
        return response()->json(['course'=>$mycourseupdated], 201);
        }
        //return error message
        return response()->json(['error'=>"Could not update course"], 404);

    }

    public function delete(Request $request, $course){
        $oc = new OwnershipController();

        $response = $oc->removeCourse($course);
        $mycourse=  Course::where('course','=',$course)->first();
        $mycourse->delete();


        return response()->json(['status'=>"deleted"], 201);
    }

    public function pluckgroupnumber(Request $request){
        $course = $request->course;
        $feature = $request->feature;

        //determine group from feature
        $mycourse =  Course::where('course','=',$course)->first();
        if ($mycourse==null){
            return response()->json(['error'=>'Course doesn\'t exist' ], 404);
        }
        $groupingmap = $mycourse->groupingmap;
        $assigned = $mycourse->assigned;
        $unassigned  = $mycourse->unassigned;
        $confirmedgroup = "";

        //get group based on feature ie group based on department
        foreach($groupingmap as $group => $depts){

            if (in_array($feature,$depts['department'])){
                $confirmedgroup = $group;

                break;
            }

        }

        if ($confirmedgroup==""){
            return response()->json(['error'=>'Feature or department doesn\'t exist' ], 404);
        }
        $groupsunassigned = $unassigned[$confirmedgroup];
        $groupsassigned = $assigned[$confirmedgroup];
        //remove topmost unassigned, add it to assigned and return the value
        //remove from unassigned
        $newgroupnumber = array_shift($groupsunassigned);
        //add to assigned
        array_push($groupsassigned,$newgroupnumber);

        // update save assigned and unassigned
        $unassigned[$confirmedgroup] = $groupsunassigned;
        $assigned[$confirmedgroup] = $groupsassigned;

        $mycourse->update(['assigned'=>  $assigned,'unassigned' =>  $unassigned]);
        $mycourse->save();

        //return new group number
        return response()->json(['group'=>$confirmedgroup,'number'=>$newgroupnumber], 200);
    }

    //


}
