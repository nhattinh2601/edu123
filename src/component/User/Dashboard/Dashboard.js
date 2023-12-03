import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [registeredCourses, setRegisteredCourses] = useState([]);

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      try {
        const encodedUserId = localStorage.getItem("userId");
        const userId = parseInt(atob(encodedUserId), 10);
        
        const response = await axiosClient.get(`/courseRegisters/user/${userId}`); 
        const filteredCourses = response.data.filter(
          course => course.active === true && course.deleted !==true && course.isActive === true && course.isDeleted !== true
        );
  
        setRegisteredCourses(filteredCourses);
        
      } catch (error) {
        console.error("Error fetching registered courses:", error.message);
      }
    };

    fetchRegisteredCourses();
  }, []); 

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0 d-inline-block">Khóa học đã đăng ký</h5>
          </div>
          <div className="card-body">
            {registeredCourses.map((course, index) => (
              <React.Fragment key={course.courseId}>
                <div className="row">
                  <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <div className="bg-image hover-overlay hover-zoom ripple rounded">
                      <img
                        src={course.image}
                        className="image-course"
                        alt={course.title}
                      />
                      <a href="#!">
                        <div className="mask background-color"></div>
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    <p>
                      <strong>Khóa học: {course.title}</strong>
                    </p>
                    <p>Giảng viên: {course.name}</p>
                  </div>

                  <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <p className="text-start text-md-center text-decoration-line-through">
                      <button
                        className="btn btn-primary margin-button-header"
                        onClick={() => handleNavigate(`/user/course/study/${course.courseId}`)}
                      >
                        Vào học
                      </button>
                    </p>
                  </div>
                </div>
                {index < registeredCourses.length - 1 && <hr className="my-4" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
