import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/style.css";
import "../../css/headers.css";
import { toast } from "react-toastify";

import UserAPI from "../../api/UserAPI";

function App() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  const [registerError, setRegisterError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState({
    passwordWeak: true,
    rePasswordWrong: true,
  });

  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  useEffect(() => {
    const message = localStorage.getItem("message");
    if (message)
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    localStorage.removeItem("message");
  }, []);

  useEffect(() => {
    checkPassword();
  }, [formValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (name === "email") {
      const emailRegex = /@/;
      setError((prevState) => ({
        ...prevState,
        invalidEmailFormat: !emailRegex.test(value),
      }));
    }

    if (name === "phone") {
      const phoneRegex = /^[0-9]{10,11}$/;
      setError((prevState) => ({
        ...prevState,
        invalidPhoneFormat: !phoneRegex.test(value),
      }));
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const checkPassword = () => {
    if (formValues.password.length <= 5)
      setError((prevState) => ({ ...prevState, passwordWeak: true }));
    else setError((prevState) => ({ ...prevState, passwordWeak: false }));

    if (formValues.rePassword !== formValues.password)
      setError((prevState) => ({ ...prevState, rePasswordWrong: true }));
    else setError((prevState) => ({ ...prevState, rePasswordWrong: false }));
  };

  const handleRegister = async () => {
    if (!formValues.email) {
      toast.error("Email cannot be empty", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const params = {
        fullname: formValues.fullname,
        email: formValues.email,
        password: formValues.password,
        phone: formValues.phone,
      };
      const response = await toast.promise(UserAPI.register(params), {
        pending: "Đang đăng ký...",
        success: "Đăng ký thành công!",
        error: "Đăng ký thất bại.",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formValues.email);
        const encodedPassword = btoa(formValues.password);
        localStorage.setItem("rememberedPassword", encodedPassword);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
      navigate("/login");
    } catch (error) {
      console.error(error);
      setRegisterError("Email đã tồn tại");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-10 fw-bold text-decoration-underline">
                Đăng ký
              </h5>
              <div>
                <label className="form-label" htmlFor="fullName">
                  <span style={{ color: "red" }}>* Bắt buộc điền</span>
                </label>
              </div>
              <form>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="fullName">
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullName"
                    autoComplete="on"
                    className="form-control"
                    value={formValues.fullname}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="fullName">
                    Họ và tên
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="fullName">
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="on"
                      className="form-control"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                  </div>
                  {error.invalidEmailFormat && formValues.email.length > 0 && (
                    <div
                      style={{ backgroundColor: "yellow", marginTop: "5px" }}
                    >
                      Không đúng định dạng gmail
                    </div>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="fullName">
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="on"
                      className="form-control"
                      value={formValues.phone}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="phone">
                      Số điện thoại
                    </label>
                  </div>
                  {error.invalidPhoneFormat && formValues.phone.length > 0 && (
                    <div
                      style={{ backgroundColor: "yellow", marginTop: "5px" }}
                    >
                      Số điện thoại có 10 hoặc 11 số không có ký tự khác
                    </div>
                  )}
                </div>
                <label className="form-label" htmlFor="fullName">
                  <span style={{ color: "red" }}>*</span>
                </label>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="on"
                    className="form-control"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="password">
                    Mật khẩu
                  </label>
                  <div>
                    {error.passwordWeak && formValues.password.length > 0 && (
                      <span style={{ backgroundColor: "yellow" }}>
                        Mật khẩu ít nhất 6 kí tự
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  {error.rePasswordWrong &&
                    formValues.rePassword.length > 0 && (
                      <span style={{ backgroundColor: "yellow" }}>
                        {" "}
                        Mật khẩu nhập lại không trùng khớp
                      </span>
                    )}
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    autoComplete="on"
                    className="form-control"
                    value={formValues.rePassword}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="rePassword">
                    Nhập lại mật khẩu
                  </label>
                </div>

                <div className="row mb-4">
                  <div className="col d-flex justify-content-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="form2Example31"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example31"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
                {registerError && (
                  <span
                    style={{
                      backgroundColor: "red",
                      display: "block",
                      marginTop: "5px",
                    }}
                  >
                    {registerError}
                  </span>
                )}

                <button
                  type="button"
                  className="btn btn-primary btn-block mb-4 w-100"
                  onClick={handleRegister}
                  disabled={
                    error.invalidEmailFormat ||
                    error.invalidPhoneFormat ||
                    error.passwordWeak ||
                    error.rePasswordWrong ||
                    !formValues.email ||
                    !formValues.fullname ||
                    !formValues.phone ||
                    !formValues.password ||
                    !formValues.rePassword
                  }
                >
                  Đăng ký
                </button>

                <div className="text-center mt-5">
                  <p className="light-gray">
                    Already have an Account? <Link to="/login">Đăng nhập</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
