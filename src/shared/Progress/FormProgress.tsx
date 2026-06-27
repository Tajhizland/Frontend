"use client";

import React from "react";

type Props = {
    /** آیا فرم در حال ارسال است */
    loading?: boolean;
    /** درصد آپلود فایل (۰ تا ۱۰۰). اگر فرم فایل ندارد، خالی بگذار */
    progress?: number;
};

/**
 * نوار پیشرفتِ داخل فرم:
 *  - اگر آپلود فایل در جریان باشد، درصد واقعی آپلود را نشان می‌دهد.
 *  - پس از اتمام آپلود (۱۰۰٪) به حالت «در حال پردازش...» با انیمیشن نامعین می‌رود.
 *  - وقتی فرم در حال ارسال نیست، چیزی نشان نمی‌دهد.
 */
export default function FormProgress({loading, progress}: Props) {
    if (!loading) return null;

    const uploading = typeof progress === "number" && progress > 0 && progress < 100;

    return (
        <div className="w-full my-4">
            <div className="flex items-center justify-between mb-1.5 text-xs text-slate-500">
                <span>{uploading ? "در حال آپلود فایل..." : "در حال پردازش..."}</span>
                {uploading && <span className="font-semibold text-slate-700">{Math.round(progress!)}%</span>}
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                {uploading ? (
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-200 ease-out"
                        style={{width: `${progress}%`}}
                    />
                ) : (
                    // حالت نامعین (پردازش سمت سرور)
                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 animate-[formprogress_1.1s_ease-in-out_infinite]" />
                )}
            </div>
            <style jsx>{`
                @keyframes formprogress {
                    0% {
                        transform: translateX(-120%);
                    }
                    100% {
                        transform: translateX(420%);
                    }
                }
            `}</style>
        </div>
    );
}
