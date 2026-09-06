"use client";

import React from "react";
import Image from "next/image";

type Props = {
    src?: string | null;
    title?: React.ReactNode;
    ratio?: "video" | "square";
};

/**
 * ابعاد باکس با ارتفاع صریح داده می‌شود (نه فقط با aspect-ratio) تا اگر
 * یوتیلیتی‌های `aspect-*` جایی override شده باشند، باز هم ارتفاع صفر نشود
 * و تصویر ناپدید نگردد.
 */
const BOX = {
    video: "w-40 h-24",
    square: "w-24 h-24",
} as const;

const SortablePreview: React.FC<Props> = ({ src, title, ratio = "video" }) => (
    <div className="flex items-center gap-3">
        {src && (
            <div
                className={[
                    "relative shrink-0 max-w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50",
                    BOX[ratio],
                ].join(" ")}
            >
                <Image
                    alt=""
                    fill
                    sizes="160px"
                    /* تصاویر محصول/بنر نسبت‌های متفاوتی دارند؛ با contain کامل دیده می‌شوند. */
                    className="object-contain"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${src}`}
                />
            </div>
        )}
        {title != null && title !== "" && <span className="font-medium truncate">{title}</span>}
    </div>
);

export default SortablePreview;
