import React from 'react';
import Select from "@/shared/Select/Select";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const SelectPagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    return (
        <Select onChange={(e) => {
            handlePageChange(Number(e.target.value))
        }}>
            {Array.from({length: totalPages}).map((_, index) => (
                <option key={index} value={index+1} selected={currentPage==index+1}>
                    {index + 1}
                </option>
            ))}
        </Select>
    );
};

export default SelectPagination;
