import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./upgrade-to-teacher.css";

export default function UserInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [title, setTitle] = useState("");
  const [teachingSubject, setTeachingSubject] = useState("");
  const [teachingExperience, setTeachingExperience] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get(`/users/${id}`);
        setUserImage(response.data.avatar);
        setUser(response.data);
        console.log(response.data.roleId);
        if(response.data.roleId===2){
          const userData = response.data;

        const description = userData.description;

        const parts = description.split("**");

        const part1 = parts[0];
        const part2 = parts[1];
        const part3 = parts[2];

        setTitle(part1);
        setTeachingSubject(part2);
        setTeachingExperience(part3);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

 

  

  if (!user) {
    return (
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="manager-user-layout">
      <aside className="sidebar">
        <Header />
      </aside>
      <main className="manager-user-main-content col-md-8">
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-9 mx-auto">
              <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                {user.roleId != 2 ? (<div className="content-user">
                  <h2 className="card-title text-center mb-5  fw-bold ">
                    Thông tin người dùng{" "}
                  </h2>
                  <br />
                  <div
                    style={{
                      width: "250px"
                    }}
                  >
                    <img
                      src={userImage}
                      style={{
                        width: "100%", // Scale image to fit the container
                        height: "auto", // Keep the aspect ratio of the image
                      }}
                      alt="User Avatar"
                      className="card-img-top"
                    />
                  </div>
                    <label className="form-label fw-bold" htmlFor="email">
                      Email
                    </label>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        value={user.email || ""}
                        readOnly
                      />
                    </div>

                    <label className="form-label fw-bold" htmlFor="name">
                      Số điện thoại
                    </label>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Số điện thoại"
                        value={user.phone}
                        readOnly
                      />
                    </div>
                    <label className="form-label fw-bold" htmlFor="name">
                      Họ và tên
                    </label>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Họ và tên"
                        value={user.fullname}
                        readOnly
                      />
                    </div>
                    <label className="form-label fw-bold" htmlFor="name">
                      Ngày tạo tài khoản
                    </label>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Họ và tên"
                        value={new Date(user.createAt).toLocaleString('vi-VN')}
                        readOnly
                      />
                    </div>
                  </div>) : (<div className="content-teacher">
                  <h2 className="card-title text-center mb-5  fw-bold ">
                    Thông tin Giảng viên{" "}
                  </h2>
                  <div
                    style={{
                      width: "250px"
                    }}
                  >
                    <img
                      src={userImage}
                      style={{
                        width: "100%", // Scale image to fit the container
                        height: "auto", // Keep the aspect ratio of the image
                      }}
                      alt="User Avatar"
                      className="card-img-top"
                    />
                  </div>
                  <br />

                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold" htmlFor="name">
                      Chức danh
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Chủ đề muốn giảng dạy trên edu123"
                      value={title}
                      readOnly
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold" htmlFor="name">
                      Lĩnh vực giảng dạy
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Chủ đề muốn giảng dạy trên edu123"
                      value={teachingSubject}
                      readOnly
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold" htmlFor="name">
                      Kinh nghiệm giảng dạy
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Chủ đề muốn giảng dạy trên edu123"
                      value={teachingExperience}
                      readOnly
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold" htmlFor="name">
                      Số điện thoại{" "}
                    </label>
                    <input
                      style={{
                        width: "250px"
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Số điện thoại"
                      value={user.phone}
                      readOnly
                    />
                    <div className="uti-link d-inline-block text-decoration-underline">
                      <a
                        href={`https://zalo.me/${user.phone}`}
                        className="btn btn-light"
                        role="button"
                        aria-disabled="true"
                      >
                        Liên hệ qua zalo 
                      </a>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold" htmlFor="name">
                      Họ và tên{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Họ và tên"
                      value={user.fullname}
                      readOnly
                    />
                  </div>
                  </div>   )}
                  

                   

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
