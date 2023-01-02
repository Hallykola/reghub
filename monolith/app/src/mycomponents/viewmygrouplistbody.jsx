import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import GroupRow from './grouprow';


import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { getData } from '../services/myauth';

class ViewMyGroupListBody extends Component {
    state = {  data:[],rows:[] } ;
   

    getGroups=()=>{
      console.log('hello');
      toast('otilo');

      var atoken = localStorage.getItem('token');
      const user = getData();
      const baseURL = `http://localhost:8003/course/getmycourses?userid=${user.id}`  ; //process.env.REACT_APP_COURSE_BACKEND ;

      axios.get(baseURL,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log(response.data);
        this.setState({data:response.data.courses},()=>{console.log('checky data',this.state.data)});
       
     
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
      this.getGroups();
     } 
    render() { 
      
    
        return (
            <section >
    <section class="p-5">
    <div>
      <ToastContainer />
    </div>
      <div style={{width:"3000px"}} class=" shadow-lg ">
            <p class="pere text-secondary fs-3 text-warning mb-5 fw-bold">My Registered Groups</p>
            {/* <p class="pere text-secondary fs-3 text-warning mb-5 fw-bold">{`${this.thecourse} ${this.group}${this.groupno}`}</p> */}
            <hr/>
            {/* <h1>{this.state.data.courses[0].course}</h1> */}
            <hr/>
            <br/>
            <form class="row g-3 text-secondary">
              <table style={{width:"3000px"}}>
             
              </table>
            <br/>
            <br/>
           
            {this.state.data.map(acourse => (  
          <a href={`/viewgroup/${acourse.course}/${acourse.group}/${acourse.number}`}>  
            {acourse.course.toString()}  
          </a>  
        ))}  
                  
              </form>
              </div>
              </section>
              </section>
        );
    }
}
 
export default ViewMyGroupListBody;