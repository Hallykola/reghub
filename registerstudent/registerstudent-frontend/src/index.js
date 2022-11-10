import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffLogin from './stafflogin';
import StudentLogin from './studentlogin';
import StudentRegister from './studentregister';
import StaffRegister from './staffregister';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route index element={<Home/>} />
      <Route path="/stafflogin" element={<StaffLogin />} />
      <Route path="/studentlogin" element={<StudentLogin/>} />
      <Route path="/studentregister" element={<StudentRegister/>} />
      <Route path="/staffregister" element={<StaffRegister/>} />
      


    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
