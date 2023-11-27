
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faEdit, faTrash, faFile } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

import EditCoursePanel from "./PublicCoursePanel";

export default function CourseÌn() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-9 col-lg-7 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">

              <div className="container">
                <h2 className="my-4">Thông tin khóa học</h2>
                <form>
      <div className="row">
        {/* Tên khóa học */}
        <div className="col-6 mb-3">
          <label htmlFor="courseName" className="form-label fw-bold">Tên khóa học</label>
          <input type="text" className="form-control" id="courseName" />
        </div>

        {/* Chuyên mục */}
        <div className="col-3 mb-3">
          <label htmlFor="category" className="form-label fw-bold">Chuyên mục</label>
          <select className="form-select" id="category">
            <option selected>Chọn chuyên mục...</option>
            <option value="1">Chuyên mục 1</option>
            <option value="2">Chuyên mục 2</option>
            <option value="3">Chuyên mục 3</option>
          </select>
        </div>

        {/* Tải ảnh */}
        <div className="col-3 mb-3">
          <label htmlFor="upload" className="form-label fw-bold">Tải ảnh</label>
          <input type="file" className="form-control" id="upload" accept="image/png, image/jpeg, image/gif" />
        </div>
      </div>

      {/* Mô tả ngắn */}
      <div className="mb-3">
        <label htmlFor="shortDescription" className="form-label fw-bold">Mô tả ngắn</label>
        <textarea className="form-control" id="shortDescription" rows="2"></textarea>
      </div>
      
      {/* Giá tiền */}
      <div className="mb-3">
        <label htmlFor="shortDescription" className="form-label fw-bold">Giá đề nghị:</label>
        <input type="text" className="form-control" id="courseName" />
      </div>

      {/* Giới thiệu */}
      <div className="mb-3">
        <label htmlFor="introduction" className="form-label fw-bold">Giới thiệu</label>
        <textarea className="form-control" id="introduction" rows="4"></textarea>
      </div>

      {/* Lợi ích */}
      <div className="mb-3">
        <label htmlFor="benefits" className="form-label fw-bold">Lợi ích</label>
        <textarea className="form-control" id="benefits" rows="4"></textarea>
      </div>
      
    </form>
              </div>

            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="card border-0 shadow rounded-3 my-5">  
          <EditCoursePanel/>          
          </div>
        </div>
      </div>
    </div>    
  </div>
  );
}