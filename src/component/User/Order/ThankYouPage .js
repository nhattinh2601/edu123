import './Order.css';
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


export default function ThankYouPage () {   
    const navigate = useNavigate();  
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
     <Header/> 
    <div className="container">
      <div className="py-5 text-center">
        <h2>Cảm ơn bạn đã đặt hàng</h2>
        <p className="lead">
          Thông tin đã được gửi cho quản trị viên, trong thời gian tới vui lòng kiểm tra email để nhận được mã kích hoạt khóa học.
        </p>
      </div>

      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Cần Hỗ Trợ?</h5>
              <p className="card-text">
                Nếu bạn muốn hỗ trợ thì vui lòng gọi tới số điện thoại: <a href="tel:0708128879">0708128879</a> hoặc email <a href="mailto:20110576@student.hcmute.edu.vn">20110576@student.hcmute.edu.vn</a> để được hỗ trợ!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div> 
  );
}


