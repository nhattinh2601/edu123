import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import Header from '../Header/Header';

export default function ManagerUser() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axiosClient.get(`/users`);
      const filteredUsers = response.data.filter(user => 
        user.fullname.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  
  function getRoleName(roleId) {
    switch(roleId) {
      case 1: return 'Người dùng';
      case 2: return 'Giảng viên';
      case 3: return 'Admin';
      case 4: return 'Người dùng';
      default: return 'Không xác định';
    }
  }
  const handleToggleLock = async (userId,isDeleted) => {    
    try {
      console.log(isDeleted);
      if(isDeleted){
        console.log(userId);
      const response = await axiosClient.patch(`/users/unlock-account/${userId}`);
      console.log(response);
      }else{
        console.log(userId);
        const response = await axiosClient.patch(`/users/lock-account/${userId}`);
        console.log(response);
      }
      
      
      
        
      
    } catch (error) {  
      console.error("Error updating role or sending message:", error);
    }
  };
  
  return (
    <div className="container">
      <Header/>
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
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
        </div>
      <div className="card mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 d-inline-block">Danh sách người dùng</h5>
        </div>
        <div className="card-body">
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Họ và tên</th>
        <th scope="col">Email</th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Quyền</th>
        <th scope="col">Hành động</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={user.id}>
          <th scope="row">{index + 1}</th>
          <td>{user.fullname}</td>
          <td>{user.email}</td>
          <td>{user.isDeleted === true ? 'Bị khóa' : 'Đang hoạt động'}</td>
          <td>{getRoleName(user.roleId)}</td>
          <td>
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                handleNavigate(
                  `/admin/user-info/${user.Id}`
                )
              }
            >
              <FontAwesomeIcon icon={faCircleInfo} /> Chi tiết
            </button>&nbsp;
            <button
              className={`btn btn-sm ${user.isDeleted === true ? 'btn-success' : 'btn-danger'}`}
              onClick={() => handleToggleLock(user.Id, user.isDeleted)}
            >
              {user.isDeleted === true ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
}