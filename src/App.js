import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { UserProvider } from "./provider/UserProvider.js";

import HomePage from "./component/User/Home/HomePage.js";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register.js";
import ForgetPassword from "./component/User/MyProfile/ForgetPassword";
import TeacherDetail from "./component/User/Teacher/TeacherDetail.js";
import CourseDetail from "./component/User/Course/CourseDetail.js";
import EditProfile from "./component/User/MyProfile/EditProfile.js";
import ChangePassword from "./component/User/MyProfile/ChangePassword.js";
import RegisterTeacher from "./component/User/Teacher/RegisterTeacher.js";
import EditInfoTeacher from "./component/User/Teacher/EditInformation.js";
import PaymentInformation from "./component/User/Teacher/PaymentInformation.js";
import Cart from "./component/User/Cart/Cart.js";
import Search from "./component/User/Search/Search.js";
import Category from "./component/User/Category/Category.js";
import Order from "./component/User/Order/Order.js";
import DashboardTeacher from "./component/User/DashboardTeacher/Dashboard.js";
import NewCourseProcess from "./component/User/NewCourse/NewCourseProcess.js";
import NewCourse from "./component/User/NewCourse/NewCourse.js";
import Dashboard from "./component/User/Dashboard/Dashboard.js";

import ThankYouPage from "./component/User/Order/ThankYouPage.js";
import ActivateCoursePage from "./component/User/Course/ActivateCoursePage.js";
import HistoryOrder from "./component/User/Dashboard/History.js";
import NewVideo from "./component/User/Video/NewVideo.js";
import EditVideo from "./component/User/Video/EditVideo.js";
import UploadDocument from "./component/User/Document/UploadDocument.js";
import EditCourse from "./component/User/Course/EditCourse.js";
import EditDocument from "./component/User/Document/EditDocument.js";
import EditDocumentDetail from "./component/User/Document/EditDocumentDetail.js";

import EditLession from "./component/User/Document/EditLession.js";

import Admin from "./component/Admin/Admin.js";

import NotFound from "./component/Others/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";

const checkAccess = (requiredRoleId) => {
  const encodedRoleId = localStorage.getItem("roleId");
  const roleId = atob(encodedRoleId);

  if (requiredRoleId === "1" && roleId === "2") {
    return true;
  }

  return roleId === requiredRoleId || roleId === "3";
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
          <Route path="/user/dashboard" element={<Dashboard />} />

          <Route path="/user/order/thankyou" element={<ThankYouPage />} />
          <Route
            path="/user/course/activate"
            element={<ActivateCoursePage />}
          />
          <Route path="/user/order/history" element={<HistoryOrder />} />

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
            path="/user/infor-teacher"
            element={
              <ProtectedRoute element={<TeacherDetail />} requiredRoleId="1" />
            }
          />

          <Route
            path="/user/cart"
            element={<ProtectedRoute element={<Cart />} requiredRoleId="1" />}
          />

          <Route
            path="/user/order"
            element={<ProtectedRoute element={<Order />} requiredRoleId="1" />}
          />

          <Route
            path="/user/register-teacher"
            element={
              <ProtectedRoute
                element={<RegisterTeacher />}
                requiredRoleId="1"
              />
            }
          />
          {/* Trang giảng viên */}

          <Route
            path="/teacher/infor-teacher"
            element={
              <ProtectedRoute element={<TeacherDetail />} requiredRoleId="2" />
            }
          />

          <Route
            path="/teacher/edit-info"
            element={
              <ProtectedRoute
                element={<EditInfoTeacher />}
                requiredRoleId="2"
              />
            }
          />
          <Route
            path="/teacher/payment-info"
            element={
              <ProtectedRoute
                element={<PaymentInformation />}
                requiredRoleId="2"
              />
            }
          />

          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute
                element={<DashboardTeacher />}
                requiredRoleId="2"
              />
            }
          />

          <Route
            path="/teacher/course/edit-course"
            element={
              <ProtectedRoute element={<EditCourse />} requiredRoleId="2" />
            }
          />
          <Route
            path="/teacher/course/new-course-process"
            element={
              <ProtectedRoute
                element={<NewCourseProcess />}
                requiredRoleId="2"
              />
            }
          />
          <Route
            path="/teacher/course/new-course"
            element={
              <ProtectedRoute element={<NewCourse />} requiredRoleId="2" />
            }
          />

          <Route path="/teacher/course/new-video" element={
              <ProtectedRoute element={<NewVideo />} requiredRoleId="2" />
            }
          />
          <Route path="/teacher/course/edit-video" element={
              <ProtectedRoute element={<EditVideo />} requiredRoleId="2" />
            }
          />
          <Route
            path="/teacher/course/upload-document"
            element={
              <ProtectedRoute element={<UploadDocument />} requiredRoleId="2" />
            }
          />

          <Route
            path="/teacher/course/edit-document"
            element={
              <ProtectedRoute element={<EditDocument />} requiredRoleId="2" />
            }
          />
          <Route
            path="/teacher/course/edit-document-detail"
            element={
              <ProtectedRoute element={<EditDocumentDetail />} requiredRoleId="2" />
            }
          />

          <Route
            path="/teacher/course/edit-lession"
            element={<EditLession />}
          />

          {/* Trang admin */}
          <Route
            path="/admin"
            element={<ProtectedRoute element={<Admin />} requiredRoleId="3" />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
