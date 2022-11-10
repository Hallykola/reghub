import React, { Component } from 'react';
import Navbar from './mycomponents/navbar';
import StudentLoginBody from './mycomponents/studentloginbody';

class StudentLogin extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <StudentLoginBody />
                </React.Fragment>
        );
    }
}
 
export default StudentLogin;