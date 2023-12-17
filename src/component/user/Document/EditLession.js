import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import EditCoursePanel from "../Panel/EditCoursePanel";
import LoadingSpinner from "../../Others/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";

import {
  faPlay,
  faTrash,
  faEdit,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";

export default function EditLession() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState([]);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const checkCourseRegister = async () => {
      try {
        const userIdLocal = localStorage.getItem("userId");
        if (userIdLocal) {
          const userId = parseInt(atob(userIdLocal), 10);
          const response1 = await axiosClient.get(
            `/courses/check/${id}/${userId}`
          );

          if (response1.data === true) {
          } else {
            navigate("/user");
          }
        } else {
          navigate("/user");
        }
      } catch (error) {
        console.error("Error checking course register:", error);
      }
    };

    checkCourseRegister();
  }, [id, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/videos/course=${id}`, {});

        const filteredCourses = response.data.filter(
          (course) => course.isDeleted !== true
        );

        // Sắp xếp theo thời gian created_at từ mới nhất đến cũ nhất
        const sortedCourses = filteredCourses.sort((a, b) => {
          const dateA = new Date(a.createAt);
          const dateB = new Date(b.createAt);
          return dateB - dateA;
        });
        setVideoData(sortedCourses);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteCourse = async (videoId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this course?"
      );

      if (!isConfirmed) {
        return;
      }

      const response = await axiosClient.delete(`/videos/${videoId}`);
      console.log(response.data);
      const updatedCourses = await axiosClient.get(`/videos/course=${id}`);
      const filteredCourses = updatedCourses.data.filter(
        (course) => course.isDeleted !== true
      );

      // Sắp xếp theo thời gian created_at từ mới nhất đến cũ nhất
      const sortedCourses = filteredCourses.sort((a, b) => {
        const dateA = new Date(a.createAt);
        const dateB = new Date(b.createAt);
        return dateB - dateA;
      });
      setVideoData(sortedCourses);
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

  if (!videoData) {
    return <LoadingSpinner />; ;
  }
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-9 col-lg-7 mx-auto">
            <div className="bg-white" id="noidung">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>Nội dung khóa học</h3>
                <button
                  className="btn btn-primary margin-button-header"
                  style={{ backgroundColor: "green" }}
                  onClick={() =>
                    handleNavigate(`/teacher/course/new-video/${id}`)
                  }
                >
                  Thêm Video
                </button>
              </div>
              {notification && (
                <div className={`notification ${notification.type}`}>
                  {notification.message}
                </div>
              )}
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tiêu đề</th>
                    <th>Mô tả</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {videoData.map((video) => (
                    <tr key={video.Id}>
                      <td>
                        <FontAwesomeIcon icon={faPlay} />
                      </td>
                      <td>{video.title}</td>
                      <td>{video.description}</td>{" "}
                      <td>
                        <button className="btn btn-primary margin-button-header">
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{ backgroundColor: "green" }}
                            onClick={() =>
                              handleNavigate(
                                `/user/course/watch-video/${video.Id}/${id}`
                              ) 
                            }
                          />
                        </button>
                        <button className="btn btn-primary margin-button-header">
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() =>
                              handleNavigate(
                                `/teacher/course/edit-video/${video.Id}`
                              ) 
                            }
                          />
                        </button>
                        <button
                          className="btn btn-primary margin-button-header"
                          style={{ backgroundColor: "red" }}
                          onClick={() => handleDeleteCourse(video.Id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="bg-white" id="panel">
              <EditCoursePanel courseId={id} /> {/* panel component */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
