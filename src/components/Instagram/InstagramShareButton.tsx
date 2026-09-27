"use client";

import React, {useEffect, useRef, useState} from "react";
import {FiSend} from "react-icons/fi";
import toast from "react-hot-toast";

type Props = {
    /** لینک کاملی که باید در کلیپ‌بورد بنشیند */
    link: string;
};

/**
 * navigator.clipboard فقط در بستر امن (https) در دسترس است؛ روی http یا
 * وب‌ویوهای قدیمی به یک textarea موقت برمی‌گردیم تا دکمه بی‌اثر نماند.
 */
const copyToClipboard = async (value: string) => {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
        if (!document.execCommand("copy")) throw new Error("copy command rejected");
    } finally {
        document.body.removeChild(textarea);
    }
};

export default function InstagramShareButton({link}: Props) {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    const share = async () => {
        try {
            await copyToClipboard(link);
            setCopied(true);
            toast.success("لینک پست کپی شد");
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("کپی لینک انجام نشد");
        }
    };

    return (
        <button
            type="button"
            onClick={share}
            aria-label="کپی لینک پست"
            title="کپی لینک پست"
            className="group/share flex items-center gap-1.5 text-neutral-800 dark:text-neutral-100 transition active:scale-90"
        >
            <FiSend className="h-6 w-6 -rotate-12 transition group-hover/share:opacity-60"/>
            {copied && <span className="text-xs text-neutral-500">کپی شد</span>}
        </button>
    );
}
