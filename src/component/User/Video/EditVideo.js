import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function EditVideo() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-9 col-lg-12 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <div className="container">
                  <h2 className="my-4">Chỉnh sửa thông tin video</h2>
                  <form>
                    {/* Tải video hoặc nhập link YouTube */}
                    <div className="mb-3">
                      <label
                        htmlFor="uploadVideo"
                        className="form-label fw-bold"
                      >
                        Tải video lên
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="uploadVideo"
                        accept="video/*"
                      />
                      <p className="mt-2">Hoặc nhập link YouTube ở đây:</p>
                      <input
                        type="text"
                        className="form-control"
                        id="youtubeLink"
                      />
                    </div>

                    {/* Tiêu đề video */}
                    <div className="mb-3">
                      <label
                        htmlFor="videoTitle"
                        className="form-label fw-bold"
                      >
                        Tiêu đề video
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="videoTitle"
                      />
                    </div>

                    {/* Mô tả ngắn */}
                    <div className="mb-3">
                      <label
                        htmlFor="shortDescription"
                        className="form-label fw-bold"
                      >
                        Mô tả ngắn
                      </label>
                      <textarea
                        className="form-control"
                        id="shortDescription"
                        rows="2"
                      ></textarea>
                    </div>

                    {/* Giới thiệu */}
                    <div className="mb-3">
                      <label
                        htmlFor="introduction"
                        className="form-label fw-bold"
                      >
                        Giới thiệu
                      </label>
                      <textarea
                        className="form-control"
                        id="introduction"
                        rows="4"
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Lưu lại
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
