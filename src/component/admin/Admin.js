
import Header from './Header/Header';
import React, { useEffect, useRef, useState } from 'react';
import axiosClient from "../../api/axiosClient";
import { Link, useParams, useNavigate } from "react-router-dom";
function Admin() {
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái isLoading


  const [totalSold, setTotalSold] = useState(0);
  const [soldDay, setSoldDay] = useState(0);
  const [soldDayNoActive, setSoldDayNoActive] = useState(0);
  const [soldMonth, setSoldMonth] = useState(0);
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceDay, setPriceDay] = useState(0);
  const [priceMonth, setPriceMonth] = useState(0);
  const getCurrentFormattedDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };
  const [dateStart, setDateStart] = useState(getCurrentFormattedDate());
  const [dateEnd, setDateEnd] = useState(getCurrentFormattedDate());
  const [totalPriceInTime, setTotalPriceInTime] = useState(0);
  const [totalSoldInTime, setTotalSoldInTime] = useState(0);

  const formatPrice = (price) => {
    if (typeof price !== "string") {
      price = String(price);
    }
    if (price == "0") {
      return "0";
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  // Function to handle the filtering action
  const handleFilter = async () => {
    try {
      const formattedStart = formatDate(dateStart);
      const formattedEnd = formatDate(dateEnd);
      // Create the URL with the formatted dates
      setIsLoading(true);
      const price = await axiosClient.get(`/courseRegisters/total-price-in-time/${formattedStart}/${formattedEnd}`);
      setTotalPriceInTime(formatPrice(price.data));

      const sold = await axiosClient.get(`/courseRegisters/total-sold-in-time/${formattedStart}/${formattedEnd}`);
      setTotalSoldInTime(formatPrice(sold.data));
      setIsLoading(false);
      // Navigate to the new URL
    } catch (error) {
      console.error("Error formatting dates or navigating:", error);
    }
  };

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
      &nbsp;&nbsp;
      {/* filter lọc ngày tháng năm */}
      <div className="mb-3 d-inline-block">
        <h6>Lọc theo thời gian</h6>
        <label htmlFor="dateStart">Ngày bắt đầu:</label>
          <input type="date" id="dateStart" name="dateStart" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
          <label htmlFor="dateEnd">Ngày kết thúc:</label>
          <input type="date" id="dateEnd" name="dateEnd" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />&nbsp;
          <button className='badge bg-primary text-wrap'  onClick={handleFilter}>Lọc</button>
        <p>
          Doanh thu : {totalPriceInTime} vnđ
        </p>
        <p>
          Số lượng khóa học: {totalSoldInTime} 
        </p>
        {isLoading ? (
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <div></div>
              )}
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
        
          Tổng doanh thu: {totalPrice ==0 ? (
                <div class="d-flex align-items-center">
                <strong>Loading...</strong>
                <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
              </div>
              ) : (
                <p>{totalPrice} vnđ</p>
              )} 
        
      </div>
      

      </main>
    </div>

  );
}

export default Admin;
