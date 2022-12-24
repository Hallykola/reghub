import React, {Component } from 'react';
import Navbar from './mycomponents/navbar';
import RegisteraStudentBody from './mycomponents/registerastudentbody';
import { withRouter } from "react-router";

class RegisteraStudent extends Component {
    state = {  } ;
   
   
    render() { 
        const course = window.location.href.split('/')[4]
        return (
            <React.Fragment>
            <Navbar/>
            <RegisteraStudentBody course={course}/>
            </React.Fragment>
        );
    }
}
 
export default RegisteraStudent;