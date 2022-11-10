import React, { Component } from 'react';
import ViewEditCourseBody from './mycomponents/vieweditcoursebody';
import Navbar from './mycomponents/navbar';

class ViewEditCourse extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <ViewEditCourseBody user = {this.props.user}/>
            </React.Fragment>
        );
    }
}
 
export default ViewEditCourse;