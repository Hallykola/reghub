import React, { Component } from 'react';
import Navbar from './mycomponents/navbar';
import ManageGroupsBody from './mycomponents/managegroupsbody';

class ManageGroups extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
            <Navbar/>
            <ManageGroupsBody />
                </React.Fragment>
        );
    }
}
 
export default ManageGroups;