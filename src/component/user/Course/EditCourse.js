import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import EditCoursePanel from "../Panel/EditCoursePanel";
import { useState, useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [promotionalPrice, setPromotionalPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneError, setDescriptionError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const checkCourseRegister = async () => {
      try {
        const userIdLocal = localStorage.getItem("userId");
        if (userIdLocal) {
          const userId = parseInt(atob(userIdLocal), 10);
          const response1 = await axiosClient.get(
            `/courses/check/${id}/${userId}`
          );

          if (response1.data === true) {
          } else {
            navigate("/user");
          }
        } else {
          navigate("/user");
        }
      } catch (error) {
        console.error("Error checking course register:", error);
      }
    };

    checkCourseRegister();
  }, [id, navigate]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axiosClient.get(`courses/${id}`);
        const courseData = response.data;

        setTitle(courseData.title);
        setDescription(courseData.description);
        setPrice(formatCurrency(courseData.price));
        setDiscountCode(formatCurrency(courseData.sold));
        setSelectedCategory(courseData.categoryId);

        const encodedId = localStorage.getItem("userId");
        const user = parseInt(atob(encodedId), 10);

        if (user !== courseData.userId) {
          navigate("/user");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [id, navigate]);

  useEffect(() => {
    axiosClient
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    const parsedPrice = parseFloat(price.replace(/\./g, ""));
    const parsedDiscountCode = parseFloat(discountCode);

    if (!isNaN(parsedPrice) && !isNaN(parsedDiscountCode)) {
      const newPromotionalPrice = parsedPrice * (1 - parsedDiscountCode / 100);
      setPromotionalPrice(newPromotionalPrice);
    }
  }, [price, discountCode]);

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceInput = (e) => {
    const inputPrice = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(inputPrice, 10);

    if (!isNaN(numericValue) && numericValue <= 100000000) {
      setPrice(formatCurrency(inputPrice));
    } else {
      setErrorMessage("Vui lòng số tiền dưới 100.000.000 VNĐ");
    }
  };

  const handleDiscountCodeInput = (e) => {
    const inputDiscountCode = e.target.value.replace(/\D/g, "");

    if (inputDiscountCode !== "") {
      const discountCodeValue = parseInt(inputDiscountCode, 10);
      if (
        !isNaN(discountCodeValue) &&
        discountCodeValue >= 0 &&
        discountCodeValue <= 100
      ) {
        setDiscountCode(discountCodeValue.toString());
      }
    } else {
      setDiscountCode("");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");
    setNameError(false);
    setDescriptionError(false);

    const trimInput = (value) => value.trim();

    if (!title || !description) {
      setNameError(!title);
      setDescriptionError(!description);
      setErrorMessage("Vui lòng nhập hết các trường.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      if (selectedImage) {
        formData.append("file", selectedImage);

        const uploadResponse = await axiosClient.post(
          "cloud/images/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = uploadResponse.data.data;

        const parsedPrice = parseFloat(price.replace(/\./g, ""));
        const parsedDiscountCode = parseFloat(discountCode);

        if (!isNaN(parsedPrice) && !isNaN(parsedDiscountCode)) {
          const promotionalPrice = parsedPrice * (1 - parsedDiscountCode / 100);

          const fieldsToUpdate = {
            title: trimInput(document.getElementById("courseName").value),
            price: parsedPrice,
            sold: parsedDiscountCode,
            promotional_price: promotionalPrice,
            description: trimInput(
              document.getElementById("introduction").value
            ),
            active: true,
            image: imageUrl,
            categoryId: parseInt(selectedCategory, 10),
          };

          const response = await axiosClient.patch(
            `/courses/${id}`,
            fieldsToUpdate
          );

          if (response.status === 200) {
            setSuccessMessage("Khóa học đã được cập nhật thành công");
          } else {
            setErrorMessage("Không thể cập nhật khóa học");
          }
        } else {
          setErrorMessage("Giá tiền hoặc mã giảm giá không hợp lệ.");
        }
      } else {
        const parsedPrice = parseFloat(price.replace(/\./g, ""));
        const parsedDiscountCode = parseFloat(discountCode);

        if (!isNaN(parsedPrice) && !isNaN(parsedDiscountCode)) {
          const promotionalPrice = parsedPrice * (1 - parsedDiscountCode / 100);

          const fieldsToUpdate = {
            title: trimInput(document.getElementById("courseName").value),
            price: parsedPrice,
            sold: parsedDiscountCode,
            promotional_price: promotionalPrice,
            description: trimInput(
              document.getElementById("introduction").value
            ),
            active: true,
            categoryId: parseInt(selectedCategory, 10),
          };

          const response = await axiosClient.patch(
            `/courses/${id}`,
            fieldsToUpdate
          );

          if (response.status === 200) {
            setSuccessMessage("Khóa học đã được cập nhật thành công");
          } else {
            setErrorMessage("Không thể cập nhật khóa học");
          }
        } else {
          setErrorMessage("Giá tiền hoặc mã giảm giá không hợp lệ.");
        }
      }
    } catch (uploadError) {
      console.error("Lỗi tải ảnh:", uploadError);
      setErrorMessage("Vui lòng kiểm tra lại");
    } finally {
      setLoading(false);
    }
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
                  <h2 className="my-4">Chỉnh sửa thông tin khóa học</h2>
                  {successMessage && (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  {loading && (
                      <div className="alert alert-info" role="alert">
                        Đang cập nhật, vui lòng đợi...
                      </div>
                    )}
                  <form onSubmit={handleFormSubmit}>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label
                          htmlFor="courseName"
                          className="form-label fw-bold"
                        >
                          Tên khóa học
                        </label>
                        <input
                          type="text"
                          id="courseName"
                          className={`form-control ${
                            nameError ? "is-invalid" : ""
                          }`}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div className="col-3 mb-3">
                        <label
                          htmlFor="category"
                          className="form-label fw-bold"
                        >
                          Chuyên mục
                        </label>
                        <select
                          className="form-select"
                          id="category"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="" disabled selected>
                            Chọn chuyên mục...
                          </option>
                          {categories.map((category) => (
                            <option key={category.Id} value={category.Id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-3 mb-3">
                        <label htmlFor="upload" className="form-label fw-bold">
                          Tải ảnh *
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="upload"
                          accept="image/png, image/jpeg, image/gif"
                          onChange={(e) => setSelectedImage(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="introduction"
                        className="form-label fw-bold"
                      >
                        Giới thiệu *
                      </label>
                      <textarea
                        id="introduction"
                        rows="4"
                        className={`form-control ${
                          nameError ? "is-invalid" : ""
                        }`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="price" className="form-label fw-bold">
                          Giá tiền *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="price"
                          value={price}
                          onInput={handlePriceInput}
                        />
                      </div>

                      <div className="col-6 mb-3">
                        <label
                          htmlFor="discountCode"
                          className="form-label fw-bold"
                        >
                          Mã giảm giá *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="discountCode"
                          value={discountCode}
                          onInput={handleDiscountCodeInput}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="promotionalPrice"
                        className="form-label fw-bold"
                      >
                        Giá khuyến mãi *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="promotionalPrice"
                        value={formatCurrency(promotionalPrice)}
                        readOnly
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      {loading ? "Đang tải..." : "Cập nhật khóa học"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="card border-0 shadow rounded-3 my-5">
              <EditCoursePanel courseId={id} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
