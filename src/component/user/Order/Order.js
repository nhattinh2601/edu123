import "./Order.css";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../../../api/axiosClient";
import React, { useEffect, useState } from "react";

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Order() {
  const navigate = useNavigate();
  const { courseId, cartId, otp } = useParams();
  const [price, setPrice] = useState(0);
  const formatPrice = (price) => {
    if (typeof price !== "string") {
      price = String(price);
    }
    if (price == "0") {
      return "0 đồng";
    }
  
    if (price.startsWith("0")) {
      price = price.slice(1);
    }
  
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleDelete = async (itemId) => {
    try {
      await axiosClient.delete(`/carts/${itemId}`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axiosClient.get(`courses/${courseId}`);
        const userData = response.data.promotional_price;
        setPrice(formatPrice(userData));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const handlePayment = async () => {
    const encodedUserId = localStorage.getItem("userId");
    const userId = parseInt(atob(encodedUserId), 10);

    const confirmed = window.confirm("Bạn có chắc chắn đã chuyển khoản?");

    if (confirmed) {
      try {
        await axiosClient.post(
          `/courseRegisters/register-course/${userId}/${courseId}/${otp}`
        );
        handleDelete(cartId);
        window.location.href = "/user/order/thankyou";
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    } else {
      console.log("Payment cancelled by user");
    }
  };

  return (
    <div>
      <Header />
      <section class="h-100 gradient-custom">
        <div class="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="icon-size"
            ></FontAwesomeIcon>
            <h4 className="fw-bold justify-content-center d-flex p-4">
              Đặt hàng thành công!
            </h4>
            <p className="justify-content-center d-flex">
              Vui lòng chuyển khoản vào tài khoản sau đây!
            </p>
            <p>
              <span className="fw-bold">Tên tài khoản</span>: Công ty cổ phần
              đạo tạo trực tuyến EDU123
            </p>
            <p>
              <span className="fw-bold">Nội dung</span>: {otp}
            </p>
            <p>
              <span className="fw-bold">Số tiền</span>: {price} vnđ
            </p>
            <br />
            <br />
            <table className="table table-bordered">
              <tr>
                <th>Số tài khoản</th>
                <th>Ngân hàng</th>
                <th>Mã QR</th>
              </tr>
              <tr>
                <td>58110001417006</td>
                <td>BIDV</td>
                <td>QR...</td>
              </tr>
            </table>
          </div>
        </div>
      </section>
      <br />
      <br />
      <div className="justify-content-center d-flex">
        <button type="button" className="btn btn-info " onClick={handlePayment}>
          Tôi đã chuyển khoản
        </button>
      </div>
      <div className="justify-content-center d-flex">
        <button onClick={() => navigate("/")}>Xem thêm các khóa học</button>
      </div>
      <Footer />
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
    </div>
  );
}