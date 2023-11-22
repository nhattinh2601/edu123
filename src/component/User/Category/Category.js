import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import "./Category.css";
import axiosClient from "../../../api/axiosClient";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import FilterCourse from "./FilterCourse.js";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  //const { title } = useLocation().pathname;
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
      <div className="container width-90">
        <div className="col-md-3 ">
          <nav>
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
                      <div >
                        <Link
                          to={`/searchCategory/${category.Id}`}
                          className="dropdown-toggle parent-category"
                        >
                          <FontAwesomeIcon icon={faLanguage} />
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
                                subcategory.parentCategoryId === category.Id
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
                                  <FontAwesomeIcon icon={faDesktop} />
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
        </div>
        
          <FilterCourse className="center_body"/>


        <br />
      </div>
      <Footer />
    </div>
  );
}
