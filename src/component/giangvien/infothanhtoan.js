import "../../css/style.css";
import "../../css/headers.css";


import Header from "./../header/header-trang-chu";
import Footer from "./../footer/footer";

function App() {
  return (
    <div>
        <Header/>
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-9 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h2 className="card-title text-center mb-5  fw-bold ">
                Thông tin thanh toán{" "}
              </h2>
              <form action="/login" method="POST">
                

                <div className="form-outline mb-4">
                  <input
                    type="phone"
                    className="form-control"
                    placeholder="Ngân hàng"
                    name="password"
                    id="password"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="phone"
                    className="form-control"
                    placeholder="Số tài khoản"
                    name="password"
                    id="password"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="phone"
                    className="form-control"
                    placeholder="Họ và tên"
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

export default App;
