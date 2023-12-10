import React, { useState, useEffect } from "react";
import logo from "../../../assets/images/logo.png";
import shoppingCart from "../../../assets/images/shopping-cart-icon.png";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";

export default function Header() {
  const [userDetails, setUserDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const encodedId = localStorage.getItem("userId");
  const userId = atob(encodedId);
  const encodedRoleId = localStorage.getItem("roleId");
  const roleId = atob(encodedRoleId);

  useEffect(() => {
    if (userId) {
      axiosClient
        .get(`/users/${userId}`)
        .then((response) => {
          console.log("User details response:", response.data);
          setUserDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    console.log("userDetails:", userDetails);
  }, [userDetails]);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const accessToken = localStorage.getItem("accessToken");

  const getLastname = (fullName) => {
    const fullNameArray = fullName.split(" ");
    const lastName = fullNameArray[fullNameArray.length - 1];
    return lastName;
  };

  const renderAuthButtons = () => {
    if (accessToken) {
      return (
        <React.Fragment>
          {userDetails && userDetails.fullname && (
            <div className="btn-group position-relative">
              <button
                type="button"
                className="btn btn-primary margin-button-header dropdown-toggle"
                style={{ backgroundColor: "#4CAF50", border: "none" }}
                data-bs-toggle="dropdown"
              >
                Chào! {getLastname(userDetails.fullname)}
              </button>
            </div>
          )}
          <button
            className="btn btn-primary margin-button-header"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <button
            className="btn btn-primary margin-button-header"
            onClick={() => handleNavigate("/login")}
          >
            Đăng nhập
          </button>
          <button
            className="btn btn-primary margin-button-header"
            onClick={() => handleNavigate("/register")}
          >
            Đăng ký
          </button>
        </React.Fragment>
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("roleId");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <header className="d-flex justify-content-center bg-white" id="topbar">
      <h5>Trang quản trị viên</h5>
      <div className="d-inline-block">
        <Link to="/" style={{ display: "inline-block" }}>
          <img
            className="img-fluid logo"
            alt="logo"
            src={logo}
            style={{ display: "block" }}
          />
        </Link>
      </div>
      <div className="w-75 d-flex justify-content-between">
        <div className="card card-sm" style={{ zIndex: "3" }}>
          <div className="card-body p-0">
            <div className="d-flex justify-content-between p-0">
              <Link
                to='/admin/upgrade-to-teacher'
                style={{ color: "black", textDecoration: "none", marginRight: "10px", cursor: "default" }}
                className="p-3"
              >
                Phê duyệt cho người dùng thành giảng viên
              </Link>
              <Link
                to='/admin/payment-confirm'
                style={{ color: "black", textDecoration: "none", marginRight: "10px", cursor: "default" }}
                className="p-3"
              >
                Xác nhận thanh toán người dùng
              </Link>
              <Link
                to='/admin/manager-user'
                style={{ color: "black", textDecoration: "none", marginRight: "10px", cursor: "default" }}
                className="p-3"
              >
                Quản lý người dùng              </Link>              
            <Link
                to='/admin/manager-course'
                style={{ color: "black", textDecoration: "none", marginRight: "10px", cursor: "default" }}
                className="p-3"
              >
                Quản lý khóa học              </Link>              
            </div>
          </div>
        </div>
      </div>
      {renderAuthButtons()}
    </header>
  );
}