import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TrangChu from './component/TrangChu';
import Login from './component/Login';
import Register from './component/Register.js';
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<TrangChu />} />        
        <Route path="/login" element={<Login />} />   
        <Route path="/register" element={<Register />} />   
      </Routes>
    </Router>
  </React.StrictMode>
);