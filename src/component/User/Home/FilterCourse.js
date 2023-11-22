import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { useParams } from "react-router-dom";
import CourseCard from "./CourseCard";

const FilterCourse = () => {
  const [searchCourses, setSearchCourses] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchSearchCourses = async () => {
      try {
        if (categoryId) {
          const response = await axiosClient.get(`/courses/searchCategory/${categoryId}`);
          setSearchCourses(response.data);
        } else {
          
          setSearchCourses([]);
        }
      } catch (error) {
        console.error("Error fetching search courses:", error);
      }
    };

    fetchSearchCourses();
  }, [categoryId]);

  return (
    <div className="container-fluid col-md-10">
      <div className="row">
        <div className="center_body">
          <br />
          <h3 className="fw-bold">Kết quả lọc được </h3>
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

export default FilterCourse;
