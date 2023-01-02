import React, { Component } from 'react';
import StudentProfileBody from './mycomponents/studentprofilebody';
import Navbar from './mycomponents/navbar';

class StudentProfile extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <StudentProfileBody/>
            </React.Fragment>
        );
    }
}
 
export default StudentProfile;