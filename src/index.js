import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TrangChu from './component/TrangChu';
import Login from './component/Login';
import Register from './component/Register.js';
import ChiTietGiangVien from './component/ChiTietGiangVien'
import ChiTietKhoaHoc from './component/ChiTietKhoaHoc'
import ChinhSuaInfo from './component/user/ChinhSuaInfo'
import DoiMatKhau from './component/user/DoiMatKhau'
import DangKyGV from './component/giangvien/dangkygiangvien'
import UpdateInfoGV from './component/giangvien/updateinfo'
import InfoThanhToan from './component/giangvien/infothanhtoan'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<TrangChu />} />        
        <Route path="/login" element={<Login />} />   
        <Route path="/register" element={<Register />} />   
        <Route path="/chitietgiangvien" element={<ChiTietGiangVien />} /> 
        <Route path="/chitietkhoahoc" element={<ChiTietKhoaHoc />} /> 
        <Route path="/user/chinhsuainfo" element={<ChinhSuaInfo />} /> 
        <Route path="/user/doimatkhau" element={<DoiMatKhau />} /> 
        <Route path="/giangvien/dangky" element={<DangKyGV />} /> 
        <Route path="/giangvien/updateinfo" element={<UpdateInfoGV />} /> 
        <Route path="/giangvien/infothanhtoan" element={<InfoThanhToan />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);
