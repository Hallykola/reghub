import React, { Component } from 'react';
import Navbar from './mycomponents/navbar';
import ListCoursesforRegBody from './mycomponents/listcoursesforregbody';

class ListCoursesforReg extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <ListCoursesforRegBody user = {this.props.user} />
                </React.Fragment>
        );
    }
}
 
export default ListCoursesforReg;