import { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const formatPrice = (price) => {
  if (typeof price !== "string") {
    price = String(price);
  }

  if (price.startsWith("0")) {
    price = price.slice(1);
  }

  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function Cart() {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái isLoading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedUserId = localStorage.getItem("userId");
        const userId = parseInt(atob(encodedUserId), 10);
        setIsLoading(true);

        const response = await axiosClient.get(`/carts/user/${userId}`);
        const allCartItems = response.data;

        // Filter out items with isDeleted set to true
        const filteredCartItems = allCartItems.filter(item => !item.isDeleted);

        setCartData(filteredCartItems);
        setIsLoading(false);

      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (itemId) => {
    try {
      const response = await axiosClient.delete(`/carts/${itemId}`);
      const encodedUserId = localStorage.getItem("userId");
        const userId = parseInt(atob(encodedUserId), 10);

        const response1 = await axiosClient.get(`/carts/user/${userId}`);
        const allCartItems = response1.data;

        // Filter out items with isDeleted set to true
        const filteredCartItems = allCartItems.filter(item => !item.isDeleted);

        setCartData(filteredCartItems);
      
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  function generateRandomNumber() {
    let output = "";
  
    // Tạo một vòng lặp để thêm 6 số ngẫu nhiên
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 10); // Tạo số từ 0 đến 9
      output += randomNumber.toString(); // Ghép vào chuỗi output
    }
  
    return output;
  }
 const handleCheckout = () => {
  if (cartData.length > 0) {
    const firstCartItem = cartData[0];
    if ('courseId' in firstCartItem) {
      const firstCourseId = firstCartItem.courseId;
      const cartId = firstCartItem.id;
      const otp = generateRandomNumber();
      navigate(`/user/order/${firstCourseId}/${cartId}/${otp}`);
    } else {
      console.error("First item in cart does not have a courseId.");
      
    }
  } else {
    console.log("Cart is empty");
    const isConfirmed = window.confirm(
      "Giỏ hàng không có khóa học! Vui lòng chọn khóa học trước khi thanh toán!"
    );

    if (!isConfirmed) {
      return;
    }
  }
};

  const totalAmount = cartData.reduce((acc, item) => acc + item.promotional_price, 0);

  return (
    <div>
      <Header />

      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Giỏ hàng</h5>
                </div>
                <div>
                {isLoading ? (
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <div></div>
              )}
                </div>
                {cartData.map((item) => (
                  <div key={item.courseId} className="card-body">
                    <div className="row">
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <Link to={`/user/course/${item.courseId}`}>
                          <img
                            src={item.image}
                            className="img-fluid rounded"
                            alt={item.teacher}
                          />
                          
                            <div className="mask background-color"></div>
                            </Link>
                        </div>
                      </div>

                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>Khóa học: {item.title}</strong>
                        </p>
                        <p>Giảng viên: {item.teacher}</p>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm me-1 mb-2"
                          data-mdb-toggle="tooltip"
                          title="Remove item"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </button>
                      </div>

                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <p className="text-start text-md-center text-decoration-line-through">
                          <strong>{formatPrice(item.price)} VNĐ</strong>
                        </p>
                        <p className="text-start text-md-center">
                          <strong>{formatPrice(item.promotional_price)} VNĐ</strong>
                        </p>
                      </div>
                    </div>

                    <hr className="my-4" />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Thanh toán</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Tiền khóa học
                      <span>{formatPrice(totalAmount)} VNĐ</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0"></li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Tổng số tiền</strong>
                        <strong>
                          <p className="mb-0">(bao gồm VAT)</p>
                        </strong>
                      </div>
                      <span>
                        <strong>{formatPrice(totalAmount)} VNĐ</strong>
                      </span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={handleCheckout}
                  >
                    Thanh toán ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
