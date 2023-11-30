import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faList,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function EditCoursePanel({ courseId }) {

  
  return (
    <div className="card-body">
      <h3 className="card-title">Panel</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <FontAwesomeIcon
            icon={faBook}
            style={{ color: "#999", fontSize: "20px", marginRight: "10px" }}
          />
          <Link
            to={`/teacher/course/edit-course/${courseId}`} 
            className="fw-bold text-decoration-none"
          >
            Thông tin cơ bản
          </Link>
        </li>

        <li className="list-group-item">
          <FontAwesomeIcon
            icon={faList}
            style={{ color: "#999", fontSize: "20px", marginRight: "10px" }}
          />
          <Link
            to={`/teacher/course/edit-lession/${courseId}`} 
            className="fw-bold text-decoration-none"
          >
            Danh sách bài học
          </Link>
        </li>
        <li className="list-group-item">
          <FontAwesomeIcon
            icon={faFile}
            style={{ color: "#999", fontSize: "20px", marginRight: "10px" }}
          />
          <Link
            to={`/teacher/course/edit-document/${courseId}`} 
            className="fw-bold text-decoration-none"
          >
            Tài liệu
          </Link>
        </li>
      </ul>
    </div>
  );
}