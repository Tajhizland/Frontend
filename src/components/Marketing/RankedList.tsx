"use client";

import React, {ReactNode} from "react";
import Image from "next/image";
import Spinner from "@/shared/Loading/Spinner";
import {faNumber} from "@/components/Marketing/theme";

export type RankedColumn<T> = {
    header: string;
    render: (row: T) => ReactNode;
    align?: "start" | "end" | "center";
};

type Props<T> = {
    rows: T[] | undefined;
    isLoading: boolean;
    rowKey: (row: T) => React.Key;
    title: (row: T) => ReactNode;
    subtitle?: (row: T) => ReactNode;
    image?: (row: T) => string | null | undefined;
    href?: (row: T) => string | undefined;
    /** عددی که طول میله‌ی مقایسه از آن ساخته می‌شود. */
    metric: (row: T) => number;
    metricHeader: string;
    accent: string;
    columns?: RankedColumn<T>[];
    emptyText?: string;
};

const ALIGN = {start: "text-start", end: "text-end", center: "text-center"} as const;

/**
 * فهرست رتبه‌بندی‌شده‌ی «برترین‌ها».
 *
 * طول میله نسبت به بزرگ‌ترین مقدارِ همین فهرست است، نه مقدار مطلق؛ پس میله فقط برای
 * مقایسه‌ی داخل جدول است و عدد دقیق همیشه کنارش نوشته می‌شود (میله به‌تنهایی حامل داده نیست).
 */
export default function RankedList<T>({
    rows,
    isLoading,
    rowKey,
    title,
    subtitle,
    image,
    href,
    metric,
    metricHeader,
    accent,
    columns = [],
    emptyText = "در این بازه داده‌ای ثبت نشده است.",
}: Props<T>) {
    if (isLoading) return <Spinner/>;
    if (!rows?.length) return <p className="py-6 text-sm text-center text-slate-500">{emptyText}</p>;

    const max = Math.max(...rows.map(metric), 1);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-xs text-slate-500 border-b border-slate-100">
                        <th className="py-2 px-2 font-medium text-center w-10">#</th>
                        <th className="py-2 px-2 font-medium text-start">عنوان</th>
                        <th className="py-2 px-2 font-medium text-start min-w-[140px]">{metricHeader}</th>
                        {columns.map((column) => (
                            <th key={column.header} className={`py-2 px-2 font-medium whitespace-nowrap ${ALIGN[column.align ?? "end"]}`}>
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        const value = metric(row);
                        const src = image?.(row);
                        const link = href?.(row);
                        const label = title(row);

                        return (
                            <tr key={rowKey(row)} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                                <td className="py-2.5 px-2 text-center text-slate-400 tabular-nums">{faNumber(index + 1)}</td>
                                <td className="py-2.5 px-2">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        {src && (
                                            <div className="relative w-9 h-9 shrink-0 rounded-lg overflow-hidden bg-slate-50">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${src}`}
                                                    alt=""
                                                    fill
                                                    sizes="36px"
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col min-w-0">
                                            {link ? (
                                                <a href={link} target="_blank" rel="noreferrer"
                                                   className="font-medium text-slate-700 hover:text-slate-900 truncate">
                                                    {label}
                                                </a>
                                            ) : (
                                                <span className="font-medium text-slate-700 truncate">{label}</span>
                                            )}
                                            {subtitle && <span className="text-xs text-slate-400 truncate">{subtitle(row)}</span>}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2.5 px-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 min-w-[60px] bg-slate-100 rounded">
                                            <div
                                                className="h-2 rounded"
                                                style={{width: `${Math.max((value / max) * 100, 2)}%`, backgroundColor: accent}}
                                            />
                                        </div>
                                        <span className="text-slate-700 tabular-nums shrink-0">{faNumber(value)}</span>
                                    </div>
                                </td>
                                {columns.map((column) => (
                                    <td key={column.header}
                                        className={`py-2.5 px-2 text-slate-600 tabular-nums whitespace-nowrap ${ALIGN[column.align ?? "end"]}`}>
                                        {column.render(row)}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
