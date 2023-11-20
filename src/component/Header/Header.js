import React, { useState, useEffect } from "react";
import logo from "../../image/logo.png";
import "../../css/headers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

export default function Header() {
  const [userDetails, setUserDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const encodedId = localStorage.getItem("userId");
  const userId = atob(encodedId);

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

  const handleCartClick = (event) => {
    event.preventDefault();

    if (accessToken) {
      navigate("/cart");
    } else {
      alert("Bạn cần đăng nhập để xem giỏ hàng.");
      navigate("/login");
    }
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const getLastname = (fullName) => {
    const fullNameArray = fullName.split(" ");
    const lastName = fullNameArray[fullNameArray.length - 1];
    return lastName;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const renderAuthButtons = () => {
    if (accessToken) {
      return (
        <React.Fragment>
          {userDetails && userDetails.fullname && (
            <div
              className="btn-group position-relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className="btn btn-primary margin-button-header dropdown-toggle"
                style={{ backgroundColor: "#4CAF50", border: "none" }}
                data-bs-toggle="dropdown"
                aria-expanded={showDropdown}
              >
                Chào! {getLastname(userDetails.fullname)}
              </button>

              <div
                className={`dropdown-menu ${showDropdown ? "show" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ position: "absolute", top: "100%", left: 0 }}
              >
                <Link className="dropdown-item" to="/course1">
                  Khóa học của tôi
                </Link>
                <Link className="dropdown-item" to="/course2">
                  Cập nhật thông tin
                </Link>
                <Link className="dropdown-item" to="/user/change-password">
                  Đổi mật khẩu
                </Link>
              </div>
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
    <header className="d-flex justify-content-center py-3 bg-white" id="topbar">
      <div className="d-inline-block">
        <image className="navbar-brand mr-1">
          <img className="img-fluid logo" alt="logo" src={logo} />
        </image>
      </div>
      <div className="d-inline-block">
        <form
          className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
          onSubmit={(e) => handleSearchSubmit(e)}
        >
          <input
            type="search"
            className="form-control form-control-dark"
            placeholder="Search..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="d-inline-block" style={{ alignItems: "center" }}>
        <Link onClick={handleCartClick}>
          <FontAwesomeIcon
            icon={faShoppingCart}
            style={{ color: "#999", fontSize: "30px" }}
          ></FontAwesomeIcon>
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          <span className="unica-sl-cart" style={{ border: "none" }}></span>
        </Link>
      </div>

      {renderAuthButtons()}
    </header>
  );
}
