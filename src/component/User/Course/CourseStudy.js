import "../../../css/style.css";
import "../../../css/headers.css";
import Header from "../Header/Header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { faPlay } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
import axiosClient from "../../../api/axiosClient";

import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Others/LoadingSpinner";

const CourseStudy = ({ courseDatas }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/user/infor-teacher/${Id}`);
  };

  const { id } = useParams();

  const [teacherData, setTeacherData] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [documentData, setDocumentData] = useState([]);

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

        const videoResponse = await axiosClient.get(`/videos/course=${id}`);
        setVideoData(videoResponse.data);
        const documentResponse = await axiosClient.get(
          `/documents/course=${id}`
        );
        setDocumentData(documentResponse.data);

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
    return <LoadingSpinner />;
  }

  const { Id, fullname, description: teacherDescription, avatar } = teacherData;
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
                  <Link
                    to={`/user/infor-teacher/${Id}`}
                    onClick={handleCourseClick}
                  >
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
              <h3 className="mb-4">Nội dung khóa học</h3>
              {videoData.map((video) => (
                <div key={video.Id} className="video-item mb-3">
                  <FontAwesomeIcon icon={faPlay} className="play-icon" />
                  <Link
                    to={`/user/course/watch-video/${video.Id}`}
                    className="video-link"
                  >
                    {video.title}
                  </Link>
                  <div className="duration float-right">{video.duration}</div>
                  <hr className="mt-2 mb-2" />
                </div>
              ))}
            </div>
            <br />
            <div className="bg-white" id="noidung">
              <h3 className="mb-4">Tài liệu tham khảo</h3>
              <div
                className="documents-container"
                style={{ display: "flex", flexDirection: "row" }}
              >
                {documentData.map((document) => (
                  <div key={document.Id} className="document-item">
                    <FontAwesomeIcon icon={faFile} className="file-icon" />
                    <div className="document-title">
                      {document.title}:{" "}
                      <Link to={document.file_path} className="file-path">
                        {document.file_path}
                      </Link>
                      <hr className="mt-2 mb-2" />
                    </div>
                  </div>
                ))}
              </div>
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
                    <p className="fw-bold">{fullname} </p>
                    <div className="pre">
                      {teacherDescription && (
                        <div className="pre">
                          {splitDescription(teacherDescription)}
                        </div>
                      )}
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

export default CourseStudy;
