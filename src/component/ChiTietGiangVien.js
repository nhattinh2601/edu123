import { useNavigate } from "react-router-dom";
import "../css/style.css";
import "../css/headers.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import background from "../image/background_header_chitietgv.jpg";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import avatar from "../image/August252017100pm_do-trung-thanh_thumb.jpg";

import Header from "./header/header-trang-chu";
import Footer from "./footer/footer";
import NoiDung from "./ChiTietGvNoiDung";
function App() {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
      <Header />
      <div class="container-fluid pt-5 overlay">
        <img
          class="img-background"
          width="1555px"
          height="350px"
          style={{ marginTop: "80px" }}
          src={background}
          alt="Đỗ Trung Thành"
          loading="lazy"
        />
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-6 ">
            <div class="u-teacher-avatar">
              <img
                class="rounded-circle"
                width="160px"
                height="160px"
                src={avatar}
                alt="Đỗ Trung Thành"
                loading="lazy"
              />
            </div>
            <div class="u-teacher-info">
              <h1 class="text-black fw-bold"> Đỗ Trung Thành </h1>
              <span class="text-black fw-bold">
                {" "}
                Giảng viên Trường Cao đẳng Sư phạm Yên Bái, Thạc sỹ Khoa học Máy
                tính{" "}
              </span>
              <div class="uti-link">
                <a
                  href="https://www.facebook.com/thanh.dotrung"
                  class="btn btn-light"
                  role="button"
                  aria-disabled="true"
                >
                  Flow mình
                </a>
                <a
                  href="https://www.facebook.com/thanh.dotrung"
                  class="btn btn-light"
                  role="button"
                  aria-disabled="true"
                >
                  Nhắn cho mình
                </a>
              </div>
            </div>
            <div class="d-inline-block text-black">
              <span>6 </span> Khóa học
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="d-inline-block text-black">
              <span>5 </span> <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>{" "}
              Đánh giá trung bình
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="d-inline-block text-black">
              <span>
                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> 14111 Học
                viên{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <NoiDung />

      <Footer />
    </div>
  );
}

export default App;
