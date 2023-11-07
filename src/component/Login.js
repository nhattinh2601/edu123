import '../css/style.css';
import '../css/headers.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebookF,faGoogle,faGit, faTwitter } from '@fortawesome/free-brands-svg-icons' 


function App() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-10 fw-bold text-decoration-underline">Sign In</h5>
              <form action="/login" method="POST">
                
                <div className="form-outline mb-4">
                  <input type="email" name="email" id="email" autocomplete="on" className="form-control" />
                  <label className="form-label" for="form2Example1">Email address</label>
                </div>
                                
                <div className="form-outline mb-4">
                  <input type="password" className="form-control" name="password" id="password" />
                  <label className="form-label" for="form2Example2">Password</label>
                </div>
              
                
                <div className="row mb-4">
                  <div className="col d-flex justify-content-center">                    
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                      <label className="form-check-label" for="form2Example31"> Remember me </label>
                    </div>
                  </div>
              
                  <div className="col">                    
                    <a href="#">Forgot password?</a>
                  </div>
                </div>
                              
                <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Sign in</button>
                              
                <div className="text-center">
                  <p>Not a member? <a href="/register">Register</a></p>
                  <p>or sign up with:</p>
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
  
  export default App;
  