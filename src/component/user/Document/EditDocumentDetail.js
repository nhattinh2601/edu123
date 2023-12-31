import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import axiosClient from "../../../api/axiosClient";
import { useParams, useNavigate } from "react-router-dom";

export default function EditDocumentDetail() {
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [videoData, setVideoData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axiosClient.get(`documents/${id}`);
        const videoData = response.data;
        setVideoData(videoData);
        setTitle(videoData.title);
        setLink(videoData.file_path);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const checkCourseRegister = async () => {
      try {
        const userIdLocal = localStorage.getItem("userId");
        if (userIdLocal) {
          const userId = parseInt(atob(userIdLocal), 10);
          const response1 = await axiosClient.get(
            `/courses/check/${videoData.courseId}/${userId}`
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

    if (videoData) {
      checkCourseRegister();
    }
  }, [videoData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const trimInput = (value) => value.trim();

      if (!title.trim() || !link.trim()) {
        setFormError("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      const maxCharLimit = 255;
      if (title.length > maxCharLimit || link.length > maxCharLimit) {
        setFormError(
          `Đường link và tiêu đề ngắn không được quá ${maxCharLimit} ký tự.`
        );
        return;
      }

      const formData = new FormData();

      // Kiểm tra xem selectedFile có tồn tại không
      if (selectedFile) {
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

        const imageUrl = uploadResponse.data.data;

        const patchData = {
          file_path: trimInput(link),
          title: trimInput(title),
        };

        if (imageUrl !== null) {
          patchData.image = imageUrl;
        }

        const response = await axiosClient.patch(`/documents/${id}`, patchData);

        setSuccessMessage("Tài liệu đã được cập nhật thành công");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        console.log(response.data);
      } else {
        // Nếu không chọn ảnh, chỉ cập nhật các thông tin khác
        const response = await axiosClient.patch(`/documents/${id}`, {
          file_path: trimInput(link),
          title: trimInput(title),
        });

        setSuccessMessage("Tài liệu đã được cập nhật thành công");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error updating document:", error);
      setFormError("Đã xảy ra lỗi khi cập nhật ảnh");
      setTimeout(() => {
        setFormError("");
      }, 5000);
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
                <h2 className="card-title text-center mb-5 fw-bold ">
                  Tải lên tài liệu tham khảo
                </h2>

                <div className="container">
                  <h2 className="my-4">Nhập thông tin tài liệu</h2>
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

                    {loading && (
                      <div className="alert alert-info" role="alert">
                        Đang cập nhật, vui lòng đợi...
                      </div>
                    )}
                    {/* Nhập đường dẫn của tài liệu tham khảo */}
                    <div className="mb-3">
                      <label
                        htmlFor="documentLink"
                        className="form-label fw-bold"
                      >
                        Đường dẫn của tài liệu tham khảo
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
                        Tiêu đề tài liệu
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
                        Tải hình ảnh lên
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
                      {loading ? "Đang tải..." : "Cập nhật"}
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
