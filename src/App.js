import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { UserProvider } from "./provider/UserProvider.js";

import HomePage from "./component/User/Home/HomePage.js";
import Login from "./component/User/Login/Login.js";
import Register from "./component/User/Register/Register.js";
import ForgetPassword from "./component/User/MyProfile/ForgetPassword.js";
import TeacherDetail from "./component/User/Teacher/TeacherDetail.js";
import CourseDetail from "./component/User/Course/CourseDetail.js";
import EditProfile from "./component/User/MyProfile/EditProfile.js";
import ChangePassword from "./component/User/MyProfile/ChangePassword.js";
import RegisterTeacher from "./component/User/Teacher/RegisterTeacher.js";
import EditInfoTeacher from "./component/User/Teacher/EditInformation.js";
import DashboardUser from "./component/User/Dashboard/Dashboard.js";
import PaymentInformation from "./component/User/Teacher/PaymentInformation.js";
import Category from "./component/User/Category/Category.js";
import Search from "./component/User/Search/Search.js";
import Admin from "./component/Admin/Admin.js";

import NotFound from "./component/User/Others/NotFound";

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
          <Route path="/search/:title" element={<Search />} />
          <Route path="/searchCategory/:categoryId" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/category" element={<Category />} />
          <Route path="/teacher/detail" element={<TeacherDetail />} />
          {/* Trang học viên */}
          <Route
            path="/user"
            element={
              <ProtectedRoute element={<HomePage />} requiredRoleId="1" />
            }
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

          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute element={<DashboardUser />} requiredRoleId="1" />
            }
          />

          

          <Route
            path="/teacher/register"
            element={
              <ProtectedRoute
                element={<RegisterTeacher />}
                requiredRoleId="1"
              />
            }
          />
          <Route
            path="/teacher/edit-info"
            element={
              <ProtectedRoute
                element={<EditInfoTeacher />}
                requiredRoleId="1"
              />
            }
          />
          <Route
            path="/teacher/payment-info"
            element={
              <ProtectedRoute
                element={<PaymentInformation />}
                requiredRoleId="1"
              />
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
