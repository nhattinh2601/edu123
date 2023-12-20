import React, { useState, useEffect } from "react";
import logo from "../../../assets/images/logo.png";
import shoppingCart from "../../../assets/images/shopping-cart-icon.png";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import "./Header.css"

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
    <aside className="sidebar">
    <div className="sidebar-logo">
      <a href="/">
      <img className="img-fluid" alt="logo" src={logo} />
      </a>
    </div>
    <div className="sidebar-links">
    <a href="/admin" className="link-item">
        Dashboard
      </a>
      <a href="/admin/upgrade-to-teacher" className="link-item">
        Phê duyệt giảng viên
      </a>
      <a href="/admin/payment-confirm" className="link-item">
        Xác nhận thanh toán
      </a>
      <a href="/admin/manager-user" className="link-item">
        Quản lý người dùng
      </a>
      <a href="/admin/manager-course" className="link-item">
        Quản lý khóa học
      </a>
      <a href="/admin/analytics-aday" className="link-item">
          1 ngày
      </a>
    </div>
    <div className="sidebar-auth">
      {renderAuthButtons()}
    </div>
  </aside>
  );
}