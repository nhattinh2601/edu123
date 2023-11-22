import "../../../assets/css/style.css";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlay,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../../../assets/images/August252017100pm_do-trung-thanh_thumb.jpg";

import Header from "../Header/Header";

function App() {
 
  const textpre = {
    "white-space": "pre-line",
  };
  return (
    <div>
      <Header />
      <div data-bs-spy="scroll" data-bs-target="#goTop">
        <div id="topbar" style={{ background: "#0B3955" }}>
          <div className="container-fluid pt-5 ">
            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-6 ">
                <h1 className="text-white">Khóa học python</h1>
                <p className="text-white">
                  Kỹ năng giao tiếp thông minh sẽ "Bật mí" những bí mật về giao
                  tiếp cực hiệu quả để bạn biết cách giao tiếp dễ dàng, biết
                  lắng nghe và nhanh chóng nắm bắt được vấn đề ngay từ lần trò
                  chuyện đầu tiên. Giúp bạn nắm được những cách giao tiếp và ứng
                  xử thông minh, hiệu quả trong mọi tình huống
                </p>
                <div className="d-inline-block">
                  <img
                    width="30"
                    height="30"
                    className="rounded-circle"
                    src={avatar}
                    alt="Đỗ Trung Thành"
                  />
                  <a href="teacher/nguyen-hoang-khac-hieu">
                    {" "}
                    <span className="text-white">Nguyễn Nhật Tính</span>
                  </a>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="d-inline-block text-white">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <span>248 </span>Đánh giá
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="d-inline-block text-white">
                  <span>
                    <i className="fa fa-users" aria-hidden="true"></i> 14111 Học
                    viên{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5 ">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-6 ">
            <div className="bg-light bg-gradient card shadow mb-3">
              <h3>Bạn sẽ học được gì</h3>
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                      <span className="title-learn">
                        Làm chủ phần mềm Word 2016 nhanh chóng và chi tiết nhất
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                      <span className="title-learn">
                        Có thể áp dụng ngay vào công việc và học tập thi cử
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                      <span className="title-learn">
                        Nắm được các bước xây dựng, soạn thảo văn bản và chỉnh
                        sửa hợp lý và nhanh chóng, đúng quy trình.
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                      <span className="title-learn">
                        Biết cách thiết kế, thiết lập văn bản, chỉnh sửa, bảo
                        mật văn bản word dể ứng dụng vào hợp đồng, báo cáo, các
                        tài liệu văn phòng, chứng từ cụ thể,...
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                      <span className="title-learn">
                        Được trau dồi kiến thức nâng cao ứng dụng vào công việc
                        thêm tối ưu và hiệu quả
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                      <span className="title-learn">
                        Tự tin nâng cao trình độ để thi chứng chỉ tin học văn
                        phòng
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="bg-light bg-gradient navbar navbar-expand card shadow mb-3 ">
              <div className="container-fluid ">
                <ul className="navbar-nav ms-5">
                  <li className="nav-item fw-bold ">
                    <a className="nav-link text-link" href="#gioithieu">
                      {" "}
                      Giới thiệu
                    </a>
                  </li>
                  <li className="nav-item fw-bold">
                    <a className="nav-link text-link" href="#noidung">
                      Nội dung khóa học
                    </a>
                  </li>
                  <li className="nav-item fw-bold">
                    <a className="nav-link text-link" href="#infogiangvien">
                      Thông tin giảng viên
                    </a>
                  </li>
                  <li className="nav-item fw-bold">
                    <a className="nav-link text-link" href="#danhgia">
                      Đánh giá
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <br />
            <div className="bg-light bg-gradient  card shadow mb-3 ">
              <h3>Giới thiệu khóa học</h3>
              <hr />
              <p style={{ whiteSpace: "pre-line" }}>
                Microsoft Word đã trở nên vô cùng quen thuộc với tất cả mọi
                người, đặc biệt là đối với dân văn phòng và bất cứ công việc nào
                cần phải soạn thảo văn bản. Phát hành lần đầu tiên năm 1983, đến
                nay Word đã được cập nhật rất nhiều tính năng và công cụ thông
                minh mới, hỗ trợ ngày càng đắc lực cho người soạn thảo văn bản
                có được những bản word tốt nhất. Cũng bởi có rất nhiều tính năng
                được cập nhật trong Microsoft Word mà không ít người vì đã quen
                sử dụng phiên bản cũ đã không bắt kịp tốc độ cập nhật của Word,
                dẫn đến khó khăn trong quá trình làm việc với công cụ soạn thảo
                này. Ngoài ra đối với những người mới tiếp xúc đến Word như sinh
                viên cũng sẽ khó mà ngay lập tức sử dụng tốt và thành thạo công
                cụ Word nếu không có một lộ trình học word cơ bản phù hợp và chi
                tiết. Đó là lý do khóa học "Làm chủ Word 2016 từ cơ bản đến nâng
                cao" được ra đời! Khóa học Làm chủ Word 2016 từ cơ bản đến nâng
                cao của giảng viên Đỗ Trung Thành phù hợp với tất cả các đối
                tượng, đặc biệt dành cho các bạn có nhu cầu học tin học văn
                phòng đặc biệt về Word từ những bước đi đầu tiên; những bạn cần
                nâng cao trình độ về công cụ tin học văn phòng; hay chuẩn bị thi
                các loại chứng chỉ tin học… Khóa học gồm hơn 40 bài giảng bằng
                video, được xây dựng theo lộ trình từ cơ bản đến nâng cao về
                Word với phiên bản mới nhất hiện tại (Office 2016), với đầy đủ
                các nội dung: - Cách định dạng văn bản - Cách chèn và định dạng
                các đối tượng - Các thiết lập cho văn bản Với quan điểm "Học đi
                đôi với hành", trong từng nội dung của bài học sẽ có phần thực
                hành trực tiếp để học viên có thể hiểu và làm theo các hướng dẫn
                chi tiết của giảng viên. Đặc biệt khi sở hữu khóa học trực tuyến
                tại Unica bạn sẽ nhận được những ưu đãi vô cùng đặc biệt chỉ có
                tại đây: + Mua một lần học MÃI MÃI + Không giới hạn thời gian
                học tập + Được hỗ trợ 24/7 từ đội ngũ chuyên viên nhiệt tình
                chuyên nghiệp + Cấp chứng nhận hoàn thành khóa học sau khi học
                xong tất cả Đừng bỏ lỡ cơ hội sở hữu khóa học "Làm chủ Word 2016
                từ cơ bản đến nâng cao" cùng với hàng loạt những ưu đãi lớn!
              </p>
            </div>

            <br />

            <div className="bg-white" id="noidung">
              <h3>Nội dung khóa học</h3>
              <h5>Phần 1:Giới thiệu tổng quan và các thiết lập ban đầu</h5>
              <ul className="no-dots-list">
                <li>
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                  <a href="">
                    {" "}
                    &nbsp; Bài 1: Giới thiệu và các thiết lập cơ bản{" "}
                  </a>
                  <div className="d-inline-block float-right">
                    08:05&nbsp;&nbsp;
                  </div>
                  <hr />
                </li>
                <li>
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                  <a href="">
                    {" "}
                    &nbsp;Bài 2: Tạo mới, mở và lưu trữ file văn bản{" "}
                  </a>
                  <div className="d-inline-block float-right">
                    06:58&nbsp;&nbsp;
                  </div>
                  <hr />
                </li>
                <li>
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                  <a href="">
                    {" "}
                    &nbsp; Bài 3: Hướng dẫn tập gõ nhanh văn bản bằng 10 ngón{" "}
                  </a>
                  <div className="d-inline-block float-right">
                    06:58&nbsp;&nbsp;
                  </div>
                  <hr />
                </li>
                <li>
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                  <a href=""> &nbsp; Bài 4: Sao chép, cắt, dán văn bản </a>
                  <div className="d-inline-block float-right">
                    06:58&nbsp;&nbsp;
                  </div>
                  <hr />
                </li>
              </ul>

              <h5>Phần 2:Định dạng văn bản</h5>
              <ul className="no-dots-list">
                <li>
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                  <a href="">
                    {" "}
                    &nbsp; Bài 5: Giới thiệu và các thiết lập cơ bản{" "}
                  </a>
                  <div className="d-inline-block float-right">
                    08:05&nbsp;&nbsp;
                  </div>
                  <hr />
                </li>
                <li>
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                  <a href="">
                    {" "}
                    &nbsp;Bài 6: Tạo mới, mở và lưu trữ file văn bản{" "}
                  </a>
                  <div className="d-inline-block float-right">
                    06:58&nbsp;&nbsp;
                  </div>
                  <hr />
                </li>
                <li>
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                  <a href="">
                    {" "}
                    &nbsp; Bài 7: Hướng dẫn tập gõ nhanh văn bản bằng 10 ngón{" "}
                  </a>
                  <div className="d-inline-block float-right">
                    06:58&nbsp;&nbsp;
                  </div>
                  <hr />
                </li>
                <li>
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                  <a href=""> &nbsp; Bài 8: Sao chép, cắt, dán văn bản </a>
                  <div className="d-inline-block float-right">
                    06:58&nbsp;&nbsp;
                  </div>
                  <hr />
                </li>
              </ul>
            </div>

            <div className="bg-white" id="infogiangvien">
              <h3>Thông tin giảng viên</h3>

              <div className="container">
                <div className="row">
                  <div className="col-sm-3">
                    <div>
                      <img
                        className="lazy"
                        src="/uploads/thaoptt09@gmail.com/August252017100pm_do-trung-thanh_thumb.jpg"
                        align=""
                        loading="lazy"
                      />
                    </div>
                    <div className="uct-rate-gv">
                      <ul>
                        <li>
                          <i className="fa fa-users" aria-hidden="true"></i>
                          <span>8896</span> Học viên
                        </li>
                        <li>
                          <i
                            className="fa fa-play-circle"
                            aria-hidden="true"
                          ></i>{" "}
                          <span>6</span> Khóa học
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-sm-8">
                    <p className="fw-bold">Đỗ Trung Thành </p>
                    <div className="pre">
                      Giảng viên Trường Cao đẳng Sư phạm Yên Bái, Thạc sỹ Khoa
                      học Máy tính Đỗ Trung Thành - Giảng viên Trường Cao đẳng
                      Sư phạm Yên Bái Trình độ: Thạc sỹ Khoa học Máy tính Đạt
                      giải nhì Hội thi sáng tạo kỹ thuật tỉnh Yên Bái (năm 2016)
                      Đạt giải nhì Cuộc thi Thiết kế bài giảng e-Learning Quốc
                      gia lần thứ 4 (2017). Nhiều năm đạt giáo viên dạy giỏi cấp
                      tỉnh, có học sinh giỏi cấp quốc gia Đỗ Trung Thành với
                      kinh nghiệm 20 năm tham gia công tác giảng dạy. Tham gia
                      nhiều dự án xây dựng website, phần mềm. Có kinh nghiệm
                      giảng dạy Tin học Văn phòng; thiết kế đồ họa; biên tập âm
                      thanh; biên tập videos; lập trình thiết kế, xây dựng
                      website, xây dựng phần mềm với các ngôn ngữ C# và PHP
                    </div>
                    <div>
                      <a
                        className="see-more-info-btn"
                        href="javascript:void(0)"
                      >
                        Xem thêm
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />

            <div className="bg-white" id="danhgia">
              <h3>Đánh giá của học viên</h3>
              <div className="u-rate-hv" id="u-rate-hv">
                <div className="urh-left">
                  <div className="number-big-rate">5</div>
                  <div className="star-big-rate">
                    <span className="star-rate">
                      <i className="fa fa-star co-or" aria-hidden="true"></i>
                      <i className="fa fa-star co-or" aria-hidden="true"></i>
                      <i className="fa fa-star co-or" aria-hidden="true"></i>
                      <i className="fa fa-star co-or" aria-hidden="true"></i>
                      <i
                        className="fa fa-star co-or"
                        aria-hidden="true"
                      ></i>{" "}
                    </span>
                  </div>
                  <div className="count-rate">49 Đánh giá</div>
                </div>
                <div className="urh-right">
                  <div className="u-rate-f1">
                    <div className="u-rate-f1-progress">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-success"
                          role="progressbar"
                          aria-valuenow="86"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: "86%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="u-rate-f1-star">
                      <span className="star-rate">
                        <i className="fa fa-star co-or"></i>
                        <i className="fa fa-star co-or"></i>
                        <i className="fa fa-star co-or"></i>
                        <i className="fa fa-star co-or"></i>
                        <i className="fa fa-star co-or"></i>{" "}
                      </span>
                    </div>
                    <div className="u-rate-f1-num">
                      <p>86%</p>
                    </div>
                  </div>
                  <div className="u-rate-f1">
                    <div className="u-rate-f1-progress">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-success"
                          role="progressbar"
                          aria-valuenow="5"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: "5%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="u-rate-f1-star">
                      <span className="star-rate">
                        <i className="fa fa-star co-or"></i>
                        <i className="fa fa-star co-or"></i>
                        <i className="fa fa-star co-or"></i>
                        <i className="fa fa-star co-or"></i>{" "}
                        <i className="fa fa-star-o co-or"></i>{" "}
                      </span>
                    </div>
                    <div className="u-rate-f1-num">
                      <p>5%</p>
                    </div>
                  </div>
                  <div className="u-rate-f1">
                    <div className="u-rate-f1-progress">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-success"
                          role="progressbar"
                          aria-valuenow="2"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: "2%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="u-rate-f1-star">
                      <span className="star-rate">
                        <i className="fa fa-star co-or"></i>
                        <i className="fa fa-star co-or"></i>
                        <i className="fa fa-star co-or"></i>{" "}
                        <i className="fa fa-star-o co-or"></i>
                        <i className="fa fa-star-o co-or"></i>{" "}
                      </span>
                    </div>
                    <div className="u-rate-f1-num">
                      <p>2%</p>
                    </div>
                  </div>
                  <div className="u-rate-f1">
                    <div className="u-rate-f1-progress">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-success"
                          role="progressbar"
                          aria-valuenow="5"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: "5%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="u-rate-f1-star">
                      <span className="star-rate">
                        <i className="fa fa-star co-or"></i>
                        <i className="fa fa-star co-or"></i>{" "}
                        <i className="fa fa-star-o co-or"></i>
                        <i className="fa fa-star-o co-or"></i>
                        <i className="fa fa-star-o co-or"></i>{" "}
                      </span>
                    </div>
                    <div className="u-rate-f1-num">
                      <p>5%</p>
                    </div>
                  </div>
                  <div className="u-rate-f1">
                    <div className="u-rate-f1-progress">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-success"
                          role="progressbar"
                          aria-valuenow="2"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: "2%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="u-rate-f1-star">
                      <span className="star-rate">
                        <i className="fa fa-star co-or"></i>{" "}
                        <i className="fa fa-star-o co-or"></i>
                        <i className="fa fa-star-o co-or"></i>
                        <i className="fa fa-star-o co-or"></i>
                        <i className="fa fa-star-o co-or"></i>{" "}
                      </span>
                    </div>
                    <div className="u-rate-f1-num">
                      <p>2%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <div className="bg-white">
              <h3>Nhận xét của học viên</h3>
              <div>
                <ul className="load_comment">
                  <li className="u-block-cmhv">
                    <div className="ava-hv">C</div>
                    <div className="block-hv">
                      <div className="block-inner user-rate-detail">
                        <span className="star-rate-detail">
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>{" "}
                        </span>
                        <div className="name-hv">Đỗ Thị Cúc</div>
                      </div>
                      <div className="cm-hv">
                        <div className="rate-hv">
                          <p>
                            Khóa học rất tốt, giảng viên giảng bài dễ hiểu và
                            nhiệt tình hỗ trợ học viên.
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="u-block-cmhv">
                    <div className="ava-hv">C</div>
                    <div className="block-hv">
                      <div className="block-inner user-rate-detail">
                        <span
                          className="star-rate-detail"
                          style={{ paddingTop: "3px" }}
                        >
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>{" "}
                        </span>
                        <div className="name-hv">Vi văn cường</div>
                      </div>
                      <div className="cm-hv">
                        <div className="rate-hv">
                          <p>
                            Rất hay và hữu ích ạ mong chương trình mỗi ngày một
                            phát triển hơn
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="u-block-cmhv">
                    <div className="ava-hv">K</div>
                    <div className="block-hv">
                      <div className="block-inner user-rate-detail">
                        <span style={{ paddingTop: "3px" }}>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>{" "}
                        </span>
                        <div className="name-hv">Nguyễn Hoàng Kim</div>
                      </div>
                      <div className="cm-hv">
                        <div className="rate-hv">
                          <p>
                            Khóa hoc chất lượng cao, bổ ích và đầy đủ thông tin
                            cần cho người học
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="u-block-cmhv">
                    <div className="ava-hv">H</div>
                    <div className="block-hv">
                      <div className="block-inner user-rate-detail">
                        <span style={{ paddingTop: "3px" }}>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>
                          <i
                            className="fa fa-star co-or"
                            aria-hidden="true"
                          ></i>{" "}
                        </span>
                        <div className="name-hv">Nguyễn Thị Thu Hà</div>
                      </div>
                      <div className="cm-hv">
                        <div className="rate-hv">
                          <p>thầy dậy rễ hiểu, chi tiết ạ</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
