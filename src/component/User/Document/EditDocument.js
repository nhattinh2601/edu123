import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faFile } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

import EditCoursePanel from "../Panel/EditCoursePanel";

export default function EditDocument() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-9 col-lg-7 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">

              <div className="container">
                  {/* List of documents */}
                  <div className="card mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 d-inline-block">Tài liệu đã tải lên</h5>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleNavigate("/teacher/course/upload-document")}
                      >
                        <FontAwesomeIcon icon={faPlus} /> Thêm tài liệu
                      </button>
                      
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                          <div
                            className="bg-image hover-overlay hover-zoom ripple rounded"
                            data-mdb-ripple-color="light"
                          >
                            {/* Replace with actual document thumbnail */}
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                              className="image-course"
                              alt="Document Thumbnail"
                            />
                          </div>
                        </div>

                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <p><strong>Tiêu đề tài liệu</strong></p>
                              <p>Giảng viên: Tên giảng viên</p>
                            </div>

                            <div className="float-end">
                              <button
                                className="btn btn-primary btn-sm margin-button-header"
                                onClick={() => handleNavigate("/teacher/course/edit-document-detail")}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button
                                className="btn btn-danger btn-sm margin-button-header"
                                onClick={() => handleNavigate('documentId')}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                          {/* Additional space if needed */}
                        </div>
                      </div>
                      {/* Additional documents */}
                    </div>
                  </div>
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
      <Footer />
    </div>
  );
}