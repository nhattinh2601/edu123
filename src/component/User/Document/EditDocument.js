import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setId, selectId } from "../../../slices/idSlice";
import axiosClient from "../../../api/axiosClient";

import EditCoursePanel from "../Panel/EditCoursePanel";

export default function EditDocument() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useSelector(selectId);
  console.log("ID from Redux Store:", id);
  const handleCourseClick = (clickedCourseId) => {
    console.log("Clicked Course ID:", clickedCourseId);
    dispatch(setId(clickedCourseId));
    navigate("/teacher/course/edit-document-detail");
  };

  const [documentData, setDocumentData] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/documents/course=${id}`, {});

        const filteredDocuments = response.data.filter(
          (document) => document.isDeleted !== true
        );

        // Sort documents by created_at from newest to oldest
        const sortedDocuments = filteredDocuments.sort((a, b) => {
          const dateA = new Date(a.createAt);
          const dateB = new Date(b.createAt);
          return dateB - dateA;
        });

        setDocumentData(sortedDocuments);
      } catch (error) {
        console.error("Error fetching document data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this document?"
      );

      if (!isConfirmed) {
        return;
      }

      const response = await axiosClient.delete(`/documents/${documentId}`);
      console.log(response.data);

      const updatedDocuments = await axiosClient.get(`/documents/course=${id}`);
      const filteredDocuments = updatedDocuments.data.filter(
        (document) => document.isDeleted !== true
      );

      // Sort documents by created_at from newest to oldest
      const sortedDocuments = filteredDocuments.sort((a, b) => {
        const dateA = new Date(a.createAt);
        const dateB = new Date(b.createAt);
        return dateB - dateA;
      });

      setDocumentData(sortedDocuments);
      setNotification({
        type: "success",
        message: "Document deleted successfully",
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error("Error deleting document:", error);
      setNotification({ type: "error", message: "Error deleting document" });
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
                  {/* List of documents */}
                  <div className="card mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 d-inline-block">
                        Tài liệu đã tải lên
                      </h5>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ backgroundColor: "green" }}
                        onClick={() =>
                          handleNavigate("/teacher/course/upload-document")
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} /> Thêm tài liệu
                      </button>
                    </div>
                    {notification && (
                      <div className={`notification ${notification.type}`}>
                        {notification.message}
                      </div>
                    )}
                    <div className="card-body">
                      {documentData.map((document) => (
                        <div key={document.Id} className="mb-4">
                          <div className="row">
                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                              <div
                                className="bg-image hover-overlay hover-zoom ripple rounded"
                                data-mdb-ripple-color="light"
                              >
                                {/* Replace with actual document thumbnail */}
                                <img
                                  src={document.image}
                                  className="image-course"
                                  alt="Document Thumbnail"
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <p>
                                    <strong>{document.title}</strong>
                                  </p>
                                </div>

                                <div className="float-end">
                                  <button
                                    className="btn btn-primary btn-sm margin-button-header"
                                    onClick={() => handleCourseClick(document.Id)}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm margin-button-header"
                                    onClick={() =>
                                      handleDeleteDocument(document.Id)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                              {/* Additional space if needed */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="card border-0 shadow rounded-3 my-5">
              <EditCoursePanel />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
