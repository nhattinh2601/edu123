import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Video.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function WatchVideo() {
  const [comments, setComments] = useState([
    { id: 1, name: "Người dùng 1", text: "Bình luận 1" },
    { id: 2, name: "Người dùng 2", text: "Bình luận 2" },
    // Add more comments as needed
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const addNewComment = () => {
    // Add a new comment to the list
    const newComment = { id: comments.length + 1, name: "Người dùng mới", text: newCommentText };
    setComments([...comments, newComment]);
    setNewCommentText('');
  };

  const lessons = [
    {
      id: 1,
      title: "Bài 1: Giới thiệu và các thiết lập cơ bản",
      duration: "08:05",
      link: "/lesson1", // add link for each lesson
    },
    {
      id: 2,
      title: "Bài 2: Tạo mới, mở và lưu trữ file văn bản",
      duration: "06:58",
      link: "/lesson2", // add link for each lesson
    },
    {
      id: 3,
      title: "Bài 3: Hướng dẫn tập gõ nhanh văn bản bằng 10 ngón",
      duration: "06:58",
      link: "/lesson3", // add link for each lesson
    },
    { 
      id: 4, 
      title: "Bài 4: Sao chép, cắt, dán văn bản", 
      duration: "06:58",
      link: "/lesson4" // add link for each lesson
    },
    // Add more lessons as needed
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
                <h2 className="my-4">Xem video</h2>
                <div className="embed-responsive embed-responsive-tall mb-4">
                  <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/XYZ" allowFullScreen></iframe>
                </div>
                <h4 className="mb-3">Tiêu đề video</h4>
                <div style={{backgroundColor: 'lightgray', padding: '10px'}}>
                  <strong><p>Giới thiệu</p></strong>
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
                  <div key={comment.id} style={{backgroundColor: 'lightgray', margin: '10px 0', padding: '10px'}}>
                    <strong>{comment.name}</strong>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-4">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="video-list" style={{ maxHeight: '100%', overflowY: 'auto' }}>
              {lessons.map((lesson) => (
                <div key={lesson.id}>
                  <Link to={lesson.link} className="video-link">
                    <p>{lesson.title}&nbsp;{lesson.duration}</p>
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