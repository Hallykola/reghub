import React, { Component } from 'react';
import StaffDashBody from './mycomponents/staffdashbody';
import Navbar from './mycomponents/navbar';

class StaffDash extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <StaffDashBody user = {this.props.user}/>
            </React.Fragment>
        );
    }
}
 
export default StaffDash;