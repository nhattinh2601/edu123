
import Header from './Header/Header';
import React, { useEffect, useRef, useState } from 'react';
import axiosClient from "../../api/axiosClient";
import { Link, useParams, useNavigate } from "react-router-dom";
function Admin() {
  
  const navigate = useNavigate();
  const [totalSold, setTotalSold] = useState(0);
  const [soldDay, setSoldDay] = useState(0);
  const [soldDayNoActive, setSoldDayNoActive] = useState(0);
  const [soldMonth, setSoldMonth] = useState(0);
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceDay, setPriceDay] = useState(0);
  const [priceMonth, setPriceMonth] = useState(0);

  const formatPrice = (price) => {
    if (typeof price !== "string") {
      price = String(price);
    }
    if (price == "0") {
      return "0 đồng";
    }
  
    if (price.startsWith("0")) {
      price = price.slice(1);
    }
  
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleNavigate = (path) => {
    navigate(path);
  };
  const cardStyle = {
    borderRadius: '0.25rem',
    backgroundColor: '#e6e6fa',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    display: 'inline-block', // Sử dụng inline-block để div tự động điều chỉnh theo nội dung
    width: '350px', // Chiều rộng mặc định là 300px
    height: '200px' // Chiều dài mặc định là 500px
  };
  
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        const currentDate = new Date();
        // Định dạng ngày theo DD-MM-YYYY
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`.replace(/(?<=^|\/)(\d)(?=\/|$)/g, '0$1');
        const formattedMonthYear = `${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
        // Sử dụng biến formattedDate trong URL
        const response = await axiosClient.get(`/courseRegisters/total-sold-in-day/${formattedDate}`);
        setSoldDay(response.data);

        const response_NoActive = await axiosClient.get(`/courseRegisters/total-sold-in-day-no-active/${formattedDate}`);
        setSoldDayNoActive(response_NoActive.data);

        const response2 = await axiosClient.get(`/courseRegisters/total-sold-in-month/${formattedMonthYear}`);
        setSoldMonth(response2.data);

        const response_price_day = await axiosClient.get(`/courseRegisters/total-price-in-day/${formattedDate}`);
        setPriceDay(formatPrice(response_price_day.data));

        const response_price_month = await axiosClient.get(`/courseRegisters/total-price-in-month/${formattedMonthYear}`);
        setPriceMonth(formatPrice(response_price_month.data));

        const response_total_sold = await axiosClient.get(`/courseRegisters/total-sold`);
        setTotalSold(response_total_sold.data);

        const response_total_price = await axiosClient.get(`/courseRegisters/total-price`);
        setTotalPrice(formatPrice(response_total_price.data));

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="manager-user-layout">
      <aside className="sidebar">
        <Header />
      </aside>
      <main className="manager-user-main-content col-md-10">  
      <h5>Chào mừng bạn đã đến với trang quản trị viên</h5>
      
      <div className="mb-3" style={cardStyle}>
        <h6>Thông tin bán hàng</h6>
        <p>
          Số lượng khóa học đã bán ngày hôm nay: {soldDay} &nbsp; <br />
          <span className='text-nowrap bd-highlight'>Đang chờ xử lý</span>: {soldDayNoActive} -&gt;
          <Link to={`/admin/payment-confirm`} className="d-inline-block">
            <span>Xử lý ngay!</span>
          </Link>
        </p>
        <p>
          Số lượng khóa học đã bán tháng này: {soldMonth}
        </p>
        <p>
          Tổng số lượng khóa học đã bán : {totalSold}
        </p>
      </div>
      <br/>
      <div style={cardStyle}>
        <h6>Thông tin doanh thu</h6>
        <p>
          Doanh thu hôm nay: {priceDay} vnđ
        </p>
        <p>
          Doanh thu tháng nay: {priceMonth} vnđ
        </p>
        <p>
          Tổng doanh thu: {totalPrice} vnđ
        </p>
      </div>
      </main>
    </div>

  );
}

export default Admin;
