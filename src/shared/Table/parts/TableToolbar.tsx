"use client";

import React, { useEffect, useRef, useState } from "react";
import { LuColumns3, LuFilterX, LuCheck } from "react-icons/lu";
import { TableColumn } from "@/shared/Table/types";

type Props<T> = {
    columns: TableColumn<T>[];
    total?: number;
    hasActiveFilters: boolean;
    onResetFilters: () => void;
    isVisible: (key: string) => boolean;
    onToggleColumn: (key: string) => void;
};

const BTN =
    "inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-medium border border-slate-200 bg-white " +
    "text-slate-600 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 " +
    "outline-hidden focus-visible:ring-3 focus-visible:ring-slate-900/15";

function TableToolbar<T>({ columns, total, hasActiveFilters, onResetFilters, isVisible, onToggleColumn }: Props<T>) {
    const [open, setOpen] = useState(false);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onDocClick = (e: MouseEvent) => {
            if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open]);

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
                {total != null && (
                    <span className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-slate-100 text-slate-600">
                        مجموع
                        <b className="text-slate-900">{Number(total).toLocaleString("fa-IR")}</b>
                        مورد
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2 relative" ref={boxRef}>
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onResetFilters}
                        className={`${BTN} !text-rose-600 !border-rose-100 !bg-rose-50 hover:!bg-rose-100`}
                    >
                        <LuFilterX className="w-4 h-4" />
                        حذف فیلترها
                    </button>
                )}
                <button type="button" onClick={() => setOpen((state) => !state)} className={BTN}>
                    <LuColumns3 className="w-4 h-4" />
                    ستون‌ها
                </button>
                {open && (
                    <div className="absolute top-full left-0 mt-2 z-20 bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-900/5 p-2 min-w-[220px] max-h-80 overflow-auto">
                        {columns.map((col) => {
                            const key = col.key as string;
                            const visible = isVisible(key);
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => onToggleColumn(key)}
                                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <span
                                        className={`inline-flex items-center justify-center w-4 h-4 rounded-md border transition-colors ${
                                            visible
                                                ? "bg-slate-900 border-slate-900 text-white"
                                                : "bg-white border-slate-300"
                                        }`}
                                    >
                                        {visible && <LuCheck className="w-3 h-3" />}
                                    </span>
                                    {col.header}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TableToolbar;
