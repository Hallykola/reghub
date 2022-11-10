import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import GroupTile from './grouptile';

class CreateCourseBody extends Component {
   mymap = new Map();
    state = {  myform:{} , s:[], groupingmap:{}} ;
    login(){
      const baseURL = "http://localhost:8003/auth/login?name=hally&email=hkyusuf@unilag.edu.ng5&password=loveme";
      axios.get(baseURL).then((response) => {
        console.log(response);
        toast(response.data.user["email"]);
        toast(response.data.token);
        
      });
      
      // window.location.href = '/'
    }

    handleSubmit = (e)=>{
      e.preventDefault();
      var atoken = localStorage.getItem('token');
      const baseURL = "http://localhost:8002/course" ; //process.env.REACT_APP_COURSE_BACKEND ;

      const {course,info, more} = this.state.myform;
      const { groupingmap} = this.state
      var data = {course:course, info:info, more:more, groupingmap:groupingmap, token:localStorage.getItem('token')};
      console.log(baseURL,data);
      axios.post(baseURL,data,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log(response);
        
       
        toast("Course created");
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

    addGroup=(e)=>{
      var ans  = this.state.s;
      
      ans.push({name:this.state.s.length,labels:""});
     
      this.setState({s:ans});
      console.log(this.state.s.length);
      
    }

    deleteGroup=(i,val)=>{
      console.log("delete "+ i);
      var ans  = this.state.s;
       ans.splice(i,1);
      this.setState({s:ans});
    
      var gmap = this.state.groupingmap
      delete gmap[val]
      
      this.setState({groupingmap:gmap},()=>{console.log(this.state)});
  
      
    }

    sendvalues=(val)=>{
      var gmap = this.state.groupingmap
      console.log("see me",val);
      gmap[val.label]= {"department":val.department,"numberpergroup":val.numberpergroup};
      this.setState({groupingmap:gmap},()=>{console.log(this.state)});

    }

    showGroup= ()=>{
      this.state.s.map((object, i)=>{
      // return <GroupTile obj={object} adelete={()=>this.deleteGroup(i)} key={i} />;
      return <GroupTile obj={object} adelete={()=>this.deleteGroup(i)} key={i} />;

  }
  
  )
  
    }
    
    render() { 
       
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
            <form onSubmit={this.handleSubmit} class="row g-3 text-secondary">
                <div class="col-md-6">
                  <label for="inputname" class="form-label">Course Name</label>
                  <input type="coursename" class="form-control" id="inputname" onChange={this.handleinput} name="course"/>
                </div>
                <div class="col-md-6">
                  <label for="inputmatricno" class="form-label">Course Title</label>
                  <input type="coursetitle" class="form-control" id="inputmatricno" onChange={this.handleinput} name="info"/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Course Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleinput} name="more"></textarea>
                  </div>
                  <button type="button" onClick={this.addGroup}> Add Group</button>

                 
               { this.state.s.map((element, i)=>{
      return <GroupTile sendvalues={this.sendvalues} obj={element.name} adelete={(val)=>this.deleteGroup(i,val)} key={i} />})
      }
  
                  
                  
                
                {/* <div class="col-md-12">
                  <label for="inputname" class="form-label">Admin</label>

                  <input type="coursename" class="form-control" id="inputname" onChange={this.handleinput} name="department"/>
                  <input type="coursename" class="form-control" id="inputname" onChange={this.handleinput} name="department"/>
                  <input type="coursename" class="form-control" id="inputname" onChange={this.handleinput} name="department"/>
                </div> */}
                
                <div class="col-12">
                <button type="submit" class="btn btn-info btn-lg text-white">Create Course</button>
                </div>
              </form>
            </div>
    </section>
        </section>
            </React.Fragment>
        );
    }
}
 
export default CreateCourseBody;