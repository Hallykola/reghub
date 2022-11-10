import React, { Component } from 'react';


class StudentLoginBody extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <section className="showcase mt-5">
    <section className="p-3">
        <div className="container shadow-lg rounded bg-white px-5">
            <p className="pere text-secondary fs-3 fw-bold text-warning pt-4 px-2">Student Login</p>
            <form className="row g-3 text-secondary">
                <div className="col-md-4 p-3">
                  <label for="inputname" className="form-label fw-bold">Name</label>
                  <input type="text" className="form-control mb-4" id="inputname"/>
                  <label for="inputmatricno" className="form-label fw-bold">Password</label>
                  <input type="password" className="form-control mb-3" id="inputmatricno"/>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck"/>
                    <label className="form-check-label mb-3" for="gridCheck">
                      Remember Me
                    </label>
                  </div>
                  <a className="pass text-info text-decoration-none mb-5" href="">Forgot Password?</a>
                  <div>
                  <a className="pass text-info text-decoration-none mb-3" href="/studentregister">Register</a>
                  </div>
                  <div className="course mt-5">
                      <a href="C:\Users\Owner\Desktop\coding\Registration\Studentdashboard.html"><button type="submit" className="btn btn-info btn-lg px-5 text-white fw-bold">Login</button></a>
                  </div>
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-6 p-2">
                <img className="recruit img-fluid w-75 d-none d-sm-block" src="images/casual-life-3d-24.png"/>
                </div>
              </form>
              </div>
              </section>
              </section>
                </React.Fragment>
        );
    }
}
 
export default StudentLoginBody;