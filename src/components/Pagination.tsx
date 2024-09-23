// Client Component (Pagination)
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PaginationProps {
  totalTeam: number;
  limit: number;
}

const Pagination = React.memo(({ totalTeam, limit }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get query parameters from URL
  const totalPages = Math.ceil(totalTeam / limit);

  // Set initial current page from URL or default to 1
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pageFromURL = searchParams.get("page");
    return pageFromURL ? parseInt(pageFromURL, 10) : 1;
  });

  useEffect(() => {
    // Update currentPage when the searchParams changes (i.e., URL query changes)
    const pageFromURL = searchParams.get("page");
    setCurrentPage(pageFromURL ? parseInt(pageFromURL, 10) : 1);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
    router.push(`?page=${page}`); // Update URL query parameter
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex   space-x-2  mt-5 2xl:text-lg xl:text-base font-bold  h-10">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1} // Disable button if on the first page
            className={`px-4 h-10 leading-tight text-black    bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 ${
              currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 h-10 leading-tight border border-gray-300 ${
                index + 1 === currentPage
                  ? "bg-[#2e4262] text-white"
                  : "text-gray-500 bg-white"
              } hover:bg-gray-100`}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages} // Disable button if on the last page
            className={`px-4 h-10 leading-tight text-black bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 ${
              currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
});
Pagination.displayName = "Pagination";

export default Pagination;
