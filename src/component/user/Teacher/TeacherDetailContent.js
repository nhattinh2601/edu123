import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faChevronRight,
  faFilm,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../Others/LoadingSpinner";
import Pagination from "../../Others/Pagination";

// Function to format numbers with dot as a thousand separator
const formatNumberWithDot = (number) => {
  if (number === undefined || number === null) {
    return ""; // Return an empty string for undefined or null values
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CourseList = ({ courseDatas }) => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/user/course/${courseId}`);
  };

  const { id } = useParams();

  const [teacherData, setTeacherData] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [countData, setCountData] = useState([]);
  const [videoCountData, setVideoCountData] = useState([]);
  const [documentCountData, setDocumentCountData] = useState([]);
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
        const filteredCourseData = courseResponse.data.filter(course => !course.isDeleted);
    
        setCourseData(filteredCourseData);

        const countPromises = courseResponse.data.map(async (course) => {
          try {
            const [countResponse, videoCountResponse, documentCountResponse] =
              await Promise.all([
                axiosClient.get(
                  `/courseRegisters/course/${course.Id}/students/count`
                ),
                axiosClient.get(`/videos/countByCourse/${course.Id}`),
                axiosClient.get(`/documents/countByCourse/${course.Id}`),
              ]);

            return {
              count: countResponse.data,
              videoCount: videoCountResponse.data,
              documentCount: documentCountResponse.data,
            };
          } catch (countError) {
            console.error("Error fetching count data:", countError);
            return { count: 0, videoCount: 0, documentCount: 0 };
          }
        });

        const countDataResults = await Promise.all(countPromises);
        setCountData(countDataResults.map((data) => data.count));
        setVideoCountData(countDataResults.map((data) => data.videoCount));
        setDocumentCountData(
          countDataResults.map((data) => data.documentCount)
        );
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
    <div className="center_body">
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
        {courseData.slice(startIndex, endIndex).map((course, index) => (
          <div
            key={course.Id}
            className="p-2 mb-4 border border-primary rounded"
          >
            <div className="d-inline-block float-start p-2">
              <Link to={`/user/course/${course.Id}`}>
                <img
                  className="img-responsive card-course-img custom-img-size course-thumbnail"
                  src={course.image}
                  alt={course.title}
                  loading="lazy"
                  style={{ width: "120px", height: "120px" }}
                />
              </Link>
            </div>

            <div className="d-inline-block card-course-text">
              <p>
                <Link
                  to={`/user/course/${course.Id}`}
                  className="link-offset-2 link-underline link-underline-opacity-0 text-black fw-bold"
                >
                  {course.title}
                </Link>
              </p>
              <ul className="mini-des">
                <li>
                  <FontAwesomeIcon icon={faList}></FontAwesomeIcon>{" "}
                  {formatNumberWithDot(countData[index])} người đăng ký
                </li>
                <li>
                  <FontAwesomeIcon icon={faFilm}></FontAwesomeIcon>{" "}
                  {formatNumberWithDot(videoCountData[index])} video
                </li>
                <li>
                  <FontAwesomeIcon icon={faFileAlt}></FontAwesomeIcon>{" "}
                  {formatNumberWithDot(documentCountData[index])} tài liệu
                </li>
              </ul>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>{" "}
                  {course.description}
                </li>
              </ul>
            </div>

            <div className="d-inline-block float-end">
              <div className="lp-bc-price">
                <p className="text-decoration-line-through">
                  {formatNumberWithDot(course.price)} VNĐ
                </p>
                <p className="">
                  {formatNumberWithDot(course.promotional_price)} VNĐ
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
