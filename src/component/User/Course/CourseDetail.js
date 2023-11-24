import "../../../css/style.css";
import "../../../css/headers.css";
import Header from "../Header/Header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { faPlay } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import { useSelector } from "react-redux";
import { selectId } from "../../../slices/courseSlice";

const CourseDetail = () => {
  const id = useSelector(selectId);
  console.log("ID from Redux Store:", id);

  const [teacherData, setTeacherData] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [reviewData, setReviewData] = useState([]);


  const splitDescription = (description) =>
    description.split("**").map((part, index) => (
      <span key={index}>
        {part}
        {index < 2 && " - "}{" "}
      </span>
    ));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axiosClient.get(`/courses/${id}`);
        setCourseData(courseResponse.data);

        const reviewResponse = await axiosClient.get(`/reviews/course=${id}`);
        setReviewData(reviewResponse.data);

        const userId = courseResponse.data.userId;
        const teacherResponse = await axiosClient.get(`/users/${userId}`);
        setTeacherData(teacherResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!teacherData || !courseData || !reviewData) {
    return <div>Loading...</div>;
  }

  const { fullname, description: teacherDescription, avatar } = teacherData;
  const { title, description, createAt, updateAt } = courseData;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
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
                <h1 className="text-white">{title}</h1>
                <p className="text-white">
                  Ngày tạo khóa học : {formatDate(createAt)}
                </p>
                <p className="text-white">
                  Ngày cập nhật mới nhất : {formatDate(updateAt)}
                </p>
                <div className="d-inline-block">
                  <img
                    width="30"
                    height="30"
                    className="rounded-circle"
                    src={avatar}
                    alt="Đỗ Trung Thành"
                  />
                  <Link to="teacher/nguyen-hoang-khac-hieu">
                    {" "}
                    <span className="text-white">{fullname}</span>
                  </Link>
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
              <div className="container"></div>
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
              <p style={{ whiteSpace: "pre-line" }}>{description}</p>
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
                        src={avatar}
                        alt={title}
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
                      {splitDescription(teacherDescription)}
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
                  {reviewData.map((review) => (
                    <li key={review.Id} className="u-block-cmhv">
                      <div className="block-hv">
                        <div className="cm-hv">
                          <div className="rate-hv">
                            <p>Ngày bình luận: {formatDate(review.createAt)}</p>
                            <p>{review.content}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
