import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { useParams } from "react-router-dom";
import CourseCard from "../Course/CourseCard";
import "./Category.css";
import Pagination from "../../Others/Pagination"; 

const FilterCourse = () => {
  const [searchCourses, setSearchCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { categoryId } = useParams();

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 8;
  const offset = currentPage * itemsPerPage;

  const currentCourses = searchCourses.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    const fetchSearchCourses = async () => {
      try {
        if (categoryId) {
          const response = await axiosClient.get(
            `/courses/searchCategory/${categoryId}`
          );

          const filteredCourses = response.data.filter(
            (course) => course.isDeleted !== true && course.active === true
          );

          setSearchCourses(filteredCourses);
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
    <div className="container-fluid col-md-6 ">
      <div className="row">
        <div className="center_body margin-left">
          <div className="row ">
            {currentCourses.map((course) => (
              <CourseCard key={course.Id} course={course} />
            ))}
          </div>
          <Pagination
            pageCount={Math.ceil(searchCourses.length / itemsPerPage)}
            handlePageClick={handlePageClick}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterCourse;
