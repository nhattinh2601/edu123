import { useNavigate } from "react-router-dom";
import "./Home.css";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faLineChart,
  faDesktop,
  faSearchDollar,
  faLightbulb,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

import slideshow1 from "../../../assets/images/slideshow_1.jpg"; 


import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HomeContent from "./HomeContent";


export default function Home() {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
      <Header />
      <div className=" col-sm-3">
        <nav>
          <ul>
            <li className="dropdown">
              <a href="#">
                <FontAwesomeIcon icon={faLanguage}></FontAwesomeIcon>&nbsp;Ngoại
                ngữ
              </a>
              <ul>
                <li>
                  <a href="#">Tất cả ngoại ngữ</a>
                </li>
                <li>
                  <a href="#">Tiếng Anh</a>
                </li>
                <li>
                  <a href="#">Tiếng Đức</a>
                </li>
                <li>
                  <a href="#">Tiếng Hàn</a>
                </li>
                <li>
                  <a href="#">Tiếng Nhật</a>
                </li>
                <li>
                  <a href="#">Tiếng Trung</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">
                <FontAwesomeIcon icon={faLineChart}></FontAwesomeIcon>
                &nbsp;Marketing
              </a>
              <ul>
                <li>
                  <a href="#">Tất cả Marketing</a>
                </li>
                <li>
                  <a href="#">Facebook Marketing</a>
                </li>
                <li>
                  <a href="#">Zalo Marketing</a>
                </li>
                <li>
                  <a href="#">Google Ads</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">
                <FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon>&nbsp;Tin
                học văn phòng
              </a>
              <ul>
                <li>
                  <a href="#">Tất cả Tin học văn phòng</a>
                </li>
                <li>
                  <a href="#">Word</a>
                </li>
                <li>
                  <a href="#">Excel</a>
                </li>
                <li>
                  <a href="#">Power Point</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">
                <FontAwesomeIcon icon={faSearchDollar}></FontAwesomeIcon>
                &nbsp;Tài chính kế toán
              </a>
              <ul>
                <li>
                  <a href="#">Tất cả Tài chính kế toán</a>
                </li>
                <li>
                  <a href="#">Kế toán</a>
                </li>
                <li>
                  <a href="#">Tài chính</a>
                </li>
                <li>
                  <a href="#">Chứng khoán</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">
                <FontAwesomeIcon icon={faLightbulb}></FontAwesomeIcon>&nbsp;Kỹ
                năng
              </a>
              <ul>
                <li>
                  <a href="#">Tất cả Kỹ năng</a>
                </li>
                <li>
                  <a href="#">Kỹ năng lãnh đạo</a>
                </li>
                <li>
                  <a href="#">Kỹ năng mềm</a>
                </li>
                <li>
                  <a href="#">Kỹ năng phát triển bản thân</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">
                <FontAwesomeIcon icon={faCode}></FontAwesomeIcon>&nbsp;Công nghệ
              </a>
              <ul>
                <li>
                  <a href="#">Tất cả Công nghệ thông tin</a>
                </li>
                <li>
                  <a href="#">Dữ liệu</a>
                </li>
                <li>
                  <a href="#">Công nghệ thông tin</a>
                </li>
                <li>
                  <a href="#">Sữa chữa, chế tạo</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div
        id="demo"
        className="carousel slide col-sm-6 slideshow_homepage"
        data-bs-ride="carousel"
      >        
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={slideshow1}
              alt="Los Angeles"
              className="d-block w-100 image-slideshow"
            />
          </div>                  
        </div>         
      </div>

      <HomeContent />
      

      <Footer />
    </div>
  );
}

