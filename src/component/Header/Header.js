import React from "react";
import logo from "../../image/logo.png";
import "../../css/headers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";


export default function Header() {

    
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

  const renderAuthButtons = () => {
    if (accessToken) {
      return (
        <React.Fragment>
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
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input
            type="search"
            className="form-control form-control-dark"
            placeholder="Search..."
            aria-label="Search"
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
