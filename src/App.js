import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';


import TrangChu from './component/TrangChu';
import Login from './component/Login';
import Register from './component/Register';
import ForgetPassword from './component/ForgetPassword';
import ChiTietGiangVien from './component/ChiTietGiangVien';
import ChiTietKhoaHoc from './component/ChiTietKhoaHoc';
import ChinhSuaInfo from './component/user/ChinhSuaInfo';
import DoiMatKhau from './component/user/DoiMatKhau';
import DangKyGV from './component/giangvien/dangkygiangvien';
import UpdateInfoGV from './component/giangvien/updateinfo';
import InfoThanhToan from './component/giangvien/infothanhtoan';

import Admin from './component/admin/Admin';


import NotFound from './component/NotFound';


import 'bootstrap/dist/css/bootstrap.min.css'

const checkAccess = (requiredRoleId) => {
  const encodedRoleId = localStorage.getItem('roleId');
  const roleId = atob(encodedRoleId);

  return roleId === requiredRoleId || roleId === "2";
};

const ProtectedRoute = ({ element, path, requiredRoleId }) => {
  const hasAccess = checkAccess(requiredRoleId);

  return hasAccess ? element : <Navigate to="/" />;
};

const App = () => {
    return ( 
    <Router>
      <Routes>

        {/* Trang chung */}
        <Route path="/" element={<TrangChu />} />        
        <Route path="/login" element={<Login />} />   
        <Route path="/register" element={<Register />} />   
        <Route path="/forget-password" element={<ForgetPassword />} />   

        {/* Trang học viên */}
        <Route path="/user" element={<ProtectedRoute element={<TrangChu />} requiredRoleId="1" />}/>
        <Route path="/chitietgiangvien" element={<ProtectedRoute element={<ChiTietGiangVien />} requiredRoleId="1" />}/>
        <Route path="/chitietkhoahoc" element={<ProtectedRoute element={<ChiTietKhoaHoc />} requiredRoleId="1" />}/>
        <Route path="/user/chinhsuainfo" element={<ProtectedRoute element={<ChinhSuaInfo />} requiredRoleId="1" />}/>
        <Route path="/user/doimatkhau" element={<ProtectedRoute element={<DoiMatKhau />} requiredRoleId="1" />}/>
        <Route path="/giangvien/dangky" element={<ProtectedRoute element={<DangKyGV />}  requiredRoleId="1" />}/>
        <Route path="/giangvien/updateinfo" element={<ProtectedRoute element={<UpdateInfoGV />}  requiredRoleId="1" />}/>
        <Route path="/giangvien/infothanhtoan" element={<ProtectedRoute element={<InfoThanhToan />}  requiredRoleId="1" />}/>



        {/* Trang admin */}
        <Route path="/admin" element={<ProtectedRoute element={<Admin />} requiredRoleId="2" />}/>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
    );
};

export default App;