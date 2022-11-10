import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';


import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import EditGroupTile from './editgrouptile';

class ViewEditCourseBody extends Component {
   mymap = new Map();
    state = {  myform:{} , s:[], groupingmap:{}, admins:[], admintoadd:''} ;
    
    handleSubmit = (e)=>{
      e.preventDefault();
      var atoken = localStorage.getItem('token');
      const baseURL = "http://localhost:8002/course/edit/" ; //process.env.REACT_APP_COURSE_BACKEND ;

      const {course,info, more} = this.state.myform;
      const { groupingmap} = this.state
      var data = {course:course, info:info, more:more, groupingmap:groupingmap, token:localStorage.getItem('token')};
      console.log(baseURL,data);
      axios.post(baseURL,data,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log(response);
        
       
        toast("Course updated");
        // toast(response.data.token);
        // localStorage.setItem('token',response.data.token);
        // window.location.href = '/'
    
      }).catch((e)=>{
        console.log(e.response);
        // window.location.href = '/'
        if(e.response.data['error']){
          toast(e.response.data['error']);
        }else{
          for (let a in e.response.data){
            toast(e.response.data[a.toString()][0]);
            console.log(e.response.data[a.toString()][0]);
           }
        }
        
         
      });

      // console.log(name,password);
    }

    handleinput= (e)=>{
      const myform = {...this.state.myform};
      myform[e.target.name] = e.target.value;
      this.setState({myform});
      console.log(this.state.myform);
    }

    addUserToCourse=(email)=>{
      var atoken = localStorage.getItem('token');
      const {course,info, more} = this.state.myform;
      const baseURL = `http://localhost:8002/course/addadmin/${course}`  ; //process.env.REACT_APP_COURSE_BACKEND ;

      var data = {course:course, info:info, status:"COLLEAGUE", email:email};
      console.log(baseURL,data);
      axios.post(baseURL,data,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log(response);
        this.setState({admins:response.data.ownership},()=>{console.log('checky admin',this.state)});
       
        toast("Admin added");
        // toast(response.data.token);
        // localStorage.setItem('token',response.data.token);
        // window.location.href = '/'
    
      }).catch((e)=>{
        console.log(e.response);
        // window.location.href = '/'
        if(e.response.data['error']){
          toast(e.response.data['error']);
        }else{
          for (let a in e.response.data){
            toast(e.response.data[a.toString()][0]);
            console.log(e.response.data[a.toString()][0]);
           }
        }
        
         
      });
    }

    getallAdmins=()=>{
      var atoken = localStorage.getItem('token');
      const {course,info, more} = this.state.myform;
      const baseURL = `http://localhost:8002/course/getalladmin/${course}` ; //process.env.REACT_APP_COURSE_BACKEND ;

      
      console.log(baseURL);
      axios.get(baseURL,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log("See my response",response);
        
        this.setState({admins:response.data.ownership},()=>{console.log('checky admin',this.state)});

        toast("Admin obtained");
        // toast(response.data.token);
        // localStorage.setItem('token',response.data.token);
        // window.location.href = '/'
    
      }).catch((e)=>{
        console.log(e.response);
        // window.location.href = '/'
        if(e.response.data['error']){
          toast(e.response.data['error']);
        }else{
          for (let a in e.response.data){
            toast(e.response.data[a.toString()][0]);
            console.log(e.response.data[a.toString()][0]);
           }
        }
        
         
      });
    }

    deleteAdmin=(email)=>{
      
      var atoken = localStorage.getItem('token');
      const {course,info, more} = this.state.myform;
      const baseURL = `http://localhost:8002/course/removeadmin/${course}` ; //process.env.REACT_APP_COURSE_BACKEND ;

      var data = {course:course, email:email};
      console.log(baseURL,data);
      axios.post(baseURL,data,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log(response);
        this.setState({admins:response.data.ownership},()=>{console.log('checky admin',this.state)});
       
        toast("Admin removed");
        // toast(response.data.token);
        // localStorage.setItem('token',response.data.token);
        // window.location.href = '/'
    
      }).catch((e)=>{
        console.log(e.response);
        // window.location.href = '/'
        if(e.response.data['error']){
          toast(e.response.data['error']);
        }else{
          for (let a in e.response.data){
            toast(e.response.data[a.toString()][0]);
            console.log(e.response.data[a.toString()][0]);
           }
        }
        
         
      });
    }

    deleteCourse=()=>{
      var atoken = localStorage.getItem('token');
      const {course} = this.state.myform;
      const baseURL = `http://localhost:8002/course/${course}` ; //process.env.REACT_APP_COURSE_BACKEND ;
      console.log(baseURL);
      
      var data = {course:course};
      console.log(baseURL,data);
      axios.delete(baseURL,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log(response);
         window.location.href = '/listcourses'
       
        toast("Course deleted");
      
    
      }).catch((e)=>{
        console.log(e.response);
        // window.location.href = '/'
        if(e.response.data['error']){
          toast(e.response.data['error']);
        }else{
          for (let a in e.response.data){
            toast(e.response.data[a.toString()][0]);
            console.log(e.response.data[a.toString()][0]);
           }
        }
        
         
      });

    }

    sendvalues=(val)=>{
      var gmap = this.state.groupingmap
      console.log("see me",val);
      gmap[val.label]= {"department":val.department,"numberpergroup":val.numberpergroup};
      this.setState({groupingmap:gmap},()=>{console.log(this.state)});

    }

 

    getACourse=()=>{
      const queryParams = new URLSearchParams(window.location.search);
      const thecourse = queryParams.get('course');


        var atoken = localStorage.getItem('token');
      var data = {"token":atoken};
  const baseURL = "http://localhost:8002/course?course="+ thecourse; //process.env.REACT_APP_COURSE_BACKEND ;

  console.log(baseURL,data);
  axios.get(baseURL,{headers: {
    'token': `${atoken}`
  }}
    ).then((response) => {
    console.log(response);
    var {assigned, course} = response.data ;
    // // this.state = { courses:newcourses }  ;
    // // console.log('check',newcourses);
    // // console.log('checky',this.state.courses[0].email);
    this.setState({myform:course, groupingmap:course.groupingmap},()=>{
      this.getallAdmins();
      console.log('checky again',this.state)});
    console.log("see",assigned,course);
    

  }).catch((e)=>{
    console.log(e.response);
    // window.location.href = '/'
    if(e.response.data['error']){
      toast(e.response.data['error']);
    }else{
      for (let a in e.response.data){
        toast(e.response.data[a.toString()][0]);
        console.log(e.response.data[a.toString()][0]);
       }
    }
  
  });

  }
  
   componentDidMount(){
    this.getACourse();
    // this.showMe();
   } 
    render() { 
      var groups= [];
      for (const [key, value] of Object.entries(this.state.groupingmap)) {
        // groups.push(<><h1>{key}</h1><p>{value}</p></>);
        groups.push(<EditGroupTile sendvalues={this.sendvalues} label={key} departments={value.department}/>)
        console.log('yaay',key, value);
      }
      var myadmins=[];
      this.state.admins.forEach( (value, i)=>{
        console.log(value,i);
        myadmins.push(
          <>
          <div class="col-md-10">
           <input type="coursename" class="form-control" id="inputname"  disabled name={`admin${i}`}   value={value.email}/>
           </div>
             <div class="col-md-2">
            {(value.email!==this.state.myform.createdby)&&
               <button type="button" onClick={()=>{this.deleteAdmin(value.email)}}>Remove</button>
        }
             </div>
             </>
           )
      });
        return (
            <React.Fragment>
             <div>
       
        <ToastContainer />
      </div>
      <section class="showcase mt-5">
    <section class="p-5">
        <p class="per text-secondary fs-3 mx-4 mb-5">Welcome, <strong>{this.props.user.name}</strong></p>
        <div class="container shadow-lg p-3 rounded bg-white px-5">
            <p class="pere text-secondary fs-3 text-warning mb-5">Edit Course</p>
            <form onSubmit={this.handleSubmit} class="row g-3 text-secondary">
                <div class="col-md-6">
                  <label for="inputname" class="form-label">Course Name</label>
                  <input type="coursename" class="form-control" id="inputname" onChange={this.handleinput} value={this.state.myform.course} disabled name="course"/>
                </div>
                <div class="col-md-6">
                  <label for="inputmatricno" class="form-label">Course Title</label>
                  <input type="coursetitle" class="form-control" id="inputmatricno" onChange={this.handleinput} value={this.state.myform.info} name="info"/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Course Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleinput} value={this.state.myform.more} name="more"></textarea>
                  </div>
                  {/* <button type="button" onClick={this.addGroup}> Add Group</button> */}

                 
               { this.state.s.map((element, i)=>{
      return <EditGroupTile sendvalues={this.sendvalues} obj={element.name} adelete={(val)=>this.deleteGroup(i,val)} key={i} />})
      }
   
      {groups}
      
                  
                  
                <h>Admins</h>
                <div class="col-md-8">
                  {/* <label for="inputname" class="form-label">Admin</label> */}

                  <input type="coursename" class="form-control" id="inputname" onChange={this.handleinput} name="admintoadd"/>
                 
                </div>
                <div class="col-md-4">
                  {/* <label for="inputname" class="form-label">Admin</label> */}

                  <button type="button" onClick={()=>this.addUserToCourse(this.state.myform['admintoadd'])}>Add User</button>
                </div>
                {myadmins}
                <div class="col-6">
                <button type="submit" class="btn btn-info btn-lg text-white">Update Course</button>
                </div>
                <div class="col-6">
                <button type="button" onClick={this.deleteCourse}  class="btn btn-info btn-lg text-white">Delete Course</button>
                </div>
              </form>
            </div>
    </section>
        </section>
            </React.Fragment>
        );
    }
}
 
export default ViewEditCourseBody;