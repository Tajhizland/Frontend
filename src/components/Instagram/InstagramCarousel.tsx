"use client";

import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {useSwipeable} from "react-swipeable";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {InstagramPostMediaResponse} from "@/services/types/instagramPost";

const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

type Props = {
    media: InstagramPostMediaResponse[];
    index: number;
    onIndexChange: (index: number) => void;
    alt: string;
    /** تصویر اسلاید اول هنگام بازشدن پست زودتر بارگیری شود */
    priority?: boolean;
};

/**
 * کاروسل رسانه‌های یک پست، کاملاً راست‌به‌چپ مثل اینستاگرام فارسی:
 * اسلاید اول سمت راست است و اسلایدهای بعدی به سمت چپ ادامه پیدا می‌کنند.
 *
 * چون `direction: rtl` محور اصلی فلکس را از راست شروع می‌کند ولی translateX
 * همیشه فیزیکی است، برای جلو رفتن باید ریل به راست (مقدار مثبت) حرکت کند.
 * نقطه‌های زیر پست هم در همین جهت چیده می‌شوند تا با اسلاید فعال هم‌خوان باشند.
 */
export default function InstagramCarousel({media, index, onIndexChange, alt, priority}: Props) {
    const count = media.length;
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [visible, setVisible] = useState(false);

    const go = (next: number) => {
        if (next < 0 || next > count - 1) return;
        onIndexChange(next);
    };

    // ویدیوی پستی که از دید خارج شده نباید در پس‌زمینه پخش شود
    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => setVisible(entries[0].isIntersecting),
            {threshold: 0.6}
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // تنها اسلاید فعال ویدیو می‌سازد؛ وقتی از دید خارج شود پخش متوقف می‌شود.
    useEffect(() => {
        videoRefs.current.forEach((video, slide) => {
            if (!video) return;
            if (slide === index && visible) {
                void video.play().catch(() => undefined);
            } else {
                video.pause();
                if (slide !== index) video.currentTime = 0;
            }
        });
    }, [index, visible]);

    // در چیدمان راست‌به‌چپ، اسلاید بعدی سمت چپ است؛ پس کشیدن انگشت به راست جلو می‌برد
    const swipeHandlers = useSwipeable({
        onSwipedRight: () => go(index + 1),
        onSwipedLeft: () => go(index - 1),
        trackMouse: false,
        preventScrollOnSwipe: true,
    });

    return (
        <div ref={containerRef} dir="rtl" role="region" aria-label="تصاویر و ویدیوهای پست"
             onKeyDown={(event) => {
                 if (event.target !== event.currentTarget) return;
                 if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                     event.preventDefault();
                     go(index + (event.key === "ArrowLeft" ? 1 : -1));
                 }
             }}
             tabIndex={count > 1 ? 0 : undefined}
             className="group relative aspect-[3/4] w-full overflow-hidden bg-black">
            <div className="absolute inset-0" {...swipeHandlers}>
                <div
                    className="flex h-full w-full transition-transform duration-300 ease-out"
                    style={{transform: `translateX(${index * 100}%)`}}
                >
                    {media.map((item, slide) => (
                        <div key={item.id} className="relative h-full w-full shrink-0">
                            {item.type === "video" ? slide === index ? (
                                <video
                                    ref={(node) => {
                                        videoRefs.current[slide] = node;
                                    }}
                                    src={`${base}/instagram/${item.file}`}
                                    poster={item.cover ? `${base}/instagram/${item.cover}` : undefined}
                                    className="h-full w-full object-contain"
                                    controls
                                    muted
                                    loop
                                    playsInline
                                    preload="none"
                                />
                            ) : null : (
                                <Image
                                    src={`${base}/instagram/${item.file}`}
                                    alt={alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 600px"
                                    className="object-contain"
                                    loading={priority && slide === 0 ? "eager" : "lazy"}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {count > 1 && (
                <>
                    {index > 0 && (
                        <button
                            type="button"
                            aria-label="اسلاید قبلی"
                            onClick={() => go(index - 1)}
                            className="absolute start-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-neutral-800 shadow-sm transition hover:bg-white"
                        >
                            <LuChevronRight className="h-4 w-4"/>
                        </button>
                    )}
                    {index < count - 1 && (
                        <button
                            type="button"
                            aria-label="اسلاید بعدی"
                            onClick={() => go(index + 1)}
                            className="absolute end-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-neutral-800 shadow-sm transition hover:bg-white"
                        >
                            <LuChevronLeft className="h-4 w-4"/>
                        </button>
                    )}
                    <span
                        className="absolute top-3 end-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white">
                        {(index + 1).toLocaleString("fa-IR")}/{count.toLocaleString("fa-IR")}
                    </span>
                </>
            )}

        </div>
    );
}
