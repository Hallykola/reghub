import React, { Component } from 'react';
import Navbar from './mycomponents/navbar';
import ViewMyGroupBody from './mycomponents/viewmygroupbody';

class ViewMyGroup extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
            <Navbar/>
            <ViewMyGroupBody />
                </React.Fragment>
        );
    }
}
 
export default ViewMyGroup;