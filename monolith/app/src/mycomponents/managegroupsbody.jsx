import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import GroupRow from './grouprow';


import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

class ManageGroupsBody extends Component {
    state = {  myform:[],rows:[] } ;
    
    getGroups=()=>{
      const thecourse = window.location.href.split('/')[4];
      const group = window.location.href.split('/')[5];
      var atoken = localStorage.getItem('token');
      const {course,info, more} = this.state.myform;
      const baseURL = `http://localhost:8004/grouptables/${thecourse}/${group}`  ; //process.env.REACT_APP_COURSE_BACKEND ;

      axios.get(baseURL,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log(response);
        this.setState({myform:response.data.response},()=>{console.log('checky data',this.state.myform)});
       
        toast("Groups fetched");
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
    updateGroups=()=>{
      var atoken = localStorage.getItem('token');
      const {course,info, more} = this.state.myform;
      const baseURL = `http://localhost:8004/grouptables`  ; //process.env.REACT_APP_COURSE_BACKEND ;

      var data = {...this.state.myform};
      console.log(baseURL,data);
      axios.post(baseURL,data,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log(response);
        this.setState({myform:response.data.data},()=>{console.log('checky data',this.state)});
       
        toast("Groups fetched");
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
    updateformhere =(e,index)=>{
     
        var myform = {...this.state.myform};
    
          myform[index][e.target.name] = e.target.value;
          console.log('halbobo1',Object.values(myform));
        this.setState({myform:Object.values(myform)},()=>{
         
          //  this.props.sendvalues(this.state.myform)
         
          console.log('bobo',this.state.myform)});
   
    }
    componentDidMount(){
      this.getGroups();
     } 
    render() { 
      var myrows= [];
      // console.log('yeye',this.state.myform);
      Array.from(this.state.myform).forEach((value,index)=> {
        myrows.push( <GroupRow values={value} sendvalue ={(e)=>this.updateformhere(e,index)}/>)
        console.log('yaay', value);
      });
    
        return (
            <section >
    <section class="p-5">
    <div>
      <ToastContainer />
    </div>
      <div style={{width:"3000px"}} class=" shadow-lg ">
            <p class="pere text-secondary fs-3 text-warning mb-5 fw-bold">GROUP A TABLES</p>
            <form class="row g-3 text-secondary">
              <table style={{width:"3000px"}}>
              {myrows}
              </table>
              
                <div class="col-md-6">
                  <label for="inputname" class="form-label">Name</label>
                  <input type="name" class="form-control" id="inputname"/>
                </div>
                <div class="col-md-6">
                  <label for="inputmatricno" class="form-label">Institutional Email</label>
                  <input type="text" class="form-control" id="inputinstitutionemail"/>
                </div>
                <div class="col-md-6">
                  <label for="inputdepartment" class="form-label">Department</label>
                  <input type="text" class="form-control" id="inputdepartment"/>
                </div>
                <div class="col-md-6">
                    <label for="inputphonenumber" class="form-label">Phone number</label>
                    <input type="text" class="form-control" id="Phonenumber"/>
                  </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Password</label>
                    <input type="password" class="form-control" id="inputPassword4"/>
                  </div>
                  <div class="col-md-6">
                    <label for="inputPassword4" class="form-label"> Confirm Password</label>
                    <input type="password" class="form-control" id="inputPassword4"/>
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
                <a href="staffdashboard.html"><button type="submit" class="btn btn-info btn-lg text-white">Register Me</button></a>
                </div>
              </form>
              </div>
              </section>
              </section>
        );
    }
}
 
export default ManageGroupsBody;