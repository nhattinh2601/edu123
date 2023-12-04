import React from 'react';
import Header from './Header/Header';

import { Link, useParams, useNavigate } from "react-router-dom";
function Admin() {
  
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div >
      <Header/>
      <h5>Chào mừng bạn đã đến với trang quản trị viên</h5>
    </div>

  );
}

export default Admin;
