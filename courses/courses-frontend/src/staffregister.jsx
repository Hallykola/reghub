import React, { Component } from 'react';
import Navbar from './mycomponents/navbar';
import StaffRegisterBody from './mycomponents/staffregisterbody';

class StaffRegister extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
            <Navbar/>
            <StaffRegisterBody user = {this.props.user} />
                </React.Fragment>
        );
    }
}
 
export default StaffRegister;