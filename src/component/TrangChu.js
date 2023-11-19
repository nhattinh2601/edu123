import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import Header from "./header/header-trang-chu";
import Footer from "./footer/footer";
import NoiDung from "./TrangChuNoiDung";
import slideshow1 from "../image/slideshow_1.jpg";
import slideshow2 from "../image/slideshow_2.jpg";
import slideshow3 from "../image/slideshow_3.jpg";

function Home() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchSubcategories = async (categoryId) => {
    console.log("categoryId before API call:", categoryId);
    try {
      const response = await axiosClient.get(
        `/categories/${categoryId}/features`
      );
      setSubcategories(response.data);
      setSelectedCategoryId(categoryId);
      setParentCategoryId(categoryId);
    } catch (error) {
      console.error(`Error fetching subcategories for ${categoryId}:`, error);
      console.log("Response data:", error.response.data);
    }
  };

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
    // Replace with the desired category ID or parentCategoryId
    fetchSubcategories(/* Replace with the desired category ID or parentCategoryId */);
  }, []); // Make sure to provide the necessary dependencies if needed

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (activeIndex + 1) % 3;
      setActiveIndex(nextIndex);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  return (
    <div>
      <Header />
      <div className="categories-col">
        <nav>
          <ul>
            {categories
              .filter((category) => category.parentCategoryId === 0)
              .map((category) => (
                <li key={category.id} className="category-item">
                  <Link to="#" onClick={() => fetchSubcategories(category.id)}>
                    <FontAwesomeIcon icon={faLanguage} />
                    &nbsp;{category.name}
                  </Link>
                  {selectedCategoryId === category.id && (
                    <ul className="subcategory-list">
                      {subcategories
                        .filter(
                          (subcategory) =>
                            subcategory.parentCategoryId === category.id
                        )
                        .map((subcategory) => (
                          <li key={subcategory.id}>
                            <Link
                              to="#"
                              onClick={() => fetchSubcategories(subcategory.id)}
                            >
                              <FontAwesomeIcon icon={faLanguage} />
                              &nbsp;{subcategory.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
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

      <NoiDung />
      <Footer />
    </div>
  );
}

export default Home;
