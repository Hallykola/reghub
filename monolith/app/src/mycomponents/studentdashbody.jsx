import React, { Component } from 'react';

class StudentDashBody extends Component {
    state = { name:"" } ;
   
    render() { 
      
        return (
            <React.Fragment>
               <section class="showcase mt-5">
    <section class="p-5">
        <p class="per text-secondary fs-3 mx-4 mb-5">Hello, <strong>{this.props.user.name}</strong></p>
        <div class="container">
            <div class="row text-center g-4">
                <div class="col-md">
                    <a href='/studentprofile'> <img class="stud img-fluid w-75" src="images/student profile.png"/></a>
                </div>
                <div class="col-md">
                    <a href='/registerstudent'> <img class="stud img-fluid w-75" src="images/reg a student.png" /></a>
                </div>
                <div class="col-md">
                    <a href='/viewgroup'><img class="staff img-fluid w-75" src="images/view groups.png"/></a>
                </div>
                <div class="col-md">
                    <a href='/seepalmeeup'><img class="staff img-fluid w-75" src="images/connect w goup.png"/></a>
                </div>
            </div>
        </div>
        </section>
            </section>
                </React.Fragment>
        );
    }
}
 
export default StudentDashBody;