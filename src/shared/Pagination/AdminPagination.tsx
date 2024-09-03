import React from 'react';
import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const AdminPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const PAGE_LIMIT = 3; // Number of pages to show around the current page

    const generatePageNumbers = () => {
        const pages = [];
        const halfLimit = Math.floor(PAGE_LIMIT / 2);

        let startPage = Math.max(1, currentPage - halfLimit);
        let endPage = Math.min(totalPages, currentPage + halfLimit);

        // Adjust start and end if there are not enough pages before or after
        if (currentPage - halfLimit < 1) {
            endPage = Math.min(totalPages, endPage + (1 - (currentPage - halfLimit)));
        }
        if (currentPage + halfLimit > totalPages) {
            startPage = Math.max(1, startPage - (currentPage + halfLimit - totalPages));
        }
        if (startPage > 3) pages.push('...');

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        if (endPage < totalPages - 1) pages.push('...');

        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="flex items-center -space-x-px h-10 text-base gap-x-1">
                <li>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
                            currentPage === 1 ? 'cursor-not-allowed text-gray-300' : ''
                        }`}
                        aria-disabled={currentPage === 1}
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-3 h-3 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                    </button>
                </li>

                {generatePageNumbers().map((page, index) => (
                    <li key={index}>
                        {page === '...' ? (
                            <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border  border-gray-300">
                                {page}
                            </span>
                        ) : (
                            <button
                                onClick={() => handlePageChange(page as number)}
                                className={`flex items-center justify-center px-4 h-10 leading-tight  border  ${
                                    page === currentPage
                                        ? 'z-10 text-orange-600 border-orange-300 bg-orange-50 border-x'
                                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                                }`}
                                aria-current={page === currentPage ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}

                <li>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
                            currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : ''
                        }`}
                        aria-disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="w-3 h-3 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default AdminPagination;
