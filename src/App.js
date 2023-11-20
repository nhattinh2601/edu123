import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { UserProvider } from "./provider/UserProvider.js";

import HomePage from "./component/Home/HomePage";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import ForgetPassword from "./component/MyProfile/ForgetPassword";
import TeacherDetail from './component/Teacher/TeacherDetail.js'
import CourseDetail from "./component/Course/CourseDetail.js";
import EditProfile from './component/MyProfile/EditProfile.js'
import ChangePassword from "./component/MyProfile/ChangePassword.js";
import RegisterTeacher from './component/Teacher/RegisterTeacher.js'
import EditInfoTeacher from './component/Teacher/EditInformation.js'
import PaymentInformation from './component/Teacher/PaymentInformation.js'


import Admin from "./component/Admin/Admin.js";

import NotFound from "./component/Others/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";

const checkAccess = (requiredRoleId) => {
  const encodedRoleId = localStorage.getItem("roleId");
  const roleId = atob(encodedRoleId);

  return roleId === requiredRoleId || roleId === "2";
};

const ProtectedRoute = ({ element, path, requiredRoleId }) => {
  const hasAccess = checkAccess(requiredRoleId);

  return hasAccess ? element : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
    <UserProvider>
      <Routes>
        {/* Trang chung */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:title" element={<HomePage />} />
        <Route path="/searchCategory/:categoryId" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* Trang học viên */}
        <Route
          path="/user"
          element={<ProtectedRoute element={<HomePage />} requiredRoleId="1" />}
        />
        <Route
          path="/user/course"
          element={
            <ProtectedRoute element={<CourseDetail />} requiredRoleId="1" />
          }
        />
        <Route
          path="/user/edit-info"
          element={
            <ProtectedRoute element={<EditProfile />} requiredRoleId="1" />
          }
        />
        <Route
          path="/user/change-password"
          element={
            <ProtectedRoute element={<ChangePassword />} requiredRoleId="1" />
          }
        />

        {/* Trang giảng viên */}
        <Route
          path="/teacher/detail"
          element={
            <ProtectedRoute element={<TeacherDetail />} requiredRoleId="1" />
          }
        />
        
        <Route
          path="/teacher/register"
          element={<ProtectedRoute element={<RegisterTeacher/>} requiredRoleId="1" />}
        />
        <Route
          path="/teacher/edit-info"
          element={
            <ProtectedRoute element={<EditInfoTeacher />} requiredRoleId="1" />
          }
        />
        <Route
          path="/teacher/payment-info"
          element={
            <ProtectedRoute element={<PaymentInformation />} requiredRoleId="1" />
          }
        />

        {/* Trang admin */}
        <Route
          path="/admin"
          element={<ProtectedRoute element={<Admin />} requiredRoleId="2" />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
