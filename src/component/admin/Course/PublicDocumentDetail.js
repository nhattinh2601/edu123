
import PublicCoursePanel from "./PublicCoursePanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";

import { faPlay, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";



export default function PublicDocumentDetail() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const lessons = [
    {
      id: 1,
      title: "Bài 1: Giới thiệu và các thiết lập cơ bản",
      duration: "08:05",
    },
    {
      id: 2,
      title: "Bài 2: Tạo mới, mở và lưu trữ file văn bản",
      duration: "06:58",
    },
    {
      id: 3,
      title: "Bài 3: Hướng dẫn tập gõ nhanh văn bản bằng 10 ngón",
      duration: "06:58",
    },
    { id: 4, title: "Bài 4: Sao chép, cắt, dán văn bản", duration: "06:58" },
    // Add more lessons as needed
  ];

  return (
    <div>
      
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-9 col-lg-7 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h2 className="card-title text-center mb-5  fw-bold ">
                  Tải lên tài liệu tham khảo
                </h2>

                <div className="container">
                  <h2 className="my-4">Nhập thông tin tài liệu</h2>
                  <form>
                    {/* Nhập đường dẫn của tài liệu tham khảo */}
                    <div className="mb-3">
                      <label htmlFor="documentLink" className="form-label fw-bold">Đường dẫn của tài liệu tham khảo</label>
                      <input type="text" className="form-control" id="documentLink" />
                    </div>

                    {/* Tiêu đề tài liệu */}
                    <div className="mb-3">
                      <label htmlFor="documentTitle" className="form-label fw-bold">Tiêu đề tài liệu</label>
                      <input type="text" className="form-control" id="documentTitle" />
                    </div>

                    {/* Tải hình ảnh lên */}
                    <div className="mb-3">
                      <label htmlFor="uploadImage" className="form-label fw-bold">Tải hình ảnh lên</label>
                      <input type="file" className="form-control" id="uploadImage" accept="image/*" />
                    </div>

                    
                  </form>
                </div>


              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="bg-white" id="panel">
              <PublicCoursePanel/> {/* panel component */}
            </div>
          </div>
        </div>
      </div>
 
    </div>
  );
}