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
  const [isLoading, setIsLoading] = useState(false); 
  const [notification, setNotification] = useState(null);

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
  //modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleShowConfirmModal = () => setShowConfirmModal(true);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  const handleShowAlertModal = (message) => {
    setAlertMessage(message);
    setShowAlertModal(true);
  };
  const handleCloseAlertModal = () => setShowAlertModal(false);

  const handleClick = () => {
    navigate(`/user/course/${course.course_id}`);
  };

  const handleAddToCart = async () => {
    try {
      const encodedUserId = localStorage.getItem("userId");
      const decodedUserId = atob(encodedUserId);
      try {
        const decodedUserId = atob(encodedUserId);
        setIsLoading(true);
      const response = await axiosClient.post("/carts/create", {
        userId: decodedUserId,
        courseId: course.course_id,
      });
      setIsLoading(false);
      setNotification({
        type: "success",
        message:
          "Thêm khóa học vào giỏ hàng thành công!",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      } catch (e) {
        if (typeof decodedUserId !== 'undefined') {
          handleShowAlertModal("Hàng đã được thêm vào giỏ hàng!");
          console.log('decodedUserId tồn tại và có giá trị:', decodedUserId);
        } else {
        handleShowAlertModal("Đăng nhập để thêm vào giỏ hàng!");
        console.log('decodedUserId không tồn tại hoặc giải mã không thành công');
        }
      }
      
      
    } catch (error) {
      console.error("Error adding course to cart:", error.message);
      handleShowAlertModal("Khóa học đã có trong giỏ hàng hoặc đã được đăng ký.");
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
            {isLoading ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div></div>
        )}
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
      <div
        className="modal"
        tabIndex="-1"
        style={{ display: showConfirmModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Xác nhận</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseConfirmModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Đã thêm khóa học và giỏ hàng. Bạn có muốn chuyển đến giỏ hàng
                không?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseConfirmModal}
              >
                Không
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleCloseConfirmModal();
                  navigate("/user/cart");
                }}
              >
                Có
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal"
        tabIndex="-1"
        style={{ display: showAlertModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Thông báo</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseAlertModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>{alertMessage}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCloseAlertModal}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
      {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
    </div>
  );
};

export default CourseCard;
