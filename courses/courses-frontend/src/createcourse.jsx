import React, { Component } from 'react';
import CreateCourseBody from './mycomponents/createcoursebody';
import Navbar from './mycomponents/navbar';

class CreateCourse extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <CreateCourseBody user = {this.props.user} />
            </React.Fragment>
        );
    }
}
 
export default CreateCourse;