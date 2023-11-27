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
import Cart from './component/User/Cart/Cart.js';
import Order from './component/User/Order/Order.js';
import Admin from "./component/Admin/Admin.js";
import DashboardTeacher from "./component/User/DashboardTeacher/Dashboard.js";
import NewCourseProcess from "./component/User/NewCourse/NewCourseProcess.js";
import NewCourse from "./component/User/NewCourse/NewCourse.js";
import NotFound from "./component/User/Others/NotFound";
import ThankYouPage from "./component/User/Order/ThankYouPage .js";
import ActivateCoursePage from "./component/User/Course/ActivateCoursePage.js"
import HistoryOrder from "./component/User/Dashboard/History.js"
import Lession from "./component/User/Dashboard/Lession.js";
import NewVideo from "./component/User/Video/NewVideo.js";
import EditVideo from "./component/User/Video/EditVideo.js";
import UploadDocument from "./component/User/Document/UploadDocument.js";
import EditCourse from "./component/User/Course/EditCourse.js";
import EditDocument from "./component/User/Document/EditDocument.js";
import EditDocumentDetail from "./component/User/Document/EditDocumentDetail.js";
import EditPrice from "./component/User/Price/EditPrice.js";
import EditLession from "./component/User/Course/EditLession.js";
import WatchVideo from "./component/User/Video/WatchVideo.js";
import UpgradeToTeacher from "./component/Admin/User/UpgradeToTeacher.js";
import ToTeacherDetail from "./component/Admin/User/ToTeacherDetail.js";
import NotificationReject from "./component/Admin/User/NotificationReject.js";
import PublicCourse from "./component/Admin/Course/PublicCourse.js";
import CourseInfo from "./component/Admin/Course/CourseInfo.js";
import PublicLession from "./component/Admin/Course/PublicLession.js";
import PublicLessionDetail from "./component/Admin/Course/PublicLessionDetail.js";
import PublicDocument from "./component/Admin/Course/PublicDocument.js";
import PublicDocumentDetail from "./component/Admin/Course/PublicDocumentDetail.js";
import Summary from "./component/Admin/Course/Summary.js";
import NotificationRejectCourse from "./component/Admin/Course/NotificationReject.js";
import PaymentConfirm from "./component/Admin/PaymentConfirm/PaymentConfirm.js";

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
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/user/order" element={<Order />} />
          <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
          <Route path="/teacher/course/new-course-process" element={<NewCourseProcess />} />
          <Route path="/teacher/course/new-course" element={<NewCourse />} />
          <Route path="/user/order/thankyou" element={<ThankYouPage />} />
          <Route path="/user/course/activate" element={<ActivateCoursePage />} />
          <Route path="/user/order/history" element={<HistoryOrder />} />
          <Route path="/teacher/course/upload-lession" element={<Lession />} />
          <Route path="/teacher/course/new-video" element={<NewVideo />} />
          <Route path="/teacher/course/edit-video" element={<EditVideo />} />
          <Route path="/teacher/course/upload-document" element={<UploadDocument />} />
          <Route path="/teacher/course/edit-course" element={<EditCourse />} />
          <Route path="/teacher/course/edit-document" element={<EditDocument />} />
          <Route path="/teacher/course/edit-document-detail" element={<EditDocumentDetail />} />
          <Route path="/teacher/course/edit-price" element={<EditPrice />} />
          <Route path="/teacher/course/edit-lession" element={<EditLession />} />
          <Route path="/user/course/watch-video" element={<WatchVideo />} />
          <Route path="/admin/upgrade-to-teacher" element={<UpgradeToTeacher />} />
          <Route path="/admin/upgrade-to-teacher/detail/:id" element={<ToTeacherDetail />} />
          <Route path="/admin/upgrade-to-teacher/detail/reject" element={<NotificationReject />} />
          <Route path="/admin/public-course" element={<PublicCourse />} />          
          <Route path="/admin/public-course/course-info" element={<CourseInfo />} />
          <Route path="/admin/public-course/lession" element={<PublicLession />} />
          <Route path="/admin/public-course/lession/detail" element={<PublicLessionDetail />} />
          <Route path="/admin/public-course/document" element={<PublicDocument />} />
          <Route path="/admin/public-course/document/detail" element={<PublicDocumentDetail />} />
          <Route path="/admin/public-course/summary" element={<Summary />} />
          <Route path="/admin/public-course/reject" element={<NotificationRejectCourse />} />
          <Route path="/admin/payment-confirm" element={<PaymentConfirm />} />
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
