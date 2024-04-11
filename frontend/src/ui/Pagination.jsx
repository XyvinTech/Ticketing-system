import React from "react";
import { ReactComponent as LeftIcon } from "../assets/icons/LeftIcon.svg";
import { ReactComponent as RightIcon } from "../assets/icons/RightIcon.svg";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  paginate,
  goToPreviousPage,
  goToNextPage,
}) => {
  return (
    <div className="flex justify-between bg-gray-50 py-2 px-3">
      <div className="text-sm text-gray-700">
        Showing {Math.min(totalItems === 0 ? 0 : currentPage * itemsPerPage - itemsPerPage + 1, totalItems)} to{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} tickets
      </div>
      <div className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
        <button
          className="relative inline-flex items-center rounded-l-md border bg-white px-2 py-2 text-sm font-medium"
          onClick={goToPreviousPage}
        >
          <LeftIcon className="h-5 w-5 text-gray-400" />
        </button>
        {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                currentPage === index + 1
                  ? "z-10 border-purple-500 bg-purple-50 text-purple-600"
                  : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
              } `}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          className="relative inline-flex items-center rounded-r-md border bg-white px-2 py-2 text-sm font-medium"
          onClick={goToNextPage}
        >
          <RightIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
