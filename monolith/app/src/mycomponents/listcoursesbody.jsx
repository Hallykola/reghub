import React, { Component } from 'react';
import CourseTile from './coursetile';
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

class ListCoursesBody extends Component {
    state = { courses:[], loading:false } 

    componentDidMount()
    { 
      console.log('hello bae');
      this.getMyCourse();
    
    }

    getMyCourse=()=>{
      this.setState({loading:true});
        var atoken = localStorage.getItem('token');
        var data = {};
    const baseURL = 'http://localhost:8002/course/all' ;

    console.log(baseURL,data,atoken);
    axios.post(baseURL,data,{headers: {
      'token': `${atoken}`
    }}
      ).then((response) => {
      console.log(response);
      var newcourses = response.data.ownership ;
      // this.state = { courses:newcourses }  ;
      // console.log('check',newcourses);
      // console.log('checky',this.state.courses[0].email);
      this.setState({courses:newcourses},()=>{console.log('checky again',this.state.courses)});
     
      toast("Courses fetched");
      this.setState({loading:false});
  
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
      
      this.setState({loading:false});
    });

    }
   

    buildCourse=()=>{
      
        var elements = [];
        for(var i =0; i<this.state.courses.length;i++){
          console.log(this.state.courses[i].email);
            elements.push(
                
                <CourseTile details={this.state.courses[i]} key={i.toString()} />               
            );
            
        }
        return elements;
    }
    handleEmptyCourses = ()=>{
      if (this.state.loading){
        return <h3>Loading courses...</h3>
      }
      if(this.state.courses.length<1){
        return <h>No courses to display</h>}
      
    }
    render() { 
        //this.getMyCourse();
        return (
            <React.Fragment>
                <div>
       <ToastContainer />
     </div>
       <section class="showcase mt-5">
    <section class="p-5">
        <p class="per text-secondary fs-3 mx-4 mb-5">Welcome, <strong>{this.props.user.name}</strong></p>
        <div class="container shadow-lg p-3 rounded bg-white px-5">
            <p class="pere text-secondary fs-3 text-warning mb-5">Create a Course</p>
            <a href='/createcourse'>Add course</a>
            <div className='mycontainer'>
            {this.buildCourse()}
            {this.handleEmptyCourses()}
            </div>
            </div>
    </section>
        </section>
                </React.Fragment>
        );
    }
}
 
export default ListCoursesBody;