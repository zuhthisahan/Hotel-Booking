import React from "react";

const RoomPaginator = ({ currentPage, totalPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1); //(value,index) ignore the value in the array to create page numbers

  // Handle page change without inline function in render
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${
              currentPage === pageNumber ? "active" : "" // Make the current page only active style
            } `}
          >
            <button
              className="page-link"
              onClick={() => handlePageClick(pageNumber)} // updated from onPageChange(pageNumber) to avoid unnecessary re-renders
              aria-label={`Go to page ${pageNumber}`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RoomPaginator;
