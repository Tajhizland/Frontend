"use client";

import React, {useRef} from "react";
import {LuCheck, LuFileVideo, LuTriangleAlert, LuUpload, LuX} from "react-icons/lu";
import {formatBytes, formatDuration, formatSpeed, UploadPhase, UploadProgress} from "@/services/upload/liveUploader";

type Props = {
    name?: string;
    accept?: string;
    disabled?: boolean;
    phase: UploadPhase;
    progress: UploadProgress;
    error?: string | null;
    file?: File | null;
    /** وقتی کاربر فایل انتخاب می‌کند؛ آپلود بلافاصله شروع می‌شود */
    onSelect: (file: File) => void;
    onCancel: () => void;
    onReset: () => void;
};

const PHASE_LABEL: Record<UploadPhase, string> = {
    idle: "",
    preparing: "در حال آماده‌سازی…",
    uploading: "در حال آپلود",
    finalizing: "در حال ثبت نهایی روی سرور…",
    done: "آپلود کامل شد",
    canceled: "آپلود لغو شد",
    error: "آپلود ناموفق بود",
};

export default function VideoUploader({
    name = "video",
    accept = "video/mp4,video/quicktime,video/x-matroska,video/webm",
    disabled,
    phase,
    progress,
    error,
    file,
    onSelect,
    onCancel,
    onReset,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const isBusy = phase === "preparing" || phase === "uploading" || phase === "finalizing";
    const isDone = phase === "done";
    const isFailed = phase === "error" || phase === "canceled";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        // ریست مقدار تا انتخاب دوباره‌ی همان فایل هم رویداد بدهد
        e.target.value = "";
        if (selected) onSelect(selected);
    };

    if (phase === "idle") {
        return (
            <>
                <label
                    htmlFor={name}
                    className="flex flex-col items-center justify-center p-6 w-full min-h-[10rem] border-2 border-dashed border-neutral-300 rounded-2xl cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                    <LuUpload className="w-8 h-8 mb-2 text-neutral-500" />
                    <span className="text-xs font-semibold text-neutral-600">برای انتخاب ویدیو کلیک کنید</span>
                    <span className="text-[11px] text-neutral-400 mt-1">
                        آپلود مستقیم روی فضای ابری — بدون محدودیت حجم سرور
                    </span>
                </label>
                <input
                    id={name}
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    disabled={disabled}
                    className="hidden"
                    onChange={handleChange}
                />
            </>
        );
    }

    return (
        <div className="w-full border border-neutral-200 rounded-2xl p-4 bg-white">
            <div className="flex items-center gap-3">
                <div
                    className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDone ? "bg-emerald-100 text-emerald-600"
                            : isFailed ? "bg-rose-100 text-rose-600"
                                : "bg-amber-100 text-amber-600"
                    }`}
                >
                    {isDone ? <LuCheck className="w-5 h-5" />
                        : isFailed ? <LuTriangleAlert className="w-5 h-5" />
                            : <LuFileVideo className="w-5 h-5" />}
                </div>

                <div className="grow min-w-0">
                    <p className="text-sm font-medium truncate">{file?.name ?? "ویدیو"}</p>
                    <p className="text-xs text-neutral-500">
                        {PHASE_LABEL[phase]}
                        {file ? ` — ${formatBytes(file.size)}` : ""}
                    </p>
                </div>

                {isBusy && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="shrink-0 inline-flex items-center gap-1 text-xs text-rose-600 hover:underline"
                    >
                        <LuX className="w-3.5 h-3.5" />
                        لغو
                    </button>
                )}

                {(isDone || isFailed) && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="shrink-0 text-xs text-neutral-600 hover:underline"
                    >
                        تغییر ویدیو
                    </button>
                )}
            </div>

            {(isBusy || isDone) && (
                <>
                    <div className="w-full bg-neutral-200 rounded-full h-2 mt-4 overflow-hidden">
                        <div
                            className={`h-2 rounded-full transition-[width] duration-200 ${
                                isDone ? "bg-emerald-500" : "bg-[#fcb415]"
                            }`}
                            style={{width: `${isDone ? 100 : progress.percent}%`}}
                        />
                    </div>

                    <div className="flex justify-between items-center mt-2 text-[11px] text-neutral-500">
                        <span>{isDone ? 100 : progress.percent}٪</span>
                        {phase === "uploading" && (
                            <>
                                <span>{formatBytes(progress.loaded)} از {formatBytes(progress.total)}</span>
                                <span>{formatSpeed(progress.speed)}</span>
                                <span>باقی‌مانده: {formatDuration(progress.eta)}</span>
                            </>
                        )}
                        {phase === "finalizing" && <span>لطفاً صبر کنید…</span>}
                    </div>
                </>
            )}

            {error && (
                <p className="mt-3 text-xs text-rose-600 leading-5">{error}</p>
            )}
        </div>
    );
}
