"use client";

import { LuArrowDown, LuArrowUp, LuChevronsUpDown } from "react-icons/lu";
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

/** کلیدی که باید به سرور فرستاده شود (ممکن است با کلید نمایشیِ ستون فرق کند). */
export const filterKeyOf = <T,>(col: TableColumn<T>) => col.filterKey ?? (col.key as string);
export const sortKeyOf = <T,>(col: TableColumn<T>) => col.sortKey ?? (col.key as string);

function TableHead<T>({ columns, hasOpsColumn, sort, onSort, filters, onFilter, filterEpoch }: Props<T>) {
    const hasFilterRow = columns.some((col) => (col.filter ?? "text") !== false);

    return (
        <thead className="bg-slate-50/80">
            <tr className="text-slate-600">
                {columns.map((col) => {
                    const sortable = col.sortable !== false;
                    const sortKey = sortKeyOf(col);
                    const active = sort.key === sortKey;
                    return (
                        <th
                            key={col.key as string}
                            scope="col"
                            className="text-center px-3 py-3 text-xs font-semibold whitespace-nowrap border-b border-slate-200 first:rounded-tr-xl last:rounded-tl-xl"
                            onClick={() => (sortable ? onSort(sortKey) : undefined)}
                        >
                            <div
                                className={`flex items-center gap-1.5 justify-center ${
                                    sortable ? "cursor-pointer select-none hover:text-slate-900 transition-colors" : ""
                                } ${active ? "text-slate-900" : ""}`}
                            >
                                {col.header}
                                {sortable &&
                                    (active ? (
                                        sort.direction === "asc" ? (
                                            <LuArrowUp className="w-3.5 h-3.5 text-orange-500" />
                                        ) : (
                                            <LuArrowDown className="w-3.5 h-3.5 text-orange-500" />
                                        )
                                    ) : (
                                        <LuChevronsUpDown className="w-3.5 h-3.5 text-slate-300" />
                                    ))}
                            </div>
                        </th>
                    );
                })}
                {hasOpsColumn && (
                    <th
                        scope="col"
                        className="text-center px-3 py-3 text-xs font-semibold whitespace-nowrap border-b border-slate-200"
                    >
                        عملیات
                    </th>
                )}
            </tr>
            {hasFilterRow && (
                <tr className="bg-white">
                    {columns.map((col) => {
                        const key = filterKeyOf(col);
                        const filterType = col.filter ?? "text";
                        return (
                            <th key={col.key as string} className="px-2 pt-2 pb-3 align-top border-b border-slate-200">
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
                                        value={filters[key] ?? ""}
                                        placeholder={col.header}
                                        onChange={(date) => onFilter(key, date)}
                                    />
                                ) : (
                                    <Input
                                        className="min-w-[150px] !rounded-xl !border-slate-200 !h-11 hover:border-slate-300 focus:!border-slate-400 focus:!ring-3 focus:!ring-slate-900/10"
                                        type="text"
                                        placeholder={col.header}
                                        onChange={(e) => onFilter(key, e.target.value)}
                                        value={filters[key] ?? ""}
                                    />
                                )}
                            </th>
                        );
                    })}
                    {hasOpsColumn && <th className="border-b border-slate-200" />}
                </tr>
            )}
        </thead>
    );
}

export default TableHead;
