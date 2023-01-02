import React, { Component } from 'react';
import Navbar from './mycomponents/navbar';
import ListGroupsBody from './mycomponents/listgroupsbody';

class ListGroups extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <ListGroupsBody user = {this.props.user} />
                </React.Fragment>
        );
    }
}
 
export default ListGroups;