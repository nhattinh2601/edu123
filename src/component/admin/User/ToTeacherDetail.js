import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";

export default function ToTeacherDetail() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>; // or some loading spinner
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-9 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h2 className="card-title text-center mb-5  fw-bold ">
                  Thông tin người dùng{" "}
                </h2>
                <form action="/login" method="POST">
                  {/* <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Chức danh"
                      value={user.title}
                      readOnly
                    />
                  </div> */}

                  <div className="form-outline mb-4">
                    <textarea
                      className="form-control"
                      placeholder="Chủ đề muốn giảng dạy trên edu123"
                      value={user.description}
                      readOnly
                    />
                  </div>

                  {/* <div className="form-outline mb-4">
                    <textarea
                      className="form-control"
                      placeholder="Kinh nghiệp giảng dạy"
                      value={user.experience}
                      readOnly
                    />
                  </div> */}
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Số điện thoại"
                      value={user.phone}
                      readOnly
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Họ và tên"
                      value={user.fullname}
                      readOnly
                    />
                  </div>
                  {/* <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Hình ảnh"
                      value={user.image}
                      readOnly
                    />
                  </div> */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4 w-50 "
                  >
                    Chấp nhận
                  </button>
                  <button
                    className="btn btn-primary btn-block mb-4 w-50 "
                    onClick={() =>
                      handleNavigate("/admin/upgrade-to-teacher/detail/reject")
                    }
                  >
                    Từ chối
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
