import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faClock,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../Others/LoadingSpinner";
import Pagination from "../../Others/Pagination";

const CourseList = ({ courseDatas }) => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/user/course/${courseId}`);
  };
  const { id } = useParams();
  console.log("A:", id);

  const [teacherData, setTeacherData] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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
        const [teacherResponse, courseResponse] = await Promise.all([
          axiosClient.get(`/users/${id}`),
          axiosClient.get(`/courses/user=${id}`),
        ]);
        setTeacherData(teacherResponse.data);
        setCourseData(courseResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!teacherData || !courseData) {
    return <LoadingSpinner />;
  }

  const { fullname, description: teacherDescription } = teacherData;
  const description1 = splitDescription(teacherDescription);

  return (
    <div className="center_body ">
      <div className="bg-light bg-gradient" id="infogiangvien">
        <h3>Giới thiệu</h3>
        <div className="container">
          <div className="row">
            <div className="pre">
              {fullname} - {description1}
            </div>
          </div>
        </div>
      </div>
      <br />
      <h3>Khóa học của giảng viên {fullname}</h3>
      <br />
      <br />
      <div className="bg-light bg-gradient" id="noidung">
        {courseData.slice(startIndex, endIndex).map((course) => (
          <div
            key={course.Id}
            className="p-2 mb-4 border border-primary rounded"
          >
            <div className="d-inline-block float-start p-2">
              <Link to="/">
                <img
                  className="img-responsive card-course-img"
                  src={course.image}
                  alt={course.title}
                  loading="lazy"
                />
              </Link>
            </div>

            <div className="d-inline-block card-course-text">
              <p>
                <Link
                  to="/"
                  className="link-offset-2 link-underline link-underline-opacity-0 text-black fw-bold"
                >
                  {course.title}
                </Link>
              </p>
              <ul className="mini-des">
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
                  {course.description}
                </li>
              </ul>
            </div>

            <div className="d-inline-block float-end">
              <div className="lp-bc-price">
                <p className="">
                  {course.promotional_price}
                  <sup>đ</sup>
                </p>
                <p className="text-decoration-line-through">
                  {course.price}
                  <sup>đ</sup>
                </p>
                <p className="">SALE {course.sold}%</p>

                <Link
                  to={`/user/course/${course.Id}`}
                  className="btn btn-danger"
                  onClick={() => handleCourseClick(course.Id)}
                >
                  CHI TIẾT
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        pageCount={Math.ceil(courseData.length / itemsPerPage)}
        handlePageClick={handlePageClick}
      />
    </div>
  );
};
export default CourseList;
