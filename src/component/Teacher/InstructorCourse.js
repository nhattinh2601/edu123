import { useNavigate } from "react-router-dom";
import React from "react";
import logo from "../../image/logo.png";
import "../../css/headers.css";
import "../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import {
  faList,
  faClock,
  faChevronRight,
  faSearchDollar,
  faLightbulb,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import facebookcourse from "../../image/facebookcourse.jpg";

export default function Header() {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div className="center_body ">
      <div class="bg-light bg-gradient" id="infogiangvien">
        <h3>Giới thiệu</h3>
        <div class="container">
          <div class="row">
            <div class="pre">
              Đỗ Trung Thành- Giảng viên Trường Cao đẳng Sư phạm Yên Bái, Thạc
              sỹ Khoa học Máy tính Đỗ Trung Thành - Giảng viên Trường Cao đẳng
              Sư phạm Yên Bái Trình độ: Thạc sỹ Khoa học Máy tính Đạt giải nhì
              Hội thi sáng tạo kỹ thuật tỉnh Yên Bái (năm 2016) Đạt giải nhì
              Cuộc thi Thiết kế bài giảng e-Learning Quốc gia lần thứ 4 (2017).
              Nhiều năm đạt giáo viên dạy giỏi cấp tỉnh, có học sinh giỏi cấp
              quốc gia Đỗ Trung Thành với kinh nghiệm 20 năm tham gia công tác
              giảng dạy. Tham gia nhiều dự án xây dựng website, phần mềm. Có
              kinh nghiệm giảng dạy Tin học Văn phòng; thiết kế đồ họa; biên tập
              âm thanh; biên tập videos; lập trình thiết kế, xây dựng website,
              xây dựng phần mềm với các ngôn ngữ C# và PHP
            </div>
            <div>
              <a class="see-more-info-btn" href="javascript:void(0)">
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h3>Khóa học của giảng viên Đỗ Trung Thành</h3>
      <br />

      <br />
      <div className="bg-light bg-gradient" id="noidung">
        <div class="p-2">
          <div class="d-inline-block float-start p-2">
            <a href="https://unica.vn/thiet-ke-trinh-chieu-powerpoint-2016-tu-a-z">
              <img
                class="img-responsive card-course-img"
                src={facebookcourse}
                alt="Thiết kế trình chiếu PowerPoint 2016 từ A-Z - Đỗ Trung Thành"
                loading="lazy"
              />
            </a>
          </div>

          <div className="d-inline-block card-course-text">
            <p>
              <a
                className="link-offset-2 link-underline link-underline-opacity-0 text-black fw-bold"
                href="https://unica.vn/thiet-ke-trinh-chieu-powerpoint-2016-tu-a-z"
              >
                Thiết kế trình chiếu PowerPoint 2016 từ A-Z
              </a>
            </p>
            <ul class="mini-des">
              <li>
                <FontAwesomeIcon icon={faList}></FontAwesomeIcon> 43 bài giảng
              </li>
              <li>
                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> 05 giờ 30
                phút
              </li>
            </ul>
            <ul>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Nhanh chóng làm chủ phần mềm PowerPoint 2016
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Nắm được các bước cụ thể về quá trình tạo ra bài thuyết trình,
                bài giảng điện tử,…
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Được thực hành chi tiết từng nội dung, thành phần và đối tượng
                cụ thể
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Có đủ kỹ năng về thiết kế, trình chiếu thông qua các bài thực
                hành
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Thực hành trực tiếp từng sản phẩm theo các video bài học
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Tự tin thuyết trình với side chuyên nghiệp
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Tự tin Thiết kế CV, inforgraphic, video marketing... và còn
                nhiểu hơn thế!
              </li>
            </ul>
          </div>

          <div class="d-inline-block float-end">
            <div class="lp-bc-price">
              <p class="">
                399,000<sup>đ</sup>
              </p>
              <p class="text-decoration-line-through">
                500,000<sup>đ</sup>
              </p>
              <p class="">OFF 20%</p>
              <a
                class="btn btn-danger"
                href="https://unica.vn/thiet-ke-trinh-chieu-powerpoint-2016-tu-a-z"
              >
                CHI TIẾT
              </a>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="bg-light bg-gradient" id="noidung">
        <div class="p-2">
          <div class="d-inline-block float-start p-2">
            <a href="https://unica.vn/thiet-ke-trinh-chieu-powerpoint-2016-tu-a-z">
              <img
                class="img-responsive card-course-img"
                src={facebookcourse}
                alt="Thiết kế trình chiếu PowerPoint 2016 từ A-Z - Đỗ Trung Thành"
                loading="lazy"
              />
            </a>
          </div>

          <div class="d-inline-block card-course-text">
            <p>
              <a
                className="link-offset-2 link-underline link-underline-opacity-0 text-black fw-bold"
                href="https://unica.vn/thiet-ke-trinh-chieu-powerpoint-2016-tu-a-z"
              >
                Thiết kế trình chiếu PowerPoint 2016 từ A-Z
              </a>
            </p>
            <ul class="mini-des">
              <li>
                <FontAwesomeIcon icon={faList}></FontAwesomeIcon> 43 bài giảng
              </li>
              <li>
                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> 05 giờ 30
                phút
              </li>
            </ul>
            <ul>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Nhanh chóng làm chủ phần mềm PowerPoint 2016
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Nắm được các bước cụ thể về quá trình tạo ra bài thuyết trình,
                bài giảng điện tử,…
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Được thực hành chi tiết từng nội dung, thành phần và đối tượng
                cụ thể
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Có đủ kỹ năng về thiết kế, trình chiếu thông qua các bài thực
                hành
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Thực hành trực tiếp từng sản phẩm theo các video bài học
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Tự tin thuyết trình với side chuyên nghiệp
              </li>
              <li>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                Tự tin Thiết kế CV, inforgraphic, video marketing... và còn
                nhiểu hơn thế!
              </li>
            </ul>
          </div>

          <div class="d-inline-block float-end">
            <div class="lp-bc-price">
              <p class="">
                399,000<sup>đ</sup>
              </p>
              <p class="text-decoration-line-through">
                500,000<sup>đ</sup>
              </p>
              <p class="">OFF 20%</p>
              <a
                class="btn btn-danger"
                href="https://unica.vn/thiet-ke-trinh-chieu-powerpoint-2016-tu-a-z"
              >
                CHI TIẾT
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
