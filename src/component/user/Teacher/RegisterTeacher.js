import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import axiosClient from "../../../api/axiosClient";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


export default function RegisterTeacher() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [teachingSubject, setTeachingSubject] = useState("");
  const [teachingExperience, setTeachingExperience] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const encodedId = localStorage.getItem("userId");
        const userId = atob(encodedId);

        const response = await axiosClient.get(`users/${userId}`);
        const userData = response.data;

        setName(userData.fullname);
        setPhone(userData.phone);
        setEmail(userData.email);
        setRole(userData.roleId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    

    fetchUserData();
  }, []);

  

  const fieldsToUpdate = {
    fullname: name,
    phone: phone,
    description: `${title}**${teachingSubject}**${teachingExperience}`,
    roleId: 4,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (role === 4) {
      setError("Bạn đã gửi thông tin đăng ký giảng viên. Vui lòng không gửi lại.");
      setShowAlert(true);
      return;
    }

    

    if (
      !name ||
      !email ||
      !phone ||
      !title ||
      !teachingSubject ||
      !teachingExperience
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
      setShowAlert(true);
      return;
    }
    const namePattern = /^[^\s].*$/;

    if (!name.match(namePattern)) {
      setError("Tên không được bắt đầu bằng dấu cách.");
      setShowAlert(true);
      return;
    }

    // Kiểm tra số điện thoại từ 9 đến 11 số và không có kí tự nào ngoài số
    const phonePattern = /^[0-9]{9,11}$/;

    if (!phone.match(phonePattern)) {
      setError("Số điện thoại phải từ 9 đến 11 số và chỉ chứa kí tự số.");
      setShowAlert(true);
      return;
    }
    const isConfirmed = window.confirm("Bạn có chắc muốn đăng ký giảng viên không? Kiểm tra lại các thông tin trước khi đăng kí và đảm bảo thông tin thật!");
  
    if (!isConfirmed) {
      // If not confirmed, do nothing
      return;
    }

    try {
      const encodedId = localStorage.getItem("userId");
      const userId = atob(encodedId);

      const response = await axiosClient.patch(
        `/users/${userId}`,
        fieldsToUpdate
      );
      console.log("User updated:", response.data);
      setShowAlert(false);
setSuccessMessage(
        "Bạn đã gửi thông tin đăng ký giảng viên thành công. Vui lòng chờ Admin xác nhận."
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-9 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h2 className="card-title text-center mb-5 fw-bold">
                  Đăng Ký Giảng Viên
                </h2>
                <form onSubmit={handleSubmit}>
                  {showAlert && (
                    <Alert
                      variant="danger"
                      onClose={() => setShowAlert(false)}
                      dismissible
                    >
                      {error}
                    </Alert>
                  )}
                  {successMessage && (
                    <Alert
                      variant="success"
                      onClose={() => setSuccessMessage("")}
                      dismissible
                    >
                      {successMessage}
                    </Alert>
                  )}

                  <div className="form-group mb-4 d-flex">
                    <div className="form-subgroup mr-3 flex-2">
                      <label className="form-label fw-bold" htmlFor="name">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Họ và tên"
                        className="form-control"
                      />
                    </div>

                    <div className="form-subgroup flex-2">
                      <label className="form-label fw-bold" htmlFor="email">
                        Email *
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        aria-label="readonly input example"
                        readOnly
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold" htmlFor="name">
                      Số điện thoại *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Số điện thoại"
name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold" htmlFor="name">
                      Chức danh *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Chức danh"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold" htmlFor="name">
                      Chủ đề muốn giảng dạy *
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Chủ đề muốn giảng dạy trên edu123"
                      name="teachingSubject"
                      value={teachingSubject}
                      onChange={(e) => setTeachingSubject(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold" htmlFor="name">
                      Kinh nghiệp giảng dạy *
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Kinh nghiệp giảng dạy"
                      name="teachingExperience"
                      value={teachingExperience}
                      onChange={(e) => setTeachingExperience(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4 w-100"
                  >
                    Đăng ký ngay
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}