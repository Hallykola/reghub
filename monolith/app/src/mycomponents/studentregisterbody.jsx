import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'; 

class StudentRegisterBody extends Component {
    state = { myform:{} } 
    handleSubmit = (e)=>{
      e.preventDefault();
      var atoken = localStorage.getItem('token');
      const baseURL = "http://localhost:8001/auth/register/" ; //process.env.REACT_APP_COURSE_BACKEND ;

     //const {course,info, more} = this.state.myform;
      // const { groupingmap} = this.state
      var data = {...this.state.myform};

      console.log("see me",baseURL,data);
      axios.post(baseURL,data,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log(response);
        
       
        toast("User registered");
         toast(response.data.token);
        localStorage.setItem('token',response.data.token);
        window.location.href = '/studentlogin'
    
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
      this.setState({myform},()=>{console.log(this.state.myform)});
      
    }

    render() { 
        return (
            <section class="showcase mt-5">
    <section class="p-5">
      <div class="container shadow-lg p-3 rounded bg-white px-5">
            <p class="pere text-secondary fs-3 text-warning mb-5 fw-bold">Student Registration</p>
            <div>
       
       <ToastContainer />
     </div>
            <form class="row g-3 text-secondary" onSubmit={this.handleSubmit}>
                <div class="col-md-6">
                  <label for="inputname" class="form-label">Name</label>
                  <input type="name" class="form-control" id="inputname" onChange={this.handleinput} name="name"/>
                </div>
                <div class="col-md-6">
                  <label for="inputmatricno" class="form-label">Matriculation number</label>
                  <input type="text" class="form-control" id="inputmatricno" onChange={this.handleinput} name="matricnumber"/>
                </div>
                <div class="col-md-6">
                  <label for="inputemail" class="form-label">Email Address</label>
                  <input type="text" class="form-control" id="inputemail" onChange={this.handleinput} name="email"/>
                </div>
                <div class="col-md-6">
                  <label for="inputphonenumber" class="form-label">Phone number</label>
                  <input type="text" class="form-control" id="Phonenumber" onChange={this.handleinput} name="phonenumber"/>
                </div>
                <div class="col-md-6">
                  <label for="inputdepartment" class="form-label">Department</label>
                  <input type="text" class="form-control" id="inputdepartment" onChange={this.handleinput} name="department"/>
                </div>
                <div class="col-md-6">
                  <label for="inputlevel" class="form-label">Level</label>
                  <select id="inputlevel" class="form-select" onChange={this.handleinput} name="level">
                    <option>100 Level</option>
                    <option>200 Level</option>
                    <option>300 Level</option>
                    <option>400 Level</option>
                    <option>500 Level</option>
                    <option>Diploma</option>
                    <option>MSc</option>
                    <option> Others</option>
                    <option selected> Choose level</option>
                  </select>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Password</label>
                    <input type="password" class="form-control" id="inputPassword4" onChange={this.handleinput} name="password"/>
                  </div>
                  <div class="col-md-6">
                    <label for="inputPassword" class="form-label"> Confirm Password</label>
                    <input type="password" class="form-control" id="inputPassword" onChange={this.handleinput} name="passwordagain"/>
                  </div>
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck"/>
                    <label class="form-check-label" for="gridCheck">
                      I agree that the information provided above is true.
                    </label>
                  </div>
                </div>
                <div class="col-12">
                <a href="Studentdashboard.html"><button type="submit" class="btn btn-info btn-lg text-white">Register Me</button></a>
                </div>
              </form>
              </div>
            </section>
            </section>
        );
    }
}
 
export default StudentRegisterBody;