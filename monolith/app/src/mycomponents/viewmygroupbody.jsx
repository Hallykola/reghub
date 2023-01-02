import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import GroupRow from './grouprow';


import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import ViewOnlyGroupRow from './viewonlygrouprow';

class ViewMyGroupBody extends Component {
    state = {  myform:[],rows:[] } ;
     thecourse = window.location.href.split('/')[4];
    group = window.location.href.split('/')[5];
     groupno = window.location.href.split('/')[6];

    getGroups=()=>{
      console.log('hello');
      

      var atoken = localStorage.getItem('token');
      const {course,info, more} = this.state.myform;
      const baseURL = `http://localhost:8004/grouptables/${this.thecourse}/${this.group}/${this.groupno}`  ; //process.env.REACT_APP_COURSE_BACKEND ;

      axios.get(baseURL,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log(response);
        this.setState({myform:response.data.response},()=>{console.log('checky data',this.state.myform)});
       
        toast(`Group ${this.group}${this.groupno} fetched`);
        // toast(response.data.token);
        // localStorage.setItem('token',response.data.token);
        // window.location.href = '/'
    
      }).catch((e)=>{
        console.log(e.response);
        // window.location.href = '/'
        if(e.response.data['error']){
          toast(e.response.data['error']);
        }else if(e.response.data['response']){
          toast(e.response.data['response']);
        }
        else{
          for (let a in e.response.data){
            toast(e.response.data[a.toString()][0]);
            console.log(e.response.data[a.toString()][0]);
           }
        }
        
         
      });
    }
    updateGroups=(e)=>{
      e.preventDefault();
      console.log('haya');
      var atoken = localStorage.getItem('token');
      const {course,info, more} = this.state.myform;
      const baseURL = `http://localhost:8004/grouptables`  ; //process.env.REACT_APP_COURSE_BACKEND ;

      var val =  {...this.state.myform};
      var data = {data:Object.values(val)};
      console.log(baseURL,data);
      axios.post(baseURL,data,{headers: {
        'token': `${atoken}`
      }}
        ).then((response) => {
        console.log(response);
        this.setState({myform:response.data.data},()=>{console.log('checky data',this.state)});
       
        toast("Groups updated");
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
        myrows.push( <ViewOnlyGroupRow values={value} sendvalue ={(e)=>this.updateformhere(e,index)}/>)
        console.log('yaaye', value);
      });
    
        return (
            <section >
    <section class="p-5">
    <div>
      <ToastContainer />
    </div>
      <div style={{width:"3000px"}} class=" shadow-lg ">
            <p class="pere text-secondary fs-3 text-warning mb-5 fw-bold">My Group</p>
            {/* <p class="pere text-secondary fs-3 text-warning mb-5 fw-bold">{`${this.thecourse} ${this.group}${this.groupno}`}</p> */}
            <hr/>
            <h1>{`${this.thecourse}`}</h1>
            <hr/>
            <br/>
            <form class="row g-3 text-secondary">
              <table style={{width:"3000px"}}>
              {myrows}
              </table>
            <br/>
            <br/>
            
              
                  
              </form>
              </div>
              </section>
              </section>
        );
    }
}
 
export default ViewMyGroupBody;