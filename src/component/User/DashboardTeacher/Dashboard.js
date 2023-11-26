import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Notification.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import background from "../../../assets/images/background_dashboard.jpg";

import { useNavigate } from "react-router-dom";

import axiosClient from "../../../api/axiosClient";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setId } from "../../../slices/idSlice";
import Pagination from "../../Others/Pagination";

const Dashboard = ({ course }) => {
  const dispatch = useDispatch();
  const [teacherData, setTeacherData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
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
        const teacherResponse = await axiosClient.get(`/users/${id}`);
        setTeacherData(teacherResponse.data);

        const courseResponse = await axiosClient.get(`/courses/user=${id}`);
        const filteredCourses = courseResponse.data.filter(
          (course) => course.isDeleted !== true
        );
        setCourses(filteredCourses);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
  if (!teacherData || loading) {
    return <div>Loading...</div>;
  }

  const { fullname } = teacherData;

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleCourseClick = (clickedCourseId) => {
    console.log("Clicked Course ID:", clickedCourseId);
    dispatch(setId(clickedCourseId));
    navigate("/user/course");
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div class="container-fluid pt-5 overlay">
          <img
            class="img-background"
            width="1555px"
            height="220px"
            style={{ marginTop: "80px" }}
            src={background}
            alt={fullname}
            loading="lazy"
          />
          <div class="row"></div>
          <br />
          <br />
          <br />

          <div class="d-inline-block text-black d-flex justify-content-center">
            <ul class="nav nav-tabs text-white mx-auto">
              <li class="nav-item">
                <a
                  class="nav-link active"
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
            <div class="card mb-4">
              <div class="card-header py-3">
                <h5 class="mb-0 d-inline-block">Khóa học của tôi</h5>
                <button
                  type="button"
                  class="btn btn-primary btn-sm me-1 mb-2 d-inline-block float-end"
                  data-mdb-toggle="tooltip"
                  title="Remove item"
                  onClick={() =>
                    handleNavigate("/teacher/course/new-course-process")
                  }
                >
                  <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
                </button>
              </div>
              <div class="card-body">
                {currentCourses.map((course, index) => (
                  <div key={course.Id} className="row">
                    {/* Course Image */}
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div className="bg-image hover-overlay hover-zoom ripple rounded">
                        <img
                          src={course.image}
                          className="image-course"
                          alt="Không có ảnh"
                          onClick={() => handleCourseClick(course.Id)}
                        />
                        <a href="#!">
                          <div className="mask background-color"></div>
                        </a>
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <p>
                        <strong>{course.title}</strong>
                      </p>
                      <p>Giảng viên: {fullname}</p>
                      <div className="d-flex">
                        {/* Edit Button */}
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1 mb-2"
                          data-mdb-toggle="tooltip"
                          title="Edit item"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </button>
                        {/* Trash Icon */}
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

                    {/* Course Prices */}
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
