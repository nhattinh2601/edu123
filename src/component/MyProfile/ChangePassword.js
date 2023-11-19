import "../../css/style.css";
import "../../css/headers.css";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-10 fw-bold text-decoration-underline">
                Đổi mật khẩu{" "}
              </h5>
              <form action="/login" method="POST">
                <div className="form-outline mb-4">
                  <label className="form-label fw-bold" for="form2Example1">
                    Mật khẩu cũ
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="on"
                    className="form-control"
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label fw-bold" for="form2Example1">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label fw-bold" for="form2Example1">
                    Nhập lại mật khẩu mới
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4 w-50 "
                >
                  Cập nhật
                </button>
                <button
                  type="submit"
                  className="btn btn-light btn-block mb-4 w-50 "
                >
                  Hồ sơ cá nhân
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
