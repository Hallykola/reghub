import React, { Component } from 'react';
import Navbar from './mycomponents/navbar';
import ViewMyGroupListBody from './mycomponents/viewmygrouplistbody';

class ViewMyGroupList extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
            <Navbar/>
            <ViewMyGroupListBody />
                </React.Fragment>
        );
    }
}
 
export default ViewMyGroupList;