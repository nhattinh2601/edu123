import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAdd, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import background from "../../../assets/images/background_dashboard.jpg";

import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate();

    const handleNavigate = (path) => {
      navigate(path);
    };  

  return (
    <div>
      <Header />
      <div className="container">
        <div class="container-fluid pt-5 overlay">
          <img
            class="img-background"
            width="1555px"
            height="220px"
            style={{ marginTop: "80px" }}
            src={background}
            alt="Đỗ Trung Thành"
            loading="lazy"
          />
          <div class="row"></div>
          <br/>
          <br/>
          <br/>
          
          <div class="d-inline-block text-black d-flex justify-content-center">
            <ul class="nav nav-tabs text-white mx-auto">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/teacher/edit-info">
                  Chỉnh sửa thông tin giảng viên
                </a>
              </li>                           
            </ul>
          </div>


          <br/>
          <br/>
          <br/>


          <div id="content" className="bg-light bg-gradient col-md-10 center_body" >
          <div class="card mb-4">
                <div class="card-header py-3">
                  <h5 class="mb-0 d-inline-block">Khóa học của tôi</h5>
                  <button
                        type="button"
                        class="btn btn-primary btn-sm me-1 mb-2 d-inline-block float-end"
                        data-mdb-toggle="tooltip"
                        title="Remove item"
                        onClick={() => handleNavigate("/teacher/course/new-course-process")}
                      >
                        <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
                      </button>
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
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
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
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
