import React, { Component } from 'react';
import Navbar from './mycomponents/navbar';
import StudentDashBody from './mycomponents/studentdashbody';

class StudentDash extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <StudentDashBody user = {this.props.user}/>
                </React.Fragment>
        );
    }
}
 
export default StudentDash;