import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TrangChu from './component/User/Home/Home.js';
import Login from './component/User/Login/Login.js';
import Register from './component/User/Register/Register.js';
import TeacherDetail from './component/User/Teacher/TeacherDetail.js'
import Course from './component/User/Course/Course.js'
import EditInfo from './component/User/MyProfile/EditProfile.js'
import ChangePassword from './component/User/MyProfile/ChangePassword.js'
import RegisterTeacher from './component/User/Teacher/RegisterTeacher.js'
import EditInfoTeacher from './component/User/Teacher/EditInformation.js'
import PaymentInformation from './component/User/Teacher/PaymentInformation'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<TrangChu />} />        
        <Route path="/login" element={<Login />} />   
        <Route path="/register" element={<Register />} />   
        <Route path="/user/edit-info" element={<EditInfo />} />   
        <Route path="/user/change-password" element={<ChangePassword />} />   
        <Route path="/user/course" element={<Course />} />   
        <Route path="/teacher/register" element={<RegisterTeacher />} />   
        <Route path="/teacher/edit-info" element={<EditInfoTeacher />} />   
        <Route path="/teacher/payment-info" element={<PaymentInformation />} />           
        <Route path="/teacher/detail" element={<TeacherDetail />} />           
      </Routes>
    </Router>
  </React.StrictMode>
);
