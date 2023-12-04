import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import "./Video.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function WatchVideo() {
  const {id} = useParams();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    async function fetchVideoData() {
      try {
        const response = await axiosClient.get(`videos/${id}`);
        const videoData = response.data;

        setTitle(videoData.title);
        setDescription(videoData.description);

        const processedLink = processVideoLink(videoData.video_filepath);
        setLink(processedLink);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    }

    fetchVideoData();
  }, [id]);

  

  const processVideoLink = (originalLink) => {
    if (originalLink.includes("youtube.com/watch?v=")) {
      // Convert YouTube video URL
      const videoId = originalLink.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}?rel=0`;
    } else if (originalLink.includes("youtube.com/embed/")) {
      return originalLink;
    } else {
      return originalLink;
    }
  };

  const addNewComment = () => {
    const newComment = {
      id: comments.length + 1,
      name: "Người dùng mới",
      text: newCommentText,
    };
    setComments([...comments, newComment]);
    setNewCommentText("");
  };

  const lessons = [
    // ... (your lesson data)
  ];

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          {/* Main video column */}
          <div className="col-sm-12 col-md-8 col-lg-8 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h2 className="my-4">Bài giảng: {title}</h2>
                <div className="embed-responsive embed-responsive-tall mb-4">
                  <iframe
                    className="embed-responsive-item"
                    src={link}
                    allowFullScreen
                    title={title}
                  ></iframe>
                </div>
                <h4 className="mb-3">Mô tả video</h4>
                <div style={{ backgroundColor: "lightgray", padding: "10px" }}>
                  <strong>
                    <p>{description}</p>
                  </strong>
                </div>

                {/* Comments Section */}
                <h4 className="my-4">Bình luận</h4>
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(event) => setNewCommentText(event.target.value)}
                />
                <button onClick={addNewComment}>Thêm bình luận</button>
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    style={{
                      backgroundColor: "lightgray",
                      margin: "10px 0",
                      padding: "10px",
                    }}
                  >
                    <strong>{comment.name}</strong>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="card border-0 shadow rounded-3 my-5">
              <div
                className="video-list"
                style={{ maxHeight: "100%", overflowY: "auto" }}
              >
                {lessons.map((lesson) => (
                  <div key={lesson.id}>
                    <Link to={lesson.link} className="video-link">
                      <p>
                        {lesson.title}&nbsp;{lesson.duration}
                      </p>
                    </Link>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
