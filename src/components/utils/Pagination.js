import React from "react";

const Pagination = ({ currentPage, onPageChange, disableNext }) => (
  <div>
    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
      Previous Page
    </button>
    <span> Page {currentPage} </span>
    <button onClick={() => onPageChange(currentPage + 1)} disabled={disableNext}>Next Page</button>
  </div>
);

export default Pagination;