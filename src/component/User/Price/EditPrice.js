import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import EditCoursePanel from "../Panel/EditCoursePanel";// import the panel component

export default function EditPrice() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-9 col-lg-7 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h2 className="card-title text-center mb-5  fw-bold ">
                  Chỉnh sửa thông tin giá
                </h2>

                <div className="container">
                  <h2 className="my-4">Nhập thông tin giá</h2>
                  <form>
                    {/* Giá tiền */}
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label fw-bold">Giá tiền</label>
                      <input type="number" className="form-control" id="price" />
                    </div>

                    {/* Mã giảm giá */}
                    <div className="mb-3">
                      <label htmlFor="discountCode" className="form-label fw-bold">Mã giảm giá</label>
                      <input type="text" className="form-control" id="discountCode" />
                    </div>

                    {/* Giá khuyến mãi */}
                    <div className="mb-3">
                      <label htmlFor="discountPrice" className="form-label fw-bold">Giá khuyến mãi</label>
                      <input type="number" className="form-control" id="discountPrice" />
                    </div>

                    <button type="submit" className="btn btn-primary">Cập nhật</button>
                  </form>
                </div>

              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="card border-0 shadow rounded-3 my-5">
              <EditCoursePanel/> {/* panel component */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}