import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffLogin from './stafflogin';
import StudentLogin from './studentlogin';
import StudentRegister from './registerastudent';
import StaffRegister from './staffregister';

import StudentDash from './studentdash';
import StaffDash from './staffdash';
import { getData } from './services/myauth';

import ViewEditCourse from './vieweditcourse';
import CreateCourse from './createcourse';
import ListCourses from './listcourses';
import RegisteraStudent from './registerastudent';
import ManageGroups from './managegroups';
import ListCoursesforReg from './listcoursesforreg';
import StudentProfile from './studentprofile';
import StaffProfile from './staffprofile';
import ListGroups from './listgroups';
import ViewMyGroup from './viewmygroup';
import ViewMyGroupList from './viewmygrouplist';



const root = ReactDOM.createRoot(document.getElementById('root'));
const user = getData();
console.log('see me here',user);

root.render(
  // <React.StrictMode>
    
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route index element={<Home/>} />
      <Route path="/stafflogin" element={<StaffLogin />} />
      <Route path="/studentlogin" element={<StudentLogin/>} />

      <Route path="/staffprofile" element={<StaffProfile  user = {user} />} />
      <Route path="/studentprofile" element={<StudentProfile  user = {user} />} />

      <Route path="/studentregister" element={<StudentRegister/>} />
      <Route path="/staffregister" element={<StaffRegister/>} />
      <Route path="/studentdashboard" element={<StudentDash user = {user}/>} />
      <Route path="/staffdashboard" element={<StaffDash user = {user}/> } />
      <Route path="/courses" element={<ViewEditCourse  user = {user} />} />
      <Route path="/createcourse" element={<CreateCourse user = {user}/>} />
      <Route path="/listCourses" element={<ListCourses user = {user}/>} />
      
      <Route path="/listgroups" element={<ListGroups user = {user}/>} />

      <Route path="/registerstudent" element={<ListCoursesforReg user = {user}/>} />
      <Route path="/registerstudent/:course" element={<RegisteraStudent/>} />
      <Route path="/managegroups/:course/:group" element={<ManageGroups/>} />
      <Route path="/viewgroup/:course/:group/:groupno" element={<ViewMyGroup/>} />
      <Route path="/viewgroup" element={<ViewMyGroupList/>} />

    </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
