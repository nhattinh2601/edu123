import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../api/axiosClient";
import Pagination from "../../Others/Pagination";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Notification.css";
import background from "../../../assets/images/background_dashboard.jpg";
import LoadingSpinner from "../../Others/LoadingSpinner";

const Dashboard = ({ course }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [videoCounts, setVideoCounts] = useState({});
  const [documentCounts, setDocumentCounts] = useState({});

  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;
  const currentCourses = courses.slice(offset, offset + itemsPerPage);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const encodedId = localStorage.getItem("userId");
  const id = atob(encodedId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const teacherResponse = await axiosClient.get(`/users/${id}`);
        // setTeacherData(teacherResponse.data);

        const courseResponse = await axiosClient.get(`/courses/user=${id}`);
        const filteredCourses = courseResponse.data.filter(
          (course) => course.isDeleted !== true
        );

        // Sắp xếp theo thời gian created_at từ mới nhất đến cũ nhất
        const sortedCourses = filteredCourses.sort((a, b) => {
          const dateA = new Date(a.createAt);
          const dateB = new Date(b.createAt);
          return dateB - dateA;
        });

        setCourses(sortedCourses);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchVideoCounts = async () => {
      try {
        const videoCountsData = {};
        for (const course of courses) {
          if (course && course.Id) {
            const videoCountResponse = await axiosClient.get(
              `/videos/countByCourse/${course.Id}`
            );
            videoCountsData[course.Id] = videoCountResponse.data;
          }
        }
        setVideoCounts(videoCountsData);
      } catch (error) {
        console.error("Error fetching video counts:", error);
      }
    };

    fetchVideoCounts();
  }, [courses]);

  useEffect(() => {
    const fetchDocumentCounts = async () => {
      try {
        const documentCountsData = {};
        for (const course of courses) {
          if (course && course.Id) {
            const documentCountResponse = await axiosClient.get(
              `/documents/countByCourse/${course.Id}`
            );
            documentCountsData[course.Id] = documentCountResponse.data;
          }
        }
        setDocumentCounts(documentCountsData);
      } catch (error) {
        console.error("Error fetching document counts:", error);
      }
    };

    fetchDocumentCounts();
  }, [courses]);

  const handleDeleteCourse = async (courseId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this course?"
      );

      if (!isConfirmed) {
        return;
      }

      const response = await axiosClient.delete(`/courses/${courseId}`);
      console.log(response.data);
      const updatedCourses = await axiosClient.get(`/courses/user=${id}`);
      setCourses(updatedCourses.data);
      setNotification({
        type: "success",
        message: "Course deleted successfully",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error("Error deleting course:", error);
      setNotification({ type: "error", message: "Error deleting course" });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/user/course/${courseId}`);
  };

  const handleEditCourseClick = (iid) => {
    console.log(iid); // Check the value in the console
    navigate(`/teacher/course/edit-course/${iid}`);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="container-fluid pt-5 overlay">
          <img
            className="img-background"
            width="1555px"
            height="220px"
            style={{ marginTop: "80px" }}
            src={background}
            alt="a"
            loading="lazy"
          />
          <div className="row"></div>
          <br />
          <br />
          <br />

          <div className="d-inline-block text-black d-flex justify-content-center">
            <ul className="nav nav-tabs text-white mx-auto">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/teacher/edit-info"
                >
                  Chỉnh sửa thông tin giảng viên
                </a>
              </li>
            </ul>
          </div>

          <br />
          <br />
          <br />
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          <div
            id="content"
            className="bg-light bg-gradient col-md-10 center_body"
          >
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0 d-inline-block">Khóa học của tôi</h5>
                <button
                  type="button"
                  className="btn btn-primary btn-sm me-1 mb-2 d-inline-block float-end"
                  data-mdb-toggle="tooltip"
                  title="Remove item"
                  onClick={() =>
                    handleNavigate("/teacher/course/new-course-process")
                  }
                >
                  <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
                </button>
              </div>
              <div className="card-body">
                {currentCourses.map((course, index) => (
                  <div key={course.Id} className="row">
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div className="card h-100 border-0">
                        <div className="position-relative overflow-hidden">
                          <img
                            src={course.image}
                            className="card-img-top image-course"
                            alt="Không có ảnh"
                            onClick={() => handleCourseClick(course.Id)}
                          />
                          <a href="#!">
                            <div className="mask background-color"></div>
                          </a>
                        </div>
                        <div className="card-body">
                          {/* Course details, title, description, etc., can be added here */}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <p>
                        <strong>{course.title}</strong>
                      </p>
                      {videoCounts[course.Id] !== undefined && (
                        <p>Số video: {videoCounts[course.Id]}</p>
                      )}
                      {documentCounts[course.Id] !== undefined && (
                        <p>Số tài liệu: {documentCounts[course.Id]}</p>
                      )}
                      <div className="d-flex">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1 mb-2"
                          data-mdb-toggle="tooltip"
                          title="Edit item"
                          onClick={() => handleEditCourseClick(course.Id)}
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm me-1 mb-2"
                          data-mdb-toggle="tooltip"
                          title="Remove item"
                          onClick={() => handleDeleteCourse(course.Id)}
                        >
                          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </button>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <p className="text-start text-md-center text-decoration-line-through">
                        <strong>{formatPrice(course.price)}</strong>
                      </p>
                      <p className="text-start text-md-center">
                        <strong>{formatPrice(course.promotional_price)}</strong>
                      </p>
                    </div>
                    {index < courses.length - 1 && (
                      <hr
                        className="my-4"
                        style={{ height: "2px", background: "#000" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Pagination
              pageCount={Math.ceil(courses.length / itemsPerPage)}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
