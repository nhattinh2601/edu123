import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import Header from '../Header/Header';
import "./upgrade-to-teacher.css";

export default function UpgradeToTeacher() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get(`/users/role=4`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="manager-user-layout">
    <aside className="sidebar">
      <Header />
    </aside>
    <main className="manager-user-main-content col-md-8">
      <div className="card mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 d-inline-block">Danh sách yêu cầu người dùng</h5>
        </div>
        <div className="card-body">
          {users.map((user, index) => (
            <div key={index} className="row mb-3">
              <div>
                <p className="d-inline-block float-lg-start">
                  <strong>{user.fullname} yêu cầu trở thành giảng viên</strong>
                </p>
                <button
                  className="btn btn-primary btn-sm margin-button-header d-inline-block float-end"
                  onClick={() =>
                    handleNavigate(
                      `/admin/upgrade-to-teacher/detail/${user.Id}`
                    )
                  }
                >
                  <FontAwesomeIcon icon={faCircleInfo} /> Chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </main>
    </div>
  );
}
