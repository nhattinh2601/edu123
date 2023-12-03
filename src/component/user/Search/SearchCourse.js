import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { useParams } from "react-router-dom";
import CourseCard from "../Home/CourseCard";

import Pagination from "../../Others/Pagination"; 

const SearchCourse = () => {
  const [searchCourses, setSearchCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { title } = useParams();

  useEffect(() => {
    const fetchSearchCourses = async () => {
      try {
        const response = await axiosClient.get(`/courses/findCouseAndRelateInfoByTitle/${title}`);
        const filteredCourses = response.data.filter(
          (course) => course.isDeleted !== true && course.active === true
        );
        setSearchCourses(filteredCourses);
      } catch (error) {
        console.error("Error fetching search courses:", error);
      }
    };

    if (title) {
      fetchSearchCourses();
    }
  }, [title]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 8;
  const offset = currentPage * itemsPerPage;

  const currentCourses = searchCourses.slice(offset, offset + itemsPerPage);

  return (
    <div className="container-fluid col-md-10">
      <div className="row">
        <div className="center_body">
          <br />
          <h3 className="fw-bold">Kết quả tìm được</h3>
          <br />
          <div className="row">
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

export default SearchCourse;
