import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import background from "../../../assets/images/background_header_chitietgv.jpg";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axiosClient from "../../../api/axiosClient";
import { useState, useEffect } from "react";
import TeacherDetailContent from "./TeacherDetailContent";
import { useSelector } from "react-redux";
import { selectId } from "../../../slices/idSlice";
function extractFirstPart(str) {
  return str.split("**")[0];
}

const TeacherDetail = ({ courseDatas }) => {
  const id = useSelector(selectId);
  console.log("ID from Redux Store:", id);
  const [teacherData, setTeacherData] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/users/${id}`, {});
        setTeacherData(response.data);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchData();
  }, []);

  if (!teacherData) {
    return <div>Loading...</div>;
  }

  const { fullname, avatar, description, phone} = teacherData;

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
              <span>6 </span> Khóa học
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
}

export default TeacherDetail;
