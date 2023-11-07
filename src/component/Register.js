import { useNavigate } from 'react-router-dom';
import '../css/style.css';
import '../css/headers.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebookF,faGoogle,faGit, faTwitter } from '@fortawesome/free-brands-svg-icons' 



function App() {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
      navigate(path);
    };
    return (
      <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-10 fw-bold text-decoration-underline">Đăng ký</h5>
              <form action="/login" method="POST">
                
                <div className="form-outline mb-4">
                  <input type="email" name="email" id="email" autocomplete="on" className="form-control" />
                  <label className="form-label" for="form2Example1">Họ và tên</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" name="email" id="email" autocomplete="on" className="form-control" />
                  <label className="form-label" for="form2Example1">Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" name="email" id="email" autocomplete="on" className="form-control" />
                  <label className="form-label" for="form2Example1">Mật khẩu</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" name="email" id="email" autocomplete="on" className="form-control" />
                  <label className="form-label" for="form2Example1">Nhập lại mật khẩu</label>
                </div>
                                            
                <div className="row mb-4">
                  <div className="col d-flex justify-content-center">                    
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                      <label className="form-check-label" for="form2Example31"> Remember me </label>
                    </div>
                  </div>
                                
                </div>
                              
                <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Đăng ký</button>
                              
                <div className="text-center mt-5">
                        <p className="light-gray">Already have an Account? <a onClick={() => handleNavigate('/login')}>Đăng nhập</a></p>
                     </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  export default App;
  