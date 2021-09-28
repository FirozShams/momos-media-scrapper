import React from "react";
import ReactPaginate from "react-paginate";
import "./Paginate.css";
export function Paginate({
  pageCount,
  onPageChange,
  forcePage,
  pageRangeDisplayed,
}) {
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={pageRangeDisplayed || 5}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      forcePage={forcePage}
      activeClassName={"pagination--active"}
    />
  );
}
