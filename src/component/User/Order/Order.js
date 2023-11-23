import './Order.css';
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheckCircle  
} from "@fortawesome/free-solid-svg-icons";

export default function Order() {   
    const navigate = useNavigate();  
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
      <Header />
      
      <section class="h-100 gradient-custom">
  <div class="container py-5">
    <div className="row d-flex justify-content-center my-4">
      <FontAwesomeIcon icon={faCheckCircle} className="icon-size"></FontAwesomeIcon> 
      <h4 className="fw-bold justify-content-center d-flex p-4">Đặt hàng thành công!</h4>
      <p className="justify-content-center d-flex">Vui lòng chuyển khoản vào tài khoản sau đây!</p>
        <p><span className='fw-bold'>Tên tài khoản</span>: Công ty cổ phần đạo tạo trục tuyến EDU123</p>
        <p><span className='fw-bold'>Nội dung</span>: Thanh toán đơn hàng 100</p>
        <p><span className='fw-bold'>Số tiền</span>: 200$</p>
      <br/>  
      <br/>
      <table className="table table-bordered">
  <tr>
    <th>Số tài khoản</th>
    <th>Ngân hàng</th>
    <th>Mã QR</th>
  </tr>
  <tr>
    <td>58110001417006</td>
    <td>BIDV</td>
    <td>QR...</td>
  </tr>
  
</table>
    </div>
  </div>
</section>
    <br/>
    <br/>
    <div className=' justify-content-center d-flex'>
    <button type="button" className="btn btn-info ">Tôi đã chuyển khoản</button>
    
    </div>    
    <div className=' justify-content-center d-flex'><button onClick={navigate("/")}>Xem thêm các khóa học</button></div>
      <Footer/>
    </div>
  );
}

