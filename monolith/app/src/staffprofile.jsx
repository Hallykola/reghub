import React, { Component } from 'react';
import StaffProfileBody from './mycomponents/staffprofilebody';
import Navbar from './mycomponents/navbar';

class StaffProfile extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <StaffProfileBody/>
            </React.Fragment>
        );
    }
}
 
export default StaffProfile;