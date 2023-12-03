import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import "./CourseCard.css";

const formatPrice = (price) => {
  if (typeof price !== "string") {
    price = String(price);
  }

  if (price.startsWith("0")) {
    price = price.slice(1);
  }

  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const encodedUserId = localStorage.getItem("userId");
        const decodedUserId = parseInt(atob(encodedUserId), 10);

        const response = await axiosClient.get("/courseRegisters");
        const courseRegisters = response.data;

        const isCourseRegistered = courseRegisters.some((register) => {
          const userIdMatch = register.userId === decodedUserId;
          const courseIdMatch = register.courseId === course.course_id;

          return userIdMatch && courseIdMatch;
        });

        setIsRegistered(isCourseRegistered);
      } catch (error) {
        console.error("Error checking course registration:", error.message);
      }
    };

    checkRegistration();
  }, [course.course_id]);

  const handleButtonClick = () => {
    if (isRegistered) {
      navigate(`/user/course/study/${course.course_id}`);
    } else {
      handleAddToCart();
    }
  };

  const handleClick = () => {
    navigate(`/user/course/${course.course_id}`);
  };

  const handleAddToCart = async () => {
    try {
      const encodedUserId = localStorage.getItem("userId");
      const decodedUserId = atob(encodedUserId);

      const response = await axiosClient.post("/carts/create", {
        userId: decodedUserId,
        courseId: course.course_id,
      });

      console.log("Course added to cart:", response.data);
      const confirmed = window.confirm(
        "Đã thêm khóa học và giỏ hàng. Bạn có muốn chuyển đến giỏ hàng không?"
      );

      if (confirmed) {
        setTimeout(() => {
          navigate("/user/cart");
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding course to cart:", error.message);
      window.alert(
        "Khóa học đã có trong giỏ hàng hoặc khóa học đã được đăng kí"
      );
    }
  };


  const formattedPrice = formatPrice(course.price);
  const formattedPromotionalPrice = formatPrice(course.promotional_price);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="card pt-0 pr-0 mx-3 p-0 pe-0 mb-3"
      style={{ width: "17rem" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/user/course/${course.course_id}`}>
        <img
          className="card-img-top p-0 pe-0"
          alt="..."
          src={course.image}
          width={"100px"}
          height={"140px"}
        />
      </Link>
      <div className="card-body p-1 pe-1">
        <h6 className="card-title">{course.title}</h6>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p
              className="card-instructor"
              style={{ padding: "0", margin: "0" }}
            >
              {course.user_name}
            </p>
            <div
              className="course-rating"
              style={{ padding: "0", margin: "0" }}
            >
              {"⭐".repeat(Math.floor(course.rating))}
              <span>({course.rating})</span>
            </div>
          </div>

          <div className="card-text" style={{ textAlign: "right" }}>
            <p
              className="text-decoration-line-through"
              style={{ padding: "0", margin: "0" }}
            >
              {formattedPrice} đ
            </p>
            <p className="fw-bold" style={{ padding: "0", margin: "0" }}>
              {formattedPromotionalPrice} đ
            </p>
          </div>
        </div>

        {isHovered && (
          <div className="hovered-div">
            <h5>{course.title}</h5>
            <p>{course.description}</p>
            <button
          className={`btn ${
            isRegistered ? "btn-success" : "btn-primary"
          } w-100`}
          onClick={handleButtonClick}
        >
          {isRegistered ? "Vào học" : "Thêm vào giỏ hàng"}
        </button>
            <div class="triangle-border"></div>
            <div class="triangle"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
