import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import Header from "../Header/Header";
import "./manager-user.css";
import "../Notification/Notification.css";
import Pagination from "../../Others/Pagination";


export default function ManagerUser() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái isLoading

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get(`/users`);
      const filteredUsers = response.data.filter(
        (user) =>
          user.fullname.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      setIsLoading(false);
      setUsers(filteredUsers);
      if (filteredUsers.length > 0) {
      } else {
        setNotification({
          type: "success",
          message:
            "Không tìm thấy tài khoản người dùng với tên hay email: " + search,
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching users:", error);
    }
  };

  function getRoleName(roleId) {
    switch (roleId) {
      case 1:
        return "Người dùng";
      case 2:
        return "Giảng viên";
      case 3:
        return "Admin";
      case 4:
        return "Người dùng";
      default:
        return "Không xác định";
    }
  }


  const handleToggleLock = async (userId, isDeleted) => {
    try {
      console.log(isDeleted);

      let response;

      if (isDeleted) {
        setIsLoading(true);
        response = await axiosClient.patch(`/users/unlock-account/${userId}`);
        setIsLoading(false);
        setTimeout(() => {
          window.location.reload();
          setNotification({
            type: "success",
            message: "Mở khóa tài khoản người dùng thành công!",
          });
        }, 3000); 
      } else {
        console.log(userId);
        setIsLoading(true);
        response = await axiosClient.patch(`/users/lock-account/${userId}`);
        setIsLoading(false);
        setTimeout(() => {
          window.location.reload();
          setNotification({
            type: "success",
            message: "Đã khóa tài khoản người dùng thành công!",
          });
        }, 3000); 
      }

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error("Error updating role or sending message:", error);
      setNotification({
        type: "error",
        message: "Đã xảy ra lỗi, vui lòng thử lại",
      });
    } finally {
      // Tắt trạng thái isLoading sau cùng để đảm bảo nó luôn được thực hiện
      handleSearch(); // Bạn cũng có thể muốn đợi kết quả của handleSearch nếu nó là async
    }
  };

  //paging
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`/users`);
        let sortedUsers = response.data.sort((a, b) => {
          // So sánh thời gian tạo giữa hai người dùng và sắp xếp từ mới đến cũ
          return new Date(b.createAt) - new Date(a.createAt);
        });

        // Nếu có yêu cầu tìm kiếm, lọc người dùng theo từ khóa tìm kiếm
        if (search) {
          sortedUsers = sortedUsers.filter((user) =>
            user.createAt.toLowerCase().includes(search.toLowerCase())
          );
        }

        setUsers(sortedUsers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //paging

  return (
    <div className="manager-user-layout">
      <aside className="sidebar">
        <Header />
      </aside>
      <main className="manager-user-main-content col-md-8">
        {/* Search bar */}
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 d-inline-block">Danh sách người dùng</h5>
          </div>
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Ngày tạo tài khoản</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Quyền</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              {isLoading ? (
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <div></div>
              )}
              <tbody>
                {users.slice(startIndex, endIndex).map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.createAt).toLocaleString("vi-VN")}</td>
                    <td>
                      {user.isDeleted === true ? "Bị khóa" : "Đang hoạt động"}
                    </td>
                    <td>{getRoleName(user.roleId)}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          handleNavigate(`/admin/user-info/${user.Id}`)
                        }
                      >
                        <FontAwesomeIcon icon={faCircleInfo} /> Chi tiết
                      </button>
                      &nbsp;
                      <button
                        className={`btn btn-sm ${
                          user.isDeleted === true ? "btn-success" : "btn-danger"
                        }`}
                        onClick={() =>
                          handleToggleLock(user.Id, user.isDeleted)
                        }
                      >
                        {user.isDeleted === true
                          ? "Mở khóa tài khoản"
                          : "Khóa tài khoản"}
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
      </main>
    </div>
  );
}
