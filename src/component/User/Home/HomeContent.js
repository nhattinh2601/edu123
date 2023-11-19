import { useNavigate } from "react-router-dom";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import facebookcourse from "../../../assets/images/facebookcourse.jpg"; 


export default function HomeContent() {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
  <div className="container-fluid col-md-10 ">
      <div className="row">
        <div className="center_body">
          <br />
          <h3 className="fw-bold">Top khóa học bán chạy</h3>
          <br />
          <div className=" row ">
            <div
              class="card d-inline-block p-2 pt-3 mx-3"
              style={{ width: "17rem" }}
            >
              <img class="card-img-top" alt="..." src={facebookcourse} />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  <p className="text-decoration-line-through">1.000.000 đ</p>
                  <p className="card-text fw-bold">799.000 đ</p>
                </p>
                <div className="d-inline-block">
                  <span className="pt-2">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </span>
                </div>
                <a href="#" className="btn btn-primary w-100">
                  Thêm vào giỏ hàng
                </a>
              </div>
            </div>
            <div
              class="card d-inline-block p-2 pt-3 mx-3"
              style={{ width: "17rem" }}
            >
              <img class="card-img-top" alt="..." src={facebookcourse} />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  <p className="text-decoration-line-through">1.000.000 đ</p>
                  <p className="card-text fw-bold">799.000 đ</p>
                </p>
                <div className="d-inline-block">
                  <span className="pt-2">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </span>
                </div>
                <a href="#" className="btn btn-primary w-100">
                  Thêm vào giỏ hàng
                </a>
              </div>
            </div>
            <div
              class="card d-inline-block p-2 pt-3 mx-3"
              style={{ width: "17rem" }}
            >
              <img class="card-img-top" alt="..." src={facebookcourse} />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  <p className="text-decoration-line-through">1.000.000 đ</p>
                  <p className="card-text fw-bold">799.000 đ</p>
                </p>
                <div className="d-inline-block">
                  <span className="pt-2">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </span>
                </div>
                <a href="#" className="btn btn-primary w-100">
                  Thêm vào giỏ hàng
                </a>
              </div>
            </div>
            <div
              class="card d-inline-block p-2 pt-3 mx-3"
              style={{ width: "17rem" }}
            >
              <img class="card-img-top" alt="..." src={facebookcourse} />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  <p className="text-decoration-line-through">1.000.000 đ</p>
                  <p className="card-text fw-bold">799.000 đ</p>
                </p>
                <div className="d-inline-block">
                  <span className="pt-2">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </span>
                </div>
                <a href="#" className="btn btn-primary w-100">
                  Thêm vào giỏ hàng
                </a>
              </div>
            </div>
          </div>

          <br />
          <h3 className="fw-bold">Khóa học mới ra mắt</h3>
          <br />
          <div className=" row ">
            <div
              class="card d-inline-block p-2 pt-3 mx-3"
              style={{ width: "17rem" }}
            >
              <img class="card-img-top" alt="..." src={facebookcourse} />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  <p className="text-decoration-line-through">1.000.000 đ</p>
                  <p className="card-text fw-bold">799.000 đ</p>
                </p>
                <div className="d-inline-block">
                  <span className="pt-2">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </span>
                </div>
                <a href="#" className="btn btn-primary w-100">
                  Thêm vào giỏ hàng
                </a>
              </div>
            </div>
            <div
              class="card d-inline-block p-2 pt-3 mx-3"
              style={{ width: "17rem" }}
            >
              <img class="card-img-top" alt="..." src={facebookcourse} />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  <p className="text-decoration-line-through">1.000.000 đ</p>
                  <p className="card-text fw-bold">799.000 đ</p>
                </p>
                <div className="d-inline-block">
                  <span className="pt-2">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </span>
                </div>
                <a href="#" className="btn btn-primary w-100">
                  Thêm vào giỏ hàng
                </a>
              </div>
            </div>
            <div
              class="card d-inline-block p-2 pt-3 mx-3"
              style={{ width: "17rem" }}
            >
              <img class="card-img-top" alt="..." src={facebookcourse} />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  <p className="text-decoration-line-through">1.000.000 đ</p>
                  <p className="card-text fw-bold">799.000 đ</p>
                </p>
                <div className="d-inline-block">
                  <span className="pt-2">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </span>
                </div>
                <a href="#" className="btn btn-primary w-100">
                  Thêm vào giỏ hàng
                </a>
              </div>
            </div>
            <div
              class="card d-inline-block p-2 pt-3 mx-3"
              style={{ width: "17rem" }}
            >
              <img class="card-img-top" alt="..." src={facebookcourse} />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  <p className="text-decoration-line-through">1.000.000 đ</p>
                  <p className="card-text fw-bold">799.000 đ</p>
                </p>
                <div className="d-inline-block">
                  <span className="pt-2">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </span>
                </div>
                <a href="#" className="btn btn-primary w-100">
                  Thêm vào giỏ hàng
                </a>
              </div>
            </div>
          </div>  

        </div>
      </div>
    </div>
    </div>
  );
}


