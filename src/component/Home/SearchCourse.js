import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import CourseCard from "./CourseCard";

const SearchCourse = () => {
  const [searchCourses, setSearchCourses] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    const fetchSearchCourses = async () => {
      try {
        const response = await axiosClient.get(`/courses/search/${title}`);
        setSearchCourses(response.data);
      } catch (error) {
        console.error("Error fetching search courses:", error);
      }
    };

    if (title) {
      fetchSearchCourses();
    } else {
     
    }
  }, [title]);

  return (
    <div className="container-fluid col-md-10">
      <div className="row">
        <div className="center_body">
          <br />
          <h3 className="fw-bold">Kết quả tìm được</h3>
          <br />
          <div className="row">
            {searchCourses.map((course) => (
              <CourseCard key={course.Id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCourse;
