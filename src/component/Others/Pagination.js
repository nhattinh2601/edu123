import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

export default function Pagination({ pageCount, handlePageClick }) {
  useEffect(() => {
    const pages = document.querySelectorAll(".pagination a");

    pages.forEach((page) => {
      page.addEventListener("click", function () {
        pages.forEach((p) => {
          p.classList.remove("active");
        });
        this.classList.add("active");
      });
    });

    const currentPage = document.querySelector(".pagination a.active");
    if (currentPage) {
      currentPage.classList.remove("active");
    }
    const page2 = document.querySelector(".pagination a:nth-child(2)");
    if (page2) {
      page2.classList.add("active");
    }
  }, []);

  return (
    <div className="pagination-container page">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
