import '../../css/style.css';
import '../../css/headers.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebookF,faGoogle,faGit, faTwitter } from '@fortawesome/free-brands-svg-icons' 
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import avatar from "../../image/August252017100pm_do-trung-thanh_thumb.jpg";

function App() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-10 fw-bold text-decoration-underline">Cập Nhật Thông Tin </h5>
              <form action="/login" method="POST">
                
                <div >
                    <img src={avatar} className='rounded-circle' width='100px' />                    
                    <br/>
                    <button type="submit" className="btn btn-light btn-block mb-4 w-20 "><FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>Đổi hình đại diện</button>
                </div>
                <div className="form-outline mb-4">
                <label className="form-label fw-bold" for="form2Example1">Họ và tên *</label>
                  <input type="name" name="email" id="email" autocomplete="on" className="form-control" />                  
                </div>
                                
                <div className="form-outline mb-4">
                <label className="form-label fw-bold" for="form2Example1">Số điện thoại *</label>
                  <input type="phone" className="form-control" name="password" id="password" />                  
                </div>                            
                
                   
                <button type="submit" className="btn btn-primary btn-block mb-4 w-50 ">Cập nhật</button>
                <a type="button" href='/user/doimatkhau' className="btn btn-light btn-block mb-4 w-50 ">Đổi mật khẩu</a>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  export default App;
  