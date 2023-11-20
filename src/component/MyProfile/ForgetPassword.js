import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../../thunks/authThunk";

function ForgetPassWord() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetPasswordStatus = useSelector(
    (state) => state.auth.resetPasswordStatus
  );
  const resetPasswordError = useSelector(
    (state) => state.auth.resetPasswordError
  );

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    rePassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      alert("Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
      return;
    }

    if (formData.newPassword.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 kí tự.");
      return;
    }

    if (formData.newPassword !== formData.rePassword) {
      alert("Xác nhận mật khẩu không khớp. Vui lòng nhập lại.");
      return;
    }

    dispatch(forgetPassword(formData)).then((success) => {
      if (success) {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        navigate("/login");
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-10 fw-bold text-decoration-underline">
                Đổi mật khẩu
              </h5>
              <div>
                <label className="form-label" htmlFor="fullName">
                  <span style={{ color: "red" }}>* Bắt buộc điền</span>
                </label>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <div>
                    <label className="form-label" htmlFor="fullName">
                      <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <label className="form-label fw-bold" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <div>
                    <label className="form-label" htmlFor="fullName">
                      <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <label className="form-label fw-bold" htmlFor="newPassword">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <div>
                    <label className="form-label" htmlFor="fullName">
                      <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <label className="form-label fw-bold" htmlFor="rePassword">
                    Nhập lại mật khẩu mới
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="rePassword"
                    id="rePassword"
                    value={formData.rePassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {resetPasswordError && (
                  <div className="alert alert-danger" role="alert">
                    {resetPasswordError}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4 w-50"
                  disabled={resetPasswordStatus === "loading"}
                >
                  {resetPasswordStatus === "loading"
                    ? "Đang xử lý..."
                    : "Lấy lại mật khẩu"}
                </button>

                <Link
                  to="/login"
                  className="btn btn-primary btn-block mb-4 w-50"
                >
                  Đăng nhập
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassWord;
