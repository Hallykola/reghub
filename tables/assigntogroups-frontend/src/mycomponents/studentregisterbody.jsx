import React, { Component } from 'react';

class StudentRegisterBody extends Component {
    state = {  } 
    render() { 
        return (
            <section class="showcase mt-5">
    <section class="p-5">
      <div class="container shadow-lg p-3 rounded bg-white px-5">
            <p class="pere text-secondary fs-3 text-warning mb-5 fw-bold">GROUP A TABLES</p>
            <form class="row g-3 text-secondary">
                <div class="col-md-6">
                  <label for="inputname" class="form-label">Name</label>
                  <input type="name" class="form-control" id="inputname"/>
                </div>
                <div class="col-md-6">
                  <label for="inputmatricno" class="form-label">Matriculation number</label>
                  <input type="text" class="form-control" id="inputmatricno"/>
                </div>
                <div class="col-md-6">
                  <label for="inputemail" class="form-label">Email Address</label>
                  <input type="text" class="form-control" id="inputemail"/>
                </div>
                <div class="col-md-6">
                  <label for="inputphonenumber" class="form-label">Phone number</label>
                  <input type="text" class="form-control" id="Phonenumber"/>
                </div>
                <div class="col-md-6">
                  <label for="inputdepartment" class="form-label">Department</label>
                  <input type="text" class="form-control" id="inputdepartment"/>
                </div>
                <div class="col-md-6">
                  <label for="inputlevel" class="form-label">Level</label>
                  <select id="inputlevel" class="form-select">
                    <option>100 Level</option>
                    <option>200 Level</option>
                    <option>300 Level</option>
                    <option>400 Level</option>
                    <option>500 Level</option>
                    <option>Diploma</option>
                    <option>MSc</option>
                    <option> Others</option>
                    <option selected> Choose level</option>
                  </select>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Password</label>
                    <input type="password" class="form-control" id="inputPassword4"/>
                  </div>
                  <div class="col-md-6">
                    <label for="inputPassword4" class="form-label"> Confirm Password</label>
                    <input type="password" class="form-control" id="inputPassword4"/>
                  </div>
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck"/>
                    <label class="form-check-label" for="gridCheck">
                      I agree that the information provided above is true.
                    </label>
                  </div>
                </div>
                <div class="col-12">
                <a href="Studentdashboard.html"><button type="submit" class="btn btn-info btn-lg text-white">Register Me</button></a>
                </div>
              </form>
              </div>
            </section>
            </section>
        );
    }
}
 
export default StudentRegisterBody;