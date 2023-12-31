import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import HomePageContent from "./HomePageContent";
import slideshow1 from "../../../assets/images/slideshow_1.jpg";
import slideshow2 from "../../../assets/images/slideshow_2.jpg";
import slideshow3 from "../../../assets/images/slideshow_3.jpg";

import './Home.css';

function HomePage() {
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
    }, 3000);

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
  };

  const handleCategoryMouseLeave = (event) => {
    const isLeavingCategory =
      event.relatedTarget &&
      !event.relatedTarget.classList.contains("subcategory-item");

    if (isLeavingCategory) {
      const timeoutId = setTimeout(() => {
        setSubcategories([]);
        setSubcategoryVisible(false);
        setHoveredCategoryId(null);
      }, 100);

      setTimer(timeoutId);
    }
  };

  return (
    <div>
      <Header />
      <div className="categories-col body" onMouseLeave={handleCategoryMouseLeave}>
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
                    <div className="category-container">
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

      <div
        id="demo"
        className="carousel slide col-sm-6 slideshow_homepage carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to={index}
              className={activeIndex === index ? "active" : ""}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {[slideshow1, slideshow2, slideshow3].map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <img
                src={image}
                alt={`Slideshow ${index + 1}`}
                className="d-block w-100 image-slideshow"
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>      
      
      <HomePageContent />
      <Footer />
    </div>
  );
}

export default HomePage;
