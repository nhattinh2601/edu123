import { useNavigate } from 'react-router-dom';


export default function Register() {
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
              <h2 className="card-title text-center mb-5 fw-light fs-10 fw-bold ">Đăng ký</h2>
              <form action="/login" method="POST">
                
                <div className="form-outline mb-4">
                <label className="form-label fw-bold" for="form2Example1">Họ và tên</label>
                  <input type="email" name="email" id="email" autocomplete="on" className="form-control" />                  
                </div>

                <div className="form-outline mb-4">
                <label className="form-label fw-bold" for="form2Example1">Email</label>
                  <input type="email" name="email" id="email" autocomplete="on" className="form-control" />                  
                </div>

                <div className="form-outline mb-4">
                <label className="form-label fw-bold" for="form2Example1">Mật khẩu</label>
                  <input type="email" name="email" id="email" autocomplete="on" className="form-control" />                  
                </div>

                <div className="form-outline mb-4">
                <label className="form-label fw-bold" for="form2Example1">Nhập lại mật khẩu</label>
                  <input type="email" name="email" id="email" autocomplete="on" className="form-control" />                  
                </div>
                                                              
                <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Đăng ký</button>
                              
                <div className="text-center mt-5">
                        <p className="light-gray">Bạn đã có tài khoản? <a onClick={() => handleNavigate('/login')}>Đăng nhập</a></p>
                     </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  