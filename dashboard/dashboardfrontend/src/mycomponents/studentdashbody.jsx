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
                    <a href={process.env.REACT_APP_URL_PROFILE}> <img class="stud img-fluid w-75" src="images/student profile.png"/></a>
                </div>
                <div class="col-md">
                    <a href={process.env.REACT_APP_URL_GROUP}><img class="staff img-fluid w-75" src="images/view groups.png"/></a>
                </div>
                <div class="col-md">
                    <a href={process.env.REACT_APP_URL_PALMEEUP}><img class="staff img-fluid w-75" src="images/connect w goup.png"/></a>
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