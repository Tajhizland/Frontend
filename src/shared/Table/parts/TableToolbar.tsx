"use client";

import React, { useState } from "react";
import { LuColumns3, LuFilterX } from "react-icons/lu";
import { TableColumn } from "@/shared/Table/types";

type Props<T> = {
    columns: TableColumn<T>[];
    total?: number;
    hasActiveFilters: boolean;
    onResetFilters: () => void;
    isVisible: (key: string) => boolean;
    onToggleColumn: (key: string) => void;
};

function TableToolbar<T>({ columns, total, hasActiveFilters, onResetFilters, isVisible, onToggleColumn }: Props<T>) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="text-sm text-slate-600">
                {total != null && (
                    <span>
                        مجموع: <b>{Number(total).toLocaleString()}</b> مورد
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2 relative">
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onResetFilters}
                        className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition"
                    >
                        <LuFilterX className="w-4 h-4" />
                        حذف فیلترها
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => setOpen((state) => !state)}
                    className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition"
                >
                    <LuColumns3 className="w-4 h-4" />
                    ستون‌ها
                </button>
                {open && (
                    <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-slate-200 rounded-lg shadow-lg p-3 min-w-[200px] max-h-72 overflow-auto">
                        <div className="flex flex-col gap-2">
                            {columns.map((col) => (
                                <label key={col.key as string} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isVisible(col.key as string)}
                                        onChange={() => onToggleColumn(col.key as string)}
                                    />
                                    <span className="text-xs">{col.header}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TableToolbar;
