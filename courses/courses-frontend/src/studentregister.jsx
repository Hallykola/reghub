import React, {Component } from 'react';
import Navbar from './mycomponents/navbar';
import StudentRegisterBody from './mycomponents/studentregisterbody';

class StudentRegister extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
            <Navbar/>
            <StudentRegisterBody user = {this.props.user}/>
            </React.Fragment>
        );
    }
}
 
export default StudentRegister;