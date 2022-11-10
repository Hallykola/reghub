import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewEditCourse from './vieweditcourse';
import CreateCourse from './createcourse';
import ListCourses from './listcourses';
import StudentRegister from './studentregister';
import StaffRegister from './staffregister';
import { getData } from './services/myauth';




const root = ReactDOM.createRoot(document.getElementById('root'));
const user = getData();

root.render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route index element={<Home/>} />
      <Route path="/courses" element={<ViewEditCourse  user = {user} />} />
      <Route path="/createcourse" element={<CreateCourse user = {user}/>} />
      <Route path="/listCourses" element={<ListCourses user = {user}/>} />
      <Route path="/studentregister" element={<StudentRegister user = {user} />} />
      <Route path="/staffregister" element={<StaffRegister user = {user} />} />
      


    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
