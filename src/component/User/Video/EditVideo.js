import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axiosClient from "../../../api/axiosClient";
import { useParams } from "react-router-dom";

export default function NewVideo() {
  const [uploadMethod, setUploadMethod] = useState("file");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {id} = useParams();
  

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axiosClient.get(`videos/${id}`);
        const videoData = response.data;

        setVideoTitle(videoData.title);
        setShortDescription(videoData.description);
        if (uploadMethod === "youtube"){
          setYoutubeLink(videoData.video_filepath);
        }
       
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let videoUrl;
  
      if (uploadMethod === "file" && !selectedVideo) {
        setFormError("Vui lòng chọn video để tải lên.");
        return;
      }
  
      if (uploadMethod === "youtube") {
        // Check if youtubeLink is not empty
        if (!youtubeLink.trim()) {
          setFormError("Vui lòng nhập đường link YouTube.");
          return;
        }
  
        // Validate YouTube link
        const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        if (!youtubeRegex.test(youtubeLink)) {
          setFormError("Đường link YouTube không hợp lệ.");
          return;
        }
      }
  
      if (!videoTitle.trim() || !shortDescription.trim()) {
        setFormError("Vui lòng điền đầy đủ thông tin.");
        return;
      }
  
      // Check if the title and short description exceed the character limit
      const maxCharLimit = 255;
      if (videoTitle.length > maxCharLimit || shortDescription.length > maxCharLimit) {
        setFormError(`Tiêu đề và mô tả ngắn không được quá ${maxCharLimit} ký tự.`);
        return;
      }
  
      if (uploadMethod === "file") {
        const formData = new FormData();
        formData.append("file", selectedVideo);
  
        const uploadResponse = await axiosClient.post("cloud/videos/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        videoUrl = uploadResponse.data.data;
      } else {
        videoUrl = youtubeLink;
      }
  
      // Make sure to replace the URL with the correct resource path
      const response = await axiosClient.patch(`/videos/${id}`, {
        video_filepath: videoUrl,
        description: shortDescription,
        title: videoTitle,
      });
  
      setSuccessMessage("Video đã được cập nhật thành công");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      console.log(response.data);
    } catch (error) {
      console.error("Error creating course:", error);
      setFormError("Đã xảy ra lỗi khi tạo video");
      setTimeout(() => {
        setFormError("");
      }, 5000);
    }
  };
  

  const handleUploadMethodChange = (method) => {
    setUploadMethod(method);
  };

  const handleFileChange = (e) => {
    setSelectedVideo(e.target.files[0]);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-9 col-lg-12 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <div className="container">
                  <h2 className="my-4">Tạo video</h2>
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
                    {/* Choose upload method */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Chọn phương thức tải video:
                      </label>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="uploadFile"
                          name="uploadMethod"
                          className="form-check-input"
                          value="file"
                          checked={uploadMethod === "file"}
                          onChange={() => handleUploadMethodChange("file")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="uploadFile"
                        >
                          Tải video lên *
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="youtubeLink"
                          name="uploadMethod"
                          className="form-check-input"
                          value="youtube"
                          checked={uploadMethod === "youtube"}
                          onChange={() => handleUploadMethodChange("youtube")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="youtubeLink"
                        >
                          Nhập link YouTube (Bài giảng sẽ bị công khai cân nhắc trước khi chọn)
                        </label>
                      </div>
                    </div>

                    {/* Input based on the chosen method */}
                    {uploadMethod === "file" ? (
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
                          onChange={handleFileChange}
                        />
                      </div>
                    ) : (
                      <div className="mb-3">
                        <label
                          htmlFor="youtubeLink"
                          className="form-label fw-bold"
                        >
                          Nhập link YouTube *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="youtubeLink"
                          value={youtubeLink}
                          onChange={(e) => setYoutubeLink(e.target.value)}
                        />
                      </div>
                    )}

                    {/* Tiêu đề video */}
                    <div className="mb-3">
                      <label
                        htmlFor="videoTitle"
                        className="form-label fw-bold"
                      >
                        Tiêu đề video *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="videoTitle"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                      />
                    </div>

                    {/* Mô tả ngắn */}
                    <div className="mb-3">
                      <label
                        htmlFor="shortDescription"
                        className="form-label fw-bold"
                      >
                        Mô tả *
                      </label>
                      <textarea
                        className="form-control"
                        id="shortDescription"
                        rows="2"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Đăng
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
