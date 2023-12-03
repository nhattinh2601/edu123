import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axiosClient from "../../../api/axiosClient";

export default function FeedBack() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title.trim() || !link.trim()) {
        setFormError("Vui lòng điền đầy đủ thông tin.");
        return;
      }
      const maxCharLimit = 255;
      if (title.length > maxCharLimit || link.length > maxCharLimit) {
        setFormError(`Tiêu đề và mô tả không được quá ${maxCharLimit} ký tự.`);
        return;
      }

      let imageUrl = "";

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadResponse = await axiosClient.post(
          "cloud/images/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = uploadResponse.data.data;
      }
      const encodedUserId = localStorage.getItem("userId");
      const userId = parseInt(atob(encodedUserId), 10);

      const response = await axiosClient.post("/feedbacks", {
        title: title,
        content: link,
        image: imageUrl,
        userId: userId,
      });

      setSuccessMessage("Đã báo cáo sự cố thành công");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading document:", error);
      setFormError("Đã xảy ra lỗi khi tải lên báo cáo");
      setTimeout(() => {
        setFormError("");
      }, 5000);
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
                <h2 className="card-title text-center mb-5 fw-bold ">
                  Báo cáo sự cố
                </h2>

                <div className="container">
                  <form onSubmit={handleSubmit}>
                    {formError && (
                      <div className="alert alert-danger" role="alert">
                        {formError}
                      </div>
                    )}

                    {successMessage && (
                      <div className="alert alert-success" role="alert">
                        {successMessage}
                      </div>
                    )}

                    {/* Nhập đường dẫn của tài liệu tham khảo */}
                    <div className="mb-3">
                      <label
                        htmlFor="documentLink"
                        className="form-label fw-bold"
                      >
                        Vấn đề cần báo cáo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="documentLink"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>

                    {/* Tiêu đề tài liệu */}
                    <div className="mb-3">
                      <label
                        htmlFor="documentTitle"
                        className="form-label fw-bold"
                      >
                        Cụ thể vấn đề
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="documentTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    {/* Tải hình ảnh lên */}
                    <div className="mb-3">
                      <label
                        htmlFor="uploadImage"
                        className="form-label fw-bold"
                      >
                        Tải hình ảnh minh chứng
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="uploadImage"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Tải lên
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
