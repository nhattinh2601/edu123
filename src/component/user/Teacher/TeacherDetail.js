import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import background from "../../../assets/images/background_header_chitietgv.jpg";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axiosClient from "../../../api/axiosClient";
import { useState, useEffect } from "react";
import TeacherDetailContent from "./TeacherDetailContent";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Others/LoadingSpinner";

function extractFirstPart(str) {
  return str.split("**")[0];
}

const TeacherDetail = ({ courseDatas }) => {
  const { id } = useParams();
  const [teacherData, setTeacherData] = useState(null);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teacher data
        const [teacherResponse, courseCountResponse] = await Promise.all([
          axiosClient.get(`/users/${id}`),
          axiosClient.get(`courses/countByUsers/${id}`),
        ]);

        setTeacherData(teacherResponse.data);
        setCourseCount(courseCountResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!teacherData) {
    return <LoadingSpinner />;
  }

  const { fullname, avatar, description, phone } = teacherData;

  return (
    <div>
      <Header />
      <div className="container-fluid pt-5 overlay">
        <img
          className="img-background"
          width="1555px"
          height="350px"
          style={{ marginTop: "80px" }}
          src={background}
          alt={fullname}
          loading="lazy"
        />
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-6">
            <div className="u-teacher-avatar">
              <img
                className="rounded-circle"
                width="160px"
                height="160px"
                src={avatar}
                alt={fullname}
                loading="lazy"
              />
            </div>
            <div className="u-teacher-info">
              <h1 className="text-black fw-bold">{fullname}</h1>
              <span className="text-black fw-bold">
                {extractFirstPart(description)}
              </span>
              <div className="uti-link">
                <a
                  href={`https://zalo.me/${phone}`}
                  className="btn btn-light"
                  role="button"
                  aria-disabled="true"
                >
                  Liên hệ mình
                </a>
              </div>
            </div>
            <div className="d-inline-block text-black">
              <span>{courseCount} </span> Khóa học
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="d-inline-block text-black">
              <span>5 </span> <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>{" "}
              Đánh giá trung bình
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="d-inline-block text-black">
              <span>
                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> 14111 Học
                viên{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <TeacherDetailContent />

      <Footer />
    </div>
  );
};

export default TeacherDetail;
