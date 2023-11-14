import '../css/style.css';
import '../css/headers.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { faFacebookF, faGoogle, faGit, faTwitter } from '@fortawesome/free-brands-svg-icons'

import UserAPI from '../api/UserAPI';

function App() {
  const navigate = useNavigate();
  const [error, setError] = useState({ passwordWeak: false, emailPasswordNotFound: false });
  const [formValues, setFormValues] = useState({
    password: '',
    email: ''
  });

  useEffect(() => {
    const message = localStorage.getItem('message');
    if (message) {
      toast.error(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      localStorage.removeItem('message');
    }
  }, []);

  useEffect(() => {
    checkPassword();
  }, [formValues]);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const checkPassword = () => {
    setError((prevState) => ({
      ...prevState,
      passwordWeak: formValues.password.length <= 5,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const params = { email: formValues.email, password: formValues.password };
      const response = await toast.promise(UserAPI.login(params), {
        pending: 'Đang đăng nhập...',
        success: 'Đăng nhập thành công!',
        error: 'Đăng nhập thất bại.',
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      

      if (accessToken !== null) {
        const roleId = response.data.UserProfileDto.roleId;
        const encodedRoleId = btoa(roleId); // Mã hóa roleId
        localStorage.setItem('roleId', encodedRoleId);
        const destination = roleId === 2 ? '/admin' : '/user';

        setTimeout(() => {
          navigate(destination);
        }, 1000);
      } else {
        setError((prevState) => ({ ...prevState, emailPasswordNotFound: true }));
        };
      } catch (error) {
      console.error(error);
      }
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-10 fw-bold text-decoration-underline">Sign In</h5>
              
              <form>
                <div className="form-outline mb-4">
                  <input type="email" name="email" id="email" autoComplete="on" className="form-control" value={formValues.email} onChange={handleChange} />
                  <label className="form-label" htmlFor="form2Example1">Email address</label>
                </div>
                <div className="form-outline mb-4">
                <input type="password" name="password" id="password" autoComplete="on" className="form-control" value={formValues.password} onChange={handleChange}/>
                {error.passwordWeak && formValues.password.length > 0 && (
                  <span style={{ backgroundColor: 'yellow', display: 'block', marginTop: '5px' }}>
                    Mật khẩu ít nhất 6 kí tự
                  </span>
                )}
                <label className="form-label" htmlFor="form2Example2">Password</label>
                {error.emailPasswordNotFound && (
                  <span style={{ backgroundColor: 'yellow', display: 'block', marginTop: '5px' }}>
                    Sai email hoặc mật khẩu! Vui lòng Nhập lại
                  </span>
                )}
              </div>
                <div className="row mb-4">
                  <div className="col d-flex justify-content-center">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                      <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                    </div>
                  </div>
                  <div className="col">
                    <Link to="#">Forgot password?</Link>
                  </div>
                </div>       
                <button className="btn btn-primary btn-block mb-4 w-100" onClick={handleLogin}>Sign in</button>
                <div className="text-center">
                  <p>Not a member? <Link to="/register">Register</Link></p>
                  <p>or sign up with:</p>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <FontAwesomeIcon icon={faGit}></FontAwesomeIcon>
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

export default App;
