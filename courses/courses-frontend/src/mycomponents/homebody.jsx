import React, { Component } from 'react';

class HomeBody extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
            <section class="showcase mt-5 text-center">
    <h2 className="hed mt-5"> 
    <span className="chg text-success"> Efficient Platform.</span> 
    <span class="change text-warning">Crafted for you </span>
    </h2>
    <p className="par text-secondary fs-5">Register courses,  check groupings, view assigned experiments and network with fellow group members.
        <br/>Please <strong>choose</strong> your appropriate designation to proceed. 
    </p>
        </section>
    <section className="p-5">
        <div className="container">
            <div className="row text-center g-4">
                <div className="col-md">
                    <a href="/listcourses"> <img class="stud img-fluid w-50" src="images/student.png"/></a>
                </div>
                <div className="col-md">
                    <a href="/createcourse"><img class="staff img-fluid w-50" src="images/staff.png"/></a>
                </div>
                </div>
                </div>
                </section>
                </React.Fragment>
        );
    }
}
 
export default HomeBody;