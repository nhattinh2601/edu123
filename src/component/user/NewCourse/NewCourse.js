import React, { useState, useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function NewCourse() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [promotionalPrice, setPromotionalPrice] = useState(0);
  const encodedId = localStorage.getItem("userId");
  const userId = atob(encodedId);

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
    const newPromotionalPrice = parsedPrice * (1 - parsedDiscountCode / 100);
    setPromotionalPrice(newPromotionalPrice);
  }, [price, discountCode]);

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceInput = (e) => {
    const inputPrice = e.target.value.replace(/\D/g, "");
    setPrice(formatCurrency(inputPrice));
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

  const validateForm = () => {
    if (
      !document.getElementById("courseName").value ||
      !selectedCategory ||
      !selectedImage ||
      !document.getElementById("introduction").value ||
      !price ||
      !discountCode
    ) {
      setFormError("Vui lòng nhập đầy đủ thông tin cho tất cả các trường");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
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

      const promotionalPrice = parsedPrice * (1 - parsedDiscountCode / 100);

      const response = await axiosClient.post("/courses", {
        title: document.getElementById("courseName").value,
        price: parsedPrice,
        sold: parsedDiscountCode,
        promotional_price: promotionalPrice,
        description: document.getElementById("introduction").value,
        active: false,
        rating: 0,
        image: imageUrl,
        categoryId: parseInt(selectedCategory, 10),
        userId: userId,
      });

      setSuccessMessage("Khóa học đã được tạo thành công! Chờ Admin xét duyệt");

      console.log(response.data);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-9 col-lg-12 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h2 className="card-title text-center mb-5 fw-bold">
                  Tạo khóa học
                </h2>

                <div className="container">
                  <h2 className="my-4">Tạo thông tin khóa học</h2>
                  <form onSubmit={handleSubmit}>
                    {formError && (
                      <div className="alert alert-danger" role="alert">
                        {formError}
                      </div>
                    )}

                    {successMessage && ( // Display success message
                      <div className="alert alert-success" role="alert">
                        {successMessage}
                      </div>
                    )}

                    <div className="row">
                      <div className="col-6 mb-3">
                        <label
                          htmlFor="courseName"
                          className="form-label fw-bold"
                        >
                          Tên khóa học *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="courseName"
                        />
                      </div>

                      <div className="col-3 mb-3">
                        <label
                          htmlFor="category"
                          className="form-label fw-bold"
                        >
                          Chuyên mục *
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
                        className="form-control"
                        id="introduction"
                        rows="4"
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
                      Tạo khóa học
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
