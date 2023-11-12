import "../../css/style.css";
import "../../css/headers.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
  faGit,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import avatar from "../../image/August252017100pm_do-trung-thanh_thumb.jpg";
import Header from "./../header/header-trang-chu";
import Footer from "./../footer/footer";

function App() {
  return (
    <div>
        <Header/>
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-9 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h2 className="card-title text-center mb-5  fw-bold ">
                Đăng Ký Giảng Viên{" "}
              </h2>
              <form action="/login" method="POST">
                <div className="form-outline mb-4">
                  <input
                    type="name"
                    name="email"
                    id="email"
                    placeholder="Họ và tên"
                    autocomplete="on"
                    className="form-control w-50 d-inline-block "
                  />
                  <input
                    className="form-control w-50 d-inline-block"
                    type="text"
                    value="Email"
                    aria-label="readonly input example"
                    readonly
                  ></input>
                </div>

                <div className="form-outline mb-4"></div>

                <div className="form-outline mb-4">
                  <input
                    type="phone"
                    className="form-control"
                    placeholder="Số điện thoại"
                    name="password"
                    id="password"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="phone"
                    className="form-control"
                    placeholder="Chức danh"
                    name="password"
                    id="password"
                  />
                </div>

                <div className="form-outline mb-4">
                  <textarea
                    type="phone"
                    className="form-control"
                    placeholder="Chủ đề muốn giảng dạy trên edu123"
                    name="password"
                    id="password"
                  />
                </div>

                <div className="form-outline mb-4">
                  <textarea
                    type="phone"
                    className="form-control"
                    placeholder="Kinh nghiệp giảng dạy"
                    name="password"
                    id="password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4 w-100 "
                >
                  Đăng ký ngay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default App;
