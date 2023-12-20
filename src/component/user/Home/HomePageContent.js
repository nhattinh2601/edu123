import React, { useEffect, useState } from "react";

import axiosClient from "../../../api/axiosClient";
import CourseCard from "./CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faBullhorn,
  faDesktop,
  faPencilRuler,
  faUserGraduate,
  faShoppingCart,
  faCogs,
  faLaptopCode,
  faHeartbeat,
  faLifeRing,
} from "@fortawesome/free-solid-svg-icons";
import imageteacher from "../../../assets/images/online-teacher.jpg";

import "./HomePageContent.css";
const HomePageCotent = () => {
  const [topNewCourses, setTopNewCourses] = useState([]);
  const [topSoldCourses, settopSoldCourses] = useState([]);
  const [topRatingCourses, settopRatingCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [isLoading1, setIsLoading1] = useState(false); 
  const [isLoading2, setIsLoading2] = useState(false); 

  useEffect(() => {
    const fetchTopNewCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(
          "/courses/get4CourseNewRelateInfo"
        );
        setTopNewCourses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching top new courses:", error);
      }
    };

    const fetchTopSoldCourses = async () => {
      try {
        setIsLoading1(true);
        const response = await axiosClient.get(
          "/courses/get4CourseSoldRelateInfo"
        );
        settopSoldCourses(response.data);
        setIsLoading1(false);
      } catch (error) {
        console.error("Error fetching top most courses:", error);
      }
    };

    const fetchTopRatingCourses = async () => {
      try {
        setIsLoading2(true);
        const response = await axiosClient.get(
          "/courses/get4CourseRatingRelateInfo"
        );
        settopRatingCourses(response.data);
        setIsLoading2(false);
      } catch (error) {
        console.error("Error fetching top most courses:", error);
      }
    };

    fetchTopNewCourses();
    fetchTopSoldCourses();
    fetchTopRatingCourses();
  }, []);

  return (
    <div className="container-fluid col-md-10">
      <div className="row">
        <div className="center_body">
          <br />
          <h3 className="fw-bold">Top khóa học bán chạy</h3>
          <br />
          <div className="row">
            {isLoading ? (
              <div>
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
                <div class="spinner-border text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
                <div class="spinner-border text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
              </div>
            ) : (
              <div></div>
            )}
            {topSoldCourses.map((course) => (
              <CourseCard key={course.Id} course={course} />
            ))}
          </div>

          <br />
          <h3 className="fw-bold">Top khóa học được đánh giá cao</h3>
          <br />
          <div className="row">
          {isLoading1 ? (
              <div>
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
                <div class="spinner-border text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
                <div class="spinner-border text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
              </div>
            ) : (
              <div></div>
            )}
            {topRatingCourses.map((course) => (
              <CourseCard key={course.Id} course={course} />
            ))}
          </div>

          <br />
          <h3 className="fw-bold">Khóa học mới ra mắt</h3>
          <br />
          <div className="row">
          {isLoading2 ? (
              <div>
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
                <div class="spinner-border text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
                <div class="spinner-border text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> &nbsp;
              </div>
            ) : (
              <div></div>
            )}
            {topNewCourses.map((course) => (
              <CourseCard key={course.Id} course={course} />
            ))}
          </div>

          <br />
          <div className="text-center">
            <h3 className="fw-bold mb-0" style={{ marginBottom: "0px" }}>
              Bạn chưa tìm thấy khóa học mình quan tâm?
            </h3>
            <br />
            <h3 className="fw-bold" style={{ marginTop: "-15px" }}>
              Edu123 có hơn hàng trăm khóa học chờ bạn khám phá
            </h3>
          </div>
          <br />
          <div className="row align-items-center justify-content-center">
            <div
              className="card pt-0 pr-0 mx-3 p-0 d-flex align-items-center justify-content-center"
              style={{
                width: "12rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faLanguage}
                size="2x"
                style={{ opacity: 0.5, padding: "5px" }}
              />
              <div>Ngoại ngữ</div>
            </div>

            <div
              className="card pt-0 pr-0 mx-3 p-0 d-flex align-items-center justify-content-center"
              style={{
                width: "12rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faBullhorn}
                size="2x"
                style={{ opacity: 0.5, padding: "5px" }}
              />
              <div>Marketing</div>
            </div>

            <div
              className="card pt-0 pr-0 mx-3 p-0 d-flex align-items-center justify-content-center"
              style={{
                width: "12rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faDesktop}
                size="2x"
                style={{ opacity: 0.5, padding: "5px" }}
              />
              <div>Tin học văn phòng</div>
            </div>

            <div
              className="card pt-0 pr-0 mx-3 p-0 d-flex align-items-center justify-content-center"
              style={{
                width: "12rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faPencilRuler}
                size="2x"
                style={{ opacity: 0.5, padding: "5px" }}
              />
              <div>Thiết kế</div>
            </div>

            <div
              className="card pt-0 pr-0 mx-3 p-0 d-flex align-items-center justify-content-center"
              style={{
                width: "12rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faUserGraduate}
                size="2x"
                style={{ opacity: 0.5, padding: "5px" }}
              />
              <div>Phát triển bản thân</div>
            </div>
          </div>
          <br />
          <div className="row align-items-center justify-content-center">
            <div
              className="card pt-0 pr-0 mx-3 p-0 d-flex align-items-center justify-content-center"
              style={{
                width: "12rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                size="2x"
                style={{ opacity: 0.5, padding: "5px" }}
              />
              <div>Sales,Bán hàng</div>
            </div>

            <div
              className="card pt-0 pr-0 mx-3 p-0 d-flex align-items-center justify-content-center"
              style={{
                width: "12rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faCogs}
                size="2x"
                style={{ opacity: 0.5, padding: "5px" }}
              />
              <div>Cơ khí</div>
            </div>

            <div
              className="card pt-0 pr-0 mx-3 p-0 d-flex align-items-center justify-content-center"
              style={{
                width: "12rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faLaptopCode}
                size="2x"
                style={{ opacity: 0.5, padding: "5px" }}
              />
              <div>Công nghệ thông tin</div>
            </div>

            <div
              className="card pt-0 pr-0 mx-3 p-0 d-flex align-items-center justify-content-center"
              style={{
                width: "12rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faHeartbeat}
                size="2x"
                style={{ opacity: 0.5, padding: "5px" }}
              />
              <div>Sức khỏe</div>
            </div>

            <div
              className="card pt-0 pr-0 mx-3 p-0 d-flex align-items-center justify-content-center"
              style={{
                width: "12rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faLifeRing}
                size="2x"
                style={{ opacity: 0.5, padding: "5px" }}
              />
              <div>Phong cách sống</div>
            </div>
          </div>
          <br />
          <div className="row align-items-center justify-content-center">
            <div
              className="card d-flex flex-row align-items-center justify-content-center mx-3 p-0"
              style={{
                width: "50rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <img
                src={imageteacher}
                alt="Mô tả hình ảnh"
                style={{ width: "75%", height: "auto" }}
              />
              <div className="p-3 d-flex flex-column">
                <p>
                  Bạn muốn chia sẻ kiến thức mà mình có? Hãy đăng kí hợp tác với
                  chúng tôi ngay!
                </p>
                <button type="button" className="btn btn-primary mb-2">
                  Bắt đầu dạy học ngay hôm nay!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageCotent;
