import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import EditCoursePanel from "../Panel/EditCoursePanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { faPlay, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";

import { useDispatch, useSelector } from "react-redux";
import { setId, selectId } from "../../../slices/idSlice";

export default function EditLession() {
  const dispatch = useDispatch();

  const handleCourseClick = (clickedCourseId) => {
    console.log("Clicked Course ID:", clickedCourseId);
    dispatch(setId(clickedCourseId));
    navigate("/teacher/course/edit-video");
  };
  const id = useSelector(selectId);
  console.log("ID from Redux Store:", id);
  const [videoData, setVideoData] = useState([]);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

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
  }, []);

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
    return <div>Loading...</div>;
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
                  onClick={() => handleNavigate("/teacher/course/new-video")}
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
                        <button
                          className="btn btn-primary margin-button-header"
                          onClick={() => handleCourseClick(video.Id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
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
              <EditCoursePanel /> {/* panel component */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
