"use client";

import React from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import CustomSelect from "@/shared/CustomSelect/CustomSelect";
import Input from "@/shared/Input/Input";
import PersianDatePicker from "@/shared/DatePicker/PersianDatePicker";
import { TableColumn } from "@/shared/Table/types";

type Props<T> = {
    columns: TableColumn<T>[];
    hasOpsColumn: boolean;
    sort: { key: string | null; direction: "asc" | "desc" };
    onSort: (key: string) => void;
    filters: Record<string, any>;
    onFilter: (key: string, value: any) => void;
    filterEpoch: number;
};

function TableHead<T>({ columns, hasOpsColumn, sort, onSort, filters, onFilter, filterEpoch }: Props<T>) {
    const hasFilterRow = columns.some((col) => (col.filter ?? "text") !== false);

    return (
        <thead className="text-xs uppercase bg-slate-50 border-b border-slate-400">
            <tr className="text-slate-900">
                {columns.map((col) => {
                    const key = col.key as string;
                    const sortable = col.sortable !== false;
                    return (
                        <th
                            key={key}
                            className="text-center p-3 text-nowrap whitespace-nowrap font-bold"
                            onClick={() => (sortable ? onSort(key) : undefined)}
                        >
                            <div
                                className={`flex flex-row gap-x-2 justify-center ${
                                    sortable ? "cursor-pointer select-none" : ""
                                }`}
                            >
                                {col.header}
                                {sortable &&
                                    (sort.key === key ? (
                                        sort.direction === "asc" ? (
                                            <FaSortUp className="text-orange-500" />
                                        ) : (
                                            <FaSortDown className="text-orange-500" />
                                        )
                                    ) : (
                                        <FaSort className="text-orange-500" />
                                    ))}
                            </div>
                        </th>
                    );
                })}
                {hasOpsColumn && <th className="text-center p-3 text-nowrap whitespace-nowrap">عملیات</th>}
            </tr>
            {hasFilterRow && (
                <tr className="text-slate-900 bg-white">
                    {columns.map((col) => {
                        const key = col.key as string;
                        const filterType = col.filter ?? "text";
                        return (
                            <th key={key} className="text-center p-3">
                                {filterType === false ? null : filterType === "select" ? (
                                    <CustomSelect
                                        hasAll={1}
                                        options={col.options || []}
                                        onChange={(e) => onFilter(key, e.target.value)}
                                        value={filters[key] ?? ""}
                                    />
                                ) : filterType === "date" ? (
                                    <PersianDatePicker
                                        key={`${key}-${filterEpoch}`}
                                        onChange={(date) => onFilter(key, date)}
                                    />
                                ) : (
                                    <Input
                                        className="whitespace-nowrap text-nowrap min-w-[150px]"
                                        type="text"
                                        placeholder={`فیلتر ${col.header}`}
                                        onChange={(e) => onFilter(key, e.target.value)}
                                        value={filters[key] ?? ""}
                                    />
                                )}
                            </th>
                        );
                    })}
                    {hasOpsColumn && <th />}
                </tr>
            )}
        </thead>
    );
}

export default TableHead;
