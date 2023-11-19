import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebookF,faGoogle,faGit, faTwitter } from '@fortawesome/free-brands-svg-icons' 


export default function Login() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h2 className="card-title text-center mb-5 fw-light fs-10 fw-bold ">Đăng nhập</h2>
              <form action="/login" method="POST">                
                <div className="form-outline mb-4">
                  <label className="form-label fw-bold" for="form2Example1">Email </label>
                  <input type="email" name="email" id="email" autocomplete="off" className="form-control" />                  
                </div>
                                
                <div className="form-outline mb-4">
                  <label className="form-label fw-bold" for="form2Example2">Mật khẩu</label>
                  <input type="password" className="form-control" name="password" id="password" />                  
                </div>
              
                
                <div className="row mb-4">
                  <div className="col d-flex justify-content-center">                    
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                      <label className="form-check-label" for="form2Example31"> Lưu mật khẩu </label>
                    </div>
                  </div>
              
                  <div className="col">                    
                    <a href="#">Quên mật khẩu?</a>
                  </div>
                </div>
                              
                <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Đăng nhập</button>
                              
                <div className="text-center">
                  <p>Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
                  <p>hoặc đăng nhập với:</p>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <FontAwesomeIcon icon={faFacebookF} ></FontAwesomeIcon>
                  </button>
              
                  <button type="button" className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faGoogle} ></FontAwesomeIcon>
                  </button>
              
                  <button type="button" className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faTwitter} ></FontAwesomeIcon>
                  </button>
              
                  <button type="button" className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faGit} ></FontAwesomeIcon>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  
  