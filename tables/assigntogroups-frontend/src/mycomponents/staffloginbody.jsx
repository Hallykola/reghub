import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

class StaffLoginBody extends Component {
    state = {  myform:{} } 
    
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
      const baseURL = process.env.REACT_APP_AUTH_BACKEND ;

      const {email,password} = this.state.myform;
      
      axios.post(baseURL,
        {email:email, password:password}).then((response) => {
        console.log(response);
        
       
        toast(response.data.user["email"]);
        toast(response.data.token);
        localStorage.setItem('token',response.data.token);
        // window.location.href = '/'
    
      }).catch((e)=>{
        console.log(e.response.data);
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
      this.setState({myform });
      console.log(this.state.myform);
    }

    render() { 
      
        return (
            <React.Fragment>
             <div>
       
        <ToastContainer />
      </div>
                <section className="showcase mt-2">
    <section className="p-5">
        <div className="container shadow-lg rounded bg-white px-5">
            <p className="pere text-secondary fs-3 text-warning pt-4 px-3 fw-bold">Staff Login</p>
            <form onSubmit={this.handleSubmit} className="row g-3 text-secondary">
                <div className="col-md-5 p-4">
                  <label for="inputname" className="form-label fw-bold" >Email</label>
                  <input type="text" className="form-control mb-3" onChange={this.handleinput} name='email' id="inputname"/>
                  <label for="inputmatricno" className="form-label fw-bold">Password</label>
                  <input type="password" className="form-control mb-3" onChange={this.handleinput} name='password' id="inputmatricno"/>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" onChange={this.handleinput} name="rememberme" id="gridCheck"/>
                    <label className="form-check-label mb-2" for="gridCheck">
                      Remember Me
                    </label>
                  </div>
                  <a className="pass text-info text-decoration-none mb-3" href="">Forgot Password?</a>
                  <div>
                  <a className="pass text-info text-decoration-none mb-3" href="/staffregister">Register</a>
                  </div>
                  <div className="course mt-5">
                      <button type='submit'  className="btn btn-info btn-lg px-5 text-white fw-bold">Login</button>
                  </div>
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-5">
                <img className="recruit img-fluid w-75 d-none d-sm-block mb-2" src="images/casual-life-3d-recruiter-woman-having-online-interview.png"/>
                </div>
              </form>
              </div>
              </section>
              </section>
              
            </React.Fragment>
        );
    }
}
 
export default StaffLoginBody;