import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes, // icon for "Reject"
  faPaperPlane, // icon for "Send Activation Code"
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import Header from "../Header/Header";
import "./manager-user.css";
import Pagination from "../../Others/Pagination";


export default function PaymentConfirm() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái isLoading

  //paging
  //paging
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);

        const response = await axiosClient.get(
          `/courseRegisters/getcoursenoactive`
        );
        const filteredUsers = response.data.filter(
          (user) => user.isActive === null || user.isActive === false
        );
        let sortedUsers = filteredUsers.sort((a, b) => {
          return new Date(b.createAt) - new Date(a.createAt);
        });

        setUsers(sortedUsers);
        setIsLoading(false);

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleActiveCourse = async (register_course_id) => {
    try {
      console.log(register_course_id);
      setIsLoading(true);
      const messageResponse = await axiosClient.put(
        `/courseRegisters/active-course/${register_course_id}`
      );
      console.log(messageResponse);
      setIsLoading(false);
      setNotification({
        type: "success",
        message: "Kích hoạt khóa học thành công!",
      });
      setTimeout(() => {
      window.location.href = "/admin/payment-confirm";
      }, 2000);
    } catch (error) {
      console.error("Error updating role or sending message:", error);
      setNotification({
        type: "error",
        message: "Đã xảy ra lỗi vui lòng thử lại sau!",
      });
    }
  };

  const reject = async (register_course_id) => {
    try {
      console.log(register_course_id);
      setIsLoading(true);
      const messageResponse = await axiosClient.put(
        `/courseRegisters/reject-confirm-payment/${register_course_id}`
      );
      console.log(messageResponse);
      setIsLoading(false);
      setNotification({
        type: "success",
        message: "Từ chối khóa học thành công!",
      });
      setTimeout(() => {
      window.location.href = "/admin/payment-confirm";
      }, 2000);
    } catch (error) {
      console.error("Error updating role or sending message:", error);
      setNotification({
        type: "error",
        message: "Đã xảy ra lỗi vui lòng thử lại sau!",
      });
    }
  };

  const [selectedDate, setSelectedDate] = useState(""); 
  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    setIsLoading(true);
    if (newDate) {
      const inputDate = new Date(newDate);
      inputDate.setHours(0, 0, 0, 0); // Set time to start of day for comparison
      const inputTimestamp = inputDate.getTime();
      console.log(inputTimestamp);
      // Lọc mảng users dựa trên ngày createAt
      const filteredUsers = users.filter((user) => {
        // Chuyển thuộc tính createAt từng user thành Date object
        const userCreateDate = new Date(user.createAt);
        // Đặt thời gian của Date object này về đầu ngày
        userCreateDate.setHours(0, 0, 0, 0);
        // Lấy timestamp từ Date object
        const userTimestamp = userCreateDate.getTime();
        console.log(userTimestamp);
        // So sánh timestamp của user với timestamp từ input
        return userTimestamp === inputTimestamp;
      });
      setUsers(filteredUsers);
    setIsLoading(false);
    } else {
      // Nếu không có ngày được chọn, hiển thị lại toàn bộ danh sách
      setUsers(users);
    }
  };

  return (
    <div className="manager-user-layout">
      <aside className="sidebar">
        <Header />
      </aside>
      <main className="manager-user-main-content col-md-10">  
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
                      {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
                    </div>
                    <div className="card-body">
                      <table className="table">
                      <thead>
                <tr>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Date </th>
                  <th scope="col">OTP</th>
                  <th scope="col">Khóa học</th>
                  <th scope="col">Giá tiền</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              
                        <tbody>
                          {users.slice(startIndex, endIndex).map((user, index) => (
                            <tr key={index}>
                              <td className="text-start">
                                <strong>{user.fullname}</strong>
                              </td>
                              <td className="text-start">
                                <strong>{user.phone}</strong>
                              </td>
                              <td className="text-start">
                                <strong>{new Date(user.updateAt).toLocaleString("vi-VN")}</strong>
                              </td>
                              <td className="text-start">
                                <strong>{user.otp}</strong>
                              </td>
                              <td className="text-start">
                                <strong>{user.course_name}</strong>
                              </td>
                              <td className="text-start">
                                <strong>{user.price}</strong>
                              </td>
                              <td className="text-end">
                                <button
                                  className="btn btn-primary btn-sm me-2"
                                  onClick={() =>
                                    handleActiveCourse(user.register_course_id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faPaperPlane} />
                                  Kích hoạt
                                </button>
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() =>
                                    reject(user.register_course_id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faTimes} /> Từ chối
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Pagination
              pageCount={Math.ceil(users.length / itemsPerPage)}
              handlePageClick={handlePageClick}
            />
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
      </main>
    </div>
  );
}
