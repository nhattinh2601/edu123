import "./Cart.css";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
      <Header />

      <section class="h-100 gradient-custom">
        <div class="container py-5">
          <div class="row d-flex justify-content-center my-4">
            <div class="col-md-8">
              <div class="card mb-4">
                <div class="card-header py-3">
                  <h5 class="mb-0">Giỏ hàng - 2 items</h5>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div
                        class="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                          class="image-course "
                          alt="Blue Jeans Jacket"
                        />
                        <a href="#!">
                          <div class="mask background-color"></div>
                        </a>
                      </div>
                    </div>

                    <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <p>
                        <strong>Bí kíp nắm vững React trong vòng 2 tuần</strong>
                      </p>
                      <p>Giảng viên: Đỗ Trung Thành</p>
                      <button
                        type="button"
                        class="btn btn-primary btn-sm me-1 mb-2"
                        data-mdb-toggle="tooltip"
                        title="Remove item"
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </button>
                    </div>

                    <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <p class="text-start text-md-center text-decoration-line-through">
                        <strong>$20.99</strong>
                      </p>
                      <p class="text-start text-md-center">
                        <strong>$17.99</strong>
                      </p>
                    </div>
                  </div>

                  <hr class="my-4" />

                  <div class="row">
                    <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div
                        class="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
                          class="image-course"
                        />
                        <a href="#!">
                          <div class="mask background-color"></div>
                        </a>
                      </div>
                    </div>

                    <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <p>
                        <strong>Bí kíp nắm vững React trong vòng 2 tuần</strong>
                      </p>
                      <p>Giảng viên: Đỗ Trung Thành</p>

                      <button
                        type="button"
                        class="btn btn-primary btn-sm me-1 mb-2"
                        data-mdb-toggle="tooltip"
                        title="Remove item"
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </button>
                    </div>

                    <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <p class="text-start text-md-center text-decoration-line-through">
                        <strong>$20.99</strong>
                      </p>
                      <p class="text-start text-md-center">
                        <strong>$17.99</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card mb-4 mb-lg-0">
                <div class="card-body">
                  <p>
                    <strong>We accept</strong>
                  </p>
                  <img
                    class="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <img
                    class="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <img
                    class="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                  <img
                    class="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                    alt="PayPal acceptance mark"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card mb-4">
                <div class="card-header py-3">
                  <h5 class="mb-0">Thanh toán</h5>
                </div>
                <div class="card-body">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>$53.98</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center px-0"></li>
                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Tổng số tiền</strong>
                        <strong>
                          <p class="mb-0">(bao gồm VAT)</p>
                        </strong>
                      </div>
                      <span>
                        <strong>$53.98</strong>
                      </span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                    onClick={navigate("/user/order")}
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
