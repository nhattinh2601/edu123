import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const formatPrice = (price) => {
  if (typeof price !== "string") {
    price = String(price);
  }

  if (price.startsWith("0")) {
    price = price.slice(1);
  }

  // Định dạng ngăn cách dấu chấm
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CourseCard = ({ course }) => {
  const formattedPrice = formatPrice(course.price);
  const formattedPromotionalPrice = formatPrice(course.promotional_price);

  return (
    <div
      className="card d-inline-block p-2 pt-3 mx-3"
      style={{ width: "18rem" }}
    >
      <img className="card-img-top" alt="..." src={course.image} />
      <div className="card-body">
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text">
          <p className="text-decoration-line-through">{formattedPrice} đ</p>
          <p className="card-text fw-bold">{formattedPromotionalPrice} đ</p>
        </p>
        <div className="d-inline-block">
          <span className="pt-2">
            {[...Array(course.rating)].map((_, index) => (
              <FontAwesomeIcon key={index} icon={faStar}></FontAwesomeIcon>
            ))}
          </span>
        </div>
        <Link to="#" className="btn btn-primary w-100">
          Thêm vào giỏ hàng
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
