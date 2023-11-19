import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../api/axiosClient";
import CourseCard from "./CourseCard";

const Header = () => {
  const [topNewCourses, setTopNewCourses] = useState([]);
  const [topMostCourses, setTopMostCourses] = useState([]);

  useEffect(() => {
    const fetchTopNewCourses = async () => {
      try {
        const response = await axiosClient.get("/courses/topNew");
        setTopNewCourses(response.data);
      } catch (error) {
        console.error("Error fetching top new courses:", error);
      }
    };

    const fetchTopMostCourses = async () => {
      try {
        const response = await axiosClient.get("/courses/topMost");
        setTopMostCourses(response.data);
      } catch (error) {
        console.error("Error fetching top most courses:", error);
      }
    };

    fetchTopNewCourses();
    fetchTopMostCourses();
  }, []);

  return (
    <div className="container-fluid col-md-10">
      <div className="row">
        <div className="center_body">
          <br />
          <h3 className="fw-bold">Top khóa học bán chạy</h3>
          <br />
          <div className="row">
            {topMostCourses.map((course) => (
              <CourseCard key={course.Id} course={course} />
            ))}
          </div>

          <br />
          <h3 className="fw-bold">Khóa học mới ra mắt</h3>
          <br />
          <div className="row">
            {topNewCourses.map((course) => (
              <CourseCard key={course.Id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
