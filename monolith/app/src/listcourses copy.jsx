import React, { Component } from 'react';
import Navbar from './mycomponents/navbar';
import ListCoursesBody from './mycomponents/listcoursesbody';

class ListCourses extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <ListCoursesBody user = {this.props.user} />
                </React.Fragment>
        );
    }
}
 
export default ListCourses;