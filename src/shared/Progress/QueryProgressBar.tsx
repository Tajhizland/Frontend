"use client";

import React, {useEffect, useRef, useState} from "react";
import {useIsFetching, useIsMutating} from "react-query";

/**
 * نوار پیشرفت سراسری (سبک nprogress) که به فعالیت react-query وصل است:
 * هر زمان یک mutation (ثبت فرم) یا query در حال اجراست، نوار بالای صفحه
 * به‌صورت حرفه‌ای حرکت می‌کند و با اتمام کار کامل و محو می‌شود.
 */
export default function QueryProgressBar() {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    const active = isFetching + isMutating > 0;

    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (active) {
            if (hideTimer.current) clearTimeout(hideTimer.current);
            setVisible(true);
            setProgress((p) => (p < 10 ? 10 : p));
            timer.current = setInterval(() => {
                // به‌آرامی تا ۹۰٪ پیش می‌رود (انتظار پاسخ سرور)
                setProgress((p) => (p < 90 ? p + Math.max(0.5, (90 - p) / 12) : p));
            }, 250);
        } else {
            if (timer.current) clearInterval(timer.current);
            setProgress((prev) => (prev > 0 ? 100 : 0));
            hideTimer.current = setTimeout(() => {
                setVisible(false);
                setProgress(0);
            }, 450);
        }
        return () => {
            if (timer.current) clearInterval(timer.current);
        };
    }, [active]);

    if (!visible) return null;

    return (
        <div className="fixed top-0 inset-x-0 z-[60] h-[3px] pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(56,189,248,0.7)] transition-all duration-300 ease-out"
                style={{width: `${progress}%`, opacity: progress >= 100 ? 0 : 1}}
            />
        </div>
    );
}
