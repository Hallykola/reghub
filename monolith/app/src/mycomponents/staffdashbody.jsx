import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

class StaffDashBody extends Component {
    state = {  } 
    
    
    render() { 
      
        return (
            <React.Fragment>
             <div>
      </div>
                <section class="showcase mt-5">
    <section class="p-3">
        <div class="container">
            <p class="per text-secondary fs-3 mb-5">Hello, <strong>{this.props.user.name}</strong></p>
            <div class="row text-center g-4">
                <div class="col-md">
                    <a href='/registerstudent'> <img class="stud img-fluid w-75" src="images/reg a student.png" /></a>
                </div>
                <div class="col-md">
                    <a href='listCourses'><img class="staff img-fluid w-75" src="images/create a course.png"/></a>
                </div>
                <div class="col-md">
                    <a href='managegroups'><img class="staff img-fluid w-75" src="images/Assign to Group.png"/></a> 
                </div>
                <div class="col-md">
                    <a href='/notice'><img class="staff img-fluid w-75" src="images/create a notice.png"/></a>
                </div>
                </div>
            </div>
        </section>
            </section>
              
            </React.Fragment>
        );
    }
}
 
export default StaffDashBody;