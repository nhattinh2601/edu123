import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock, // icon for "Lock Account"
  faTimes, // icon for "Reject"
  faPaperPlane, // icon for "Send Activation Code"
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import Header from "../Header/Header";
export default function PaymentConfirm() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get(
          `/courseRegisters/getcoursenoactive`
        );
        const filteredUsers = response.data.filter(
          (user) => user.isActive === null || user.isActive === false
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleActiveCourse = async (register_course_id) => {
    try {
      console.log(register_course_id);

      const messageResponse = await axiosClient.put(
        `/courseRegisters/active-course/${register_course_id}`
      );
      console.log(messageResponse);

      window.location.href = "/admin/payment-confirm";
    } catch (error) {
      console.error("Error updating role or sending message:", error);
    }
  };

  const reject = async (register_course_id) => {
    try {
      console.log(register_course_id);

      const messageResponse = await axiosClient.put(
        `/courseRegisters/reject-confirm-payment/${register_course_id}`
      );
      console.log(messageResponse);

      window.location.href = "/admin/payment-confirm";
    } catch (error) {
      console.error("Error updating role or sending message:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-9 col-lg-10 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-6 p-sm-10">
                <div className="container">
                  {/* List of documents */}
                  <div className="card mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 d-inline-block">
                        Danh sách xác nhận thanh toán
                      </h5>
                    </div>
                    <div className="card-body">
  <table className="table">
    <thead>
      <tr>
        <th scope="col" className="text-start">Mã OTP</th>
        <th scope="col" className="text-end"></th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={index}>
          <td className="text-start"><strong>{user.otp}</strong></td>
          <td className="text-end">
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => handleActiveCourse(user.register_course_id)}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Kích hoạt khóa học
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => reject(user.register_course_id)}
            >
              <FontAwesomeIcon icon={faTimes} /> Từ chối
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="card border-0 shadow rounded-3 my-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
