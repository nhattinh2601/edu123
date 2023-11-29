import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCircleInfo, 
  faEdit, 
  faTrash, 
  faFile, 
  faLock, // icon for "Lock Account"
  faTimes, // icon for "Reject"
  faPaperPlane // icon for "Send Activation Code"
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

export default function PaymentConfirm() {
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
                  {/* List of documents */}
                  <div className="card mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 d-inline-block">Danh sách yêu cầu người dùng</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div>
                          <p className="float-lg-start"><strong>TruongMinhHieu@gmail + khoahoc01</strong></p>
                          <div className="float-end">
                            <button
                              className="btn btn-primary btn-sm margin-button-header"
                              onClick={() => handleNavigate("/admin/upgrade-to-teacher/detail")}
                            >
                              <FontAwesomeIcon icon={faPaperPlane} /> Gửi mã kích hoạt
                            </button>
                            <button
                              className="btn btn-primary btn-sm margin-button-header"
                              onClick={() => handleNavigate("/admin/upgrade-to-teacher/detail")}
                            >
                              <FontAwesomeIcon icon={faLock} /> Khóa tài khoản
                            </button>
                            <button
                              className="btn btn-primary btn-sm margin-button-header"
                              onClick={() => handleNavigate("/admin/upgrade-to-teacher/detail")}
                            >
                              <FontAwesomeIcon icon={faTimes} /> Từ chối
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="card border-0 shadow rounded-3 my-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}