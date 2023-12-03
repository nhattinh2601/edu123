import React, { useEffect, useState, useRef } from "react";

import { Link, useParams } from "react-router-dom";
import "./Category.css";
import axiosClient from "../../../api/axiosClient";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import CourseCard from "../Home/CourseCard";
import Pagination from "../../Others/Pagination";

export default function Category() {
  //
  const { categoryId } = useParams();
  console.log(categoryId);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    const fetchCurrentCourse = async () => {
      try {
        const response = await axiosClient.get(`/categories/${categoryId}`);
        setCurrentCourse(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchCurrentCourse();
  }, [categoryId]);

  // Filter Course Start

  const [searchCourses, setSearchCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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
            `/courses/sortCourseInCategory/${categoryId}/sort_by=`
          );
          const filteredCourses = response.data.filter(
            (course) => course.isDeleted !== true && course.active === true
          );
          setSearchCourses(filteredCourses);
        }
      } catch (error) {
        console.error("Error fetching search courses:", error);
      }
    };

    fetchSearchCourses();
  }, [categoryId]);

  const handleButtonClick = (sortName) => {
    fetchSearchCourses(sortName);
  };

  const fetchSearchCourses = async (sortName) => {
    try {
      let url = `/courses/sortCourseInCategory/${categoryId}/sort_by=${sortName}`;

      const response = await axiosClient.get(url);

      const filteredCourses = response.data.filter(
        (course) => course.isDeleted !== true && course.active === true
      );

      setSearchCourses(filteredCourses);
    } catch (error) {
      console.error("Error fetching search courses:", error);
    }
  };
  // Filter Course End

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSubcategoryVisible, setSubcategoryVisible] = useState(false);
  const [subcategoryPosition, setSubcategoryPosition] = useState({
    top: 0,
    left: 0,
  });
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [timer, setTimer] = useState(null);
  const initialTopPosition = useRef(null);

  useEffect(() => {
    const fetchTopLevelCategories = async () => {
      try {
        const response = await axiosClient.get("/categories", {
          params: {
            parentCategoryId: 0,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching top-level categories:", error);
      }
    };

    fetchTopLevelCategories();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (activeIndex + 1) % 3;
      setActiveIndex(nextIndex);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const fetchSubcategories = async (parentCategoryId) => {
    try {
      const response = await axiosClient.get(
        `/categories/${parentCategoryId}/features`
      );
      setSubcategories(response.data);
    } catch (error) {
      console.error(
        `Error fetching subcategories for parentCategoryId ${parentCategoryId}:`,
        error
      );
    }
  };

  const handleCategoryMouseEnter = (categoryId, event) => {
    if (timer) {
      clearTimeout(timer);
    }

    if (initialTopPosition.current === null) {
      // Calculate and store the initial top position
      initialTopPosition.current = event.currentTarget.offsetTop;
    }

    fetchSubcategories(categoryId);
    setSubcategoryVisible(true);
    setHoveredCategoryId(categoryId);

    // Adjusted the left property for subcategory container
    const subcategoryLeftPosition = event.currentTarget.offsetLeft + 215;

    setSubcategoryPosition({
      top: initialTopPosition.current,
      left: subcategoryLeftPosition,
    });

    const handleCategoryMouseLeave = (event) => {
      const isLeavingCategory =
        event.relatedTarget &&
        !event.relatedTarget.classList.contains("subcategory-item");

      if (isLeavingCategory) {
        const timeoutId = setTimeout(() => {
          setSubcategories([]);
          setSubcategoryVisible(false);
          setHoveredCategoryId(null);
        }, 300);

        setTimer(timeoutId);
      }
    };
  };
  return (
    <div className="container ">
      <Header />
      <div className="w-75 d-flex justify-content-between">
        <div className="card card-sm" style={{ zIndex: "3" }}>
          <div className="card-body p-0">
            <div className="d-flex justify-content-between p-0">
              <button
                className="btn btn-primary margin-button-header"
                onClick={toggleOpen}
              >
                Category
              </button>
              {isOpen && (
                <nav style={{ left: "100px" }}>
                  <ul>
                    {categories
                      .filter((category) => category.parentCategoryId === 0)
                      .map((category) => (
                        <li
                          key={category.Id}
                          className="category-item dropdown"
                          onMouseEnter={(event) =>
                            handleCategoryMouseEnter(category.Id, event)
                          }
                        >
                          {category.Id && (
                            <div>
                              <Link
                                to={`/searchCategory/${category.Id}`}
                                className="dropdown-toggle parent-category"
                              >
                                
                                &nbsp;{category.name}
                              </Link>
                              <ul
                                className={`dropdown-menu subcategory-list ${
                                  isSubcategoryVisible &&
                                  hoveredCategoryId === category.Id
                                    ? "show"
                                    : ""
                                }`}
                                style={{
                                  top: subcategoryPosition.top + "px",
                                  left: subcategoryPosition.left + "px",
                                }}
                              >
                                {subcategories
                                  .filter(
                                    (subcategory) =>
                                      subcategory.parentCategoryId ===
                                      category.Id
                                  )
                                  .map((subcategory) => (
                                    <li
                                      key={subcategory.Id}
                                      className="subcategory-item"
                                    >
                                      <Link
                                        to={`/searchCategory/${subcategory.Id}`}
                                        className="dropdown-item"
                                      >
                                        {" "}
                                        {subcategory.name}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                  </ul>
                </nav>
              )}
              <Link
                to
                onClick={() => handleButtonClick("learn-most")}
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginRight: "10px",
                  cursor: "default",
                }}
                className="p-2"
              >
                Học nhiều nhất
              </Link>
              <Link
                to
                onClick={() => handleButtonClick("rating")}
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginRight: "10px",
                  cursor: "default",
                }}
                className="p-2"
              >
                Đánh giá cao
              </Link>
              <Link
                to 
                onClick={() => handleButtonClick("new")}
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginRight: "10px",
                  cursor: "default",
                }}
                className="p-2"
              >
                Mới nhất
              </Link>
              <Link
                to 
                onClick={() => handleButtonClick("price-low")}
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginRight: "10px",
                  cursor: "default",
                }}
                className="p-2"
              >
                Giá thấp đến cao
              </Link>
              <Link
                to
                onClick={() => handleButtonClick("price-high")}
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginRight: "10px",
                  cursor: "default",
                }}
                className="p-2"
              >
                Giá cao đến thấp
              </Link>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div>
        <p className="fw-bold">
          Edu123 &#62; {currentCourse && currentCourse.name}
        </p>
      </div>
      <br />
      <div className="container width-90">
        <div className="container-fluid  ">
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
        <br />
      </div>
      <Footer />
    </div>
  );
}
