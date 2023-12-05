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
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  
  const handleSendToEmail = async (register_course_id) => {    
    try {
      // console.log(register_course_id);
      
      // After the PATCH request is successful, make a POST request
      // const messageResponse = await axiosClient.put(`/courseRegisters/confirm-payment/${register_course_id}`);
      // console.log(messageResponse);
  
      // After both requests are successful, navigate to another route
      window.location.href = '/admin/payment-confirm';
    } catch (error) {
      console.error("Error updating role or sending message:", error);
    }
  };

  const reject = async (register_course_id) => {    
    try {
      console.log(register_course_id);
      
      // After the PATCH request is successful, make a POST request
      const messageResponse = await axiosClient.put(`/courseRegisters/reject-confirm-payment/${register_course_id}`);
      console.log(messageResponse);
  
      // After both requests are successful, navigate to another route
      window.location.href = '/admin/payment-confirm';
    } catch (error) {
      console.error("Error updating role or sending message:", error);
    }
  };

  const lockAccount = async (userId,register_course_id) => {    
    try {
      console.log(userId);
      const response = await axiosClient.patch(`/users/lock-account/${userId}`);
      console.log(response);
  
      const messageResponse = await axiosClient.put(`/courseRegisters/reject-confirm-payment/${register_course_id}`);
      console.log(messageResponse);
        
      window.location.href = '/admin/payment-confirm';
    } catch (error) {  
      console.error("Error updating role or sending message:", error);
    }
  };


  return (
    <div>
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
                        Danh sách yêu cầu người dùng
                      </h5>
                    </div>
                    <div className="card-body">                      
                      {users.map((user, index) => (
                        <div key={index} className="row mb-3">
                          <div>
                            <p className="d-inline-block float-lg-start">
                              <strong>
                                {user.email}  + đăng kí khóa học: {user.courseId}
                              </strong>
                            </p>
                            <div className="float-end">
                              <button
                                className="btn btn-primary btn-sm margin-button-header"
                                onClick={() =>
                                  handleSendToEmail(user.register_course_id)
                                }
                              >
                                <FontAwesomeIcon icon={faPaperPlane} /> Gửi mã
                                kích hoạt
                              </button>
                              <button
                                className="btn btn-primary btn-sm margin-button-header"
                                onClick={() =>
                                  lockAccount(user.userId, user.register_course_id)
                                }
                              >
                                <FontAwesomeIcon icon={faLock} /> Khóa tài khoản
                              </button>
                              <button
                                className="btn btn-primary btn-sm margin-button-header"
                                onClick={() =>
                                  reject(user.register_course_id)
                                }
                              >
                                <FontAwesomeIcon icon={faTimes} /> Từ chối
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
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
