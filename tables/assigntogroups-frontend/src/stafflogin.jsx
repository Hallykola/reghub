import React, { Component } from 'react';
import StaffLoginBody from './mycomponents/staffloginbody';
import Navbar from './mycomponents/navbar';

class StaffLogin extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <StaffLoginBody/>
            </React.Fragment>
        );
    }
}
 
export default StaffLogin;