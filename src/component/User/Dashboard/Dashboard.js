import Header from "../Header/Header";
import Footer from "../Footer/Footer";


import background from "../../../assets/images/background_dashboard.jpg";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="container">
        <div class="container-fluid pt-5 overlay">
          <img
            class="img-background"
            width="1555px"
            height="220px"
            style={{ marginTop: "80px" }}
            src={background}
            alt="Đỗ Trung Thành"
            loading="lazy"
          />
          <div class="row"></div>
          <br/>
          <br/>
          <br/>
          
          <div class="d-inline-block text-black d-flex justify-content-center">
            <ul class="nav nav-tabs text-white mx-auto">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Active
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
          <br/>
          <br/>
          <br/>
          <div id="content" className="bg-light bg-gradient " style={{height:"400px", width:"1250px"}}>
            <div className="text-decoration-underline p-3 fw-bold ">
              Chào mừng bạn
            </div>
            <hr/>
          Chào mừng Nguyễn Nhật Tính đến với học viện Online Unica. Nơi bạn có thể học tập, rèn luyện các kỹ năng thông qua hơn 2.000 khóa học online được biên tập cẩn thận, chu đáo.

Bạn muốn tìm kiếm khóa học phù hợp? hãy cho chúng tôi biết nhu cầu và mong muốn của bạn nhé
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
