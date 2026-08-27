"use client";

import React from "react";
import Image from "next/image";

type Props = {
    src?: string | null;
    title?: React.ReactNode;
    ratio?: "video" | "square";
};

const SortablePreview: React.FC<Props> = ({ src, title, ratio = "video" }) => (
    <div className="flex items-center gap-3">
        {src && (
            <div
                className={[
                    "relative shrink-0 w-28 overflow-hidden rounded-lg border bg-slate-50",
                    ratio === "video" ? "aspect-video" : "aspect-square",
                ].join(" ")}
            >
                <Image
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${src}`}
                />
            </div>
        )}
        {title && <span className="font-medium truncate">{title}</span>}
    </div>
);

export default SortablePreview;
