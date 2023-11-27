import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faEdit, faTrash, faFile } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";



export default function NotificationReject() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
      
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-9 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h2 className="card-title text-center mb-5  fw-bold ">
                  Lý do từ chối{" "}
                </h2>
                <form action="/login" method="POST">                  

                  <div className="form-outline mb-4">
                    <textarea
                      type="phone"
                      className="form-control"
                      placeholder="Lý do"
                      name="password"
                      id="password"
                    />
                  </div>
                  

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4 w-100 "
                  >
                    Gửi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  );
}