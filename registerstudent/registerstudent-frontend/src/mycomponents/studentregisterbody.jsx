import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'; 


class StudentRegisterBody extends Component {
    state = {stage:1,myform:{}, course:'PHS220' } ;
    atoken = localStorage.getItem('token');
    
    handleSubmit1 = (e)=>{
      e.preventDefault(); 
      console.log("see me first ",this.atoken);
      const baseURL = "http://localhost:8001/auth/getstudentprofile/" ;
      var data = {...this.state.myform,};

      console.log("see me",baseURL,data);
      axios.post(baseURL,data,{headers: {
        'token': `${this.atoken}`
      }}
        ).then((response) => {
        console.log(response);
          this.handlecheckuserresponse(response);
       
        
        
        // window.location.href = '/stafflogin'
    
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
     


    })
  }
  handlecheckuserresponse = (response)=>{
     // check if student exists in system
    
     if(response.data['error']){
      toast(response.data['error']);
      //if user no exist
      this.setState({stage:2},()=>{
        console.log('stage 2');
      })
    }else{
        //if user exists
        this.setState({stage:3,profile:response.data.profile},()=>{
          console.log('stage 3',this.state.profile.id);
          toast("User exists");
        })

    }
   
  }
  handleSubmit2 = (e)=>{
    e.preventDefault();
    
    const baseURL = "http://localhost:8001/auth/registerstudentforprofile/" ;
    var data = {...this.state.myform,};

    console.log("see me",baseURL,data);
    axios.post(baseURL,data,{headers: {
      'token': `${this.atoken}`
    }}
      ).then((response) => {
      console.log(response);
        toast(response.data.profile)
      
        this.setState({stage:3,profile:response.data.profile},()=>{
          console.log('stage 3',this.state);
        })
      // window.location.href = '/stafflogin'
  
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
   


  })
    
  }
  
    handleSubmit3 = (e)=>{
      e.preventDefault();
      
      const baseURL = "http://localhost:8003/course/" ;
      var data = {...this.state.profile ,course:this.state.course,userid:this.state.profile.id};

      console.log("see me",baseURL,data);
      axios.post(baseURL,data,{headers: {
        'token': `${this.atoken}`
      }} ).then((response) => {
        console.log(response);
          toast(`${this.state.profile.name} is now registered`)
        
          this.setState({stage:4,grouping:response.data.grouping},()=>{
            console.log('stage 4');
          })
        // window.location.href = '/stafflogin'
    
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
     


    })
      
    }

    handleinput= (e)=>{
        const myform = {...this.state.myform};
        myform[e.target.name] = e.target.value;
        this.setState({myform},()=>{console.log(this.state.myform)});
        
      }
    
    showPasswordDetails(){
      return (<>
      <form onSubmit = {this.handleSubmit2} class="row g-3 text-secondary">
        <p>Student does not exist on database. Enter details to create account for</p>
        <p className="pere text-secondary fs-5 text-warning mb-2 fw-bold">{ this.state.myform.email}</p>
        <div class="col-md-6">
                  <label for="inputname" class="form-label">Name</label>
                  <input type="name" class="form-control" id="inputname" onChange={this.handleinput} name="name" value={this.state.myform.name??''}/>
                </div>
                <div class="col-md-6">
                  <label for="inputmatricno" class="form-label">Matriculation number</label>
                  <input type="text" class="form-control" id="inputmatricno" onChange={this.handleinput} name="matricnumber" value={this.state.myform.matricnumber??''}/>
                </div>
                  {/* <div class="col-md-4">
                  <label for="inputdepartment" class="form-label">Department</label>
                  <input type="text" class="form-control" id="inputdepartment" onChange={this.handleinput} name="department" value={this.state.myform.department??''}/>
                </div> */}
                <div class="col-md-4">
                  <label for="inputlevel" class="form-label">Department</label>
                  <select id="inputlevel" class="form-select" onChange={this.handleinput} name="department" value={this.state.myform.department??'Choose Department'}>
                    <option>physics</option>
                    <option>200 Level</option>
                    <option>300 Level</option>
                    <option>400 Level</option>
                    <option>500 Level</option>
                    <option>Diploma</option>
                    <option>MSc</option>
                    <option> Others</option>
                    <option selected> Choose Department</option>
                  </select>
                </div>

                <div class="col-md-4">
                  <label for="inputlevel" class="form-label">Level</label>
                  <select id="inputlevel" class="form-select" onChange={this.handleinput} name="level" value={this.state.myform.level??'Choose level'}>
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
       <div class="col-md-4">
                  <label for="inputphonenumber" class="form-label">Phone number</label>
                  <input type="text" class="form-control" id="Phonenumber" onChange={this.handleinput} name="phonenumber" value={this.state.myform.phonenumber??''}/>
                </div>
                <div class="col-md-4">
                    <label for="inputPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="inputPassword" onChange={this.handleinput} name="password" value={this.state.myform.password??''}/>
                  </div>
                  <div class="col-md-4">
                    <label for="inputPassword4" class="form-label"> Confirm Password</label>
                    <input type="password" class="form-control" id="inputPassword4" onChange={this.handleinput} name="passwordagain" value={this.state.myform.passwordagain??''}/>
                  </div>
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck"/>
                    <label class="form-check-label" for="gridCheck" onChange={this.handleinput} name="name" value={this.state.myform.name??''}>
                      I agree that the information provided above is true.
                    </label>
                  </div>
                </div>
                <div class="col-6">
                <button type="button" onClick={()=>{this.setState({stage:1})}} class="btn btn-info btn-lg text-white">Previous </button>
                </div>
                <div class="col-6">
                <button type="submit"  class="btn btn-info btn-lg text-white">Next </button>
                </div>
                
                </form>
      </>);
    }
    showRegisterDetails=()=>{
      return(
<>
<form onSubmit = {this.handleSubmit1} class="row g-3 text-secondary">
                
                <div class="col-md-12">
                  <label for="inputemail" class="form-label">Student's Email Address</label>
                  <input type="text" class="form-control" id="inputemail" onChange={this.handleinput} name="email" value={this.state.myform.email??''}/>
                </div>
               
              
               
                <div class="col-12">
                <button  class="btn btn-info btn-lg text-white">Register Student</button>
                </div>
              </form></>
      );
    }

    showStudentDetails= ()=>{
      return(<>
      <form onSubmit = {this.handleSubmit3} class="row g-3 text-secondary">
        <p class="pere text-secondary fs-5 text-warning mb-2 fw-bold">Confirm details of student to be registered for {this.state.course}</p>
        <p class="pere text-secondary fs-5 text-primary mb-2 fw-bold">Name: {this.state.profile.name}</p>
        <p class="pere text-secondary fs-5 text-primary mb-2 fw-bold"> Matric number: {this.state.profile.matricnumber} </p>
        <p class="pere text-secondary fs-5 text-primary mb-2 fw-bold"> Department: {this.state.profile.department} </p>
        <p class="pere text-secondary fs-5 text-primary mb-2 fw-bold"> Phone number: {this.state.profile.phonenumber} </p>
        <p class="pere text-secondary fs-5 text-primary mb-2 fw-bold"> Email: {this.state.profile.email} </p>

        <p></p>
        <div class="col-6">
                <button type="button" onClick={()=>{this.setState({stage:1})}} class="btn btn-info btn-lg text-white">Previous </button>
                </div>
        <div class="col-6">
        <button type="submit" class="btn btn-info btn-lg text-white">Proceed to Register</button>
        </div>
        </form>
      </>);
    }

    showCompletedRegisterationDetails= ()=>{
      return(<>
        <p class="pere text-secondary fs-5 text-success mb-2 fw-bold">SUCCESS</p>
        <h1 class="pere text-secondary fs-5 text-success mb-2 fw-bold">Group {this.state.grouping.group}{this.state.grouping.number}</h1>
        <p>{this.state.profile.name} is now registered to Group {this.state.grouping.group}{this.state.grouping.number} for {this.state.grouping.course}</p>
        <div class="col-6">
                <button type="button" onClick={()=>{this.setState({stage:1})}} class="btn btn-info btn-lg text-white">Previous </button>
                </div>
        <div class="col-6">
        <a href='/studentregister'><button type="button" class="btn btn-info btn-lg text-white">Register A New Student</button></a>
        </div>
      </>);
    }
    render() { 
        return (
            <section class="showcase mt-5">
    <section class="p-5">
    <div>
       <ToastContainer />
     </div>
      <div class="container shadow-lg p-3 rounded bg-white px-5">
            <p class="pere text-secondary fs-3 text-success mb-2 fw-bold">{this.state.course}</p>
            <p class="pere text-secondary fs-3 text-warning mb-5 fw-bold">Student Course Registration</p>
            {this.state.stage==1&&this.showRegisterDetails()}
            {this.state.stage==2&&this.showPasswordDetails()}
            {this.state.stage==3&&this.showStudentDetails()}
            {this.state.stage==4&&this.showCompletedRegisterationDetails()}
              </div>
            </section>
            </section>
        );
    }
}
 
export default StudentRegisterBody;