import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function EditInformation() {
  return (
    <div>
        <Header/>
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-9 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h2 className="card-title text-center mb-5  fw-bold ">
                Chỉnh sửa thông tin giảng viên{" "}
              </h2>
              <form action="/login" method="POST">
                

                <div className="form-outline mb-4">
                  <input
                    type="phone"
                    className="form-control"
                    placeholder="Chức danh"
                    name="password"
                    id="password"
                  />
                </div>

                <div className="form-outline mb-4">
                  <textarea
                    type="phone"
                    className="form-control"
                    placeholder="Chủ đề muốn giảng dạy trên edu123"
                    name="password"
                    id="password"
                  />
                </div>

                <div className="form-outline mb-4">
                  <textarea
                    type="phone"
                    className="form-control"
                    placeholder="Kinh nghiệp giảng dạy"
                    name="password"
                    id="password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4 w-100 "
                >
                  Cập nhật 
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

