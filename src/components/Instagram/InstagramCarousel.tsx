"use client";

import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {useSwipeable} from "react-swipeable";
import {LuChevronLeft, LuChevronRight, LuVolume2, LuVolumeX} from "react-icons/lu";
import {InstagramPostMediaResponse} from "@/services/types/instagramPost";

const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

type Props = {
    media: InstagramPostMediaResponse[];
    index: number;
    onIndexChange: (index: number) => void;
    alt: string;
    /** اولین پست‌های فید برای LCP زودتر لود می‌شوند */
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
    const [muted, setMuted] = useState(true);
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

    // فقط ویدیوی اسلاید فعالِ درون دید پخش می‌شود؛ بقیه متوقف و از ابتدا
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
        <div ref={containerRef} className="relative w-full aspect-square bg-black overflow-hidden group">
            <div className="absolute inset-0" {...swipeHandlers}>
                <div
                    className="flex h-full w-full transition-transform duration-300 ease-out"
                    style={{transform: `translateX(${index * 100}%)`}}
                >
                    {media.map((item, slide) => (
                        <div key={item.id} className="relative h-full w-full shrink-0">
                            {item.type === "video" ? (
                                <video
                                    ref={(node) => {
                                        videoRefs.current[slide] = node;
                                    }}
                                    src={`${base}/instagram/${item.file}`}
                                    className="h-full w-full object-contain"
                                    muted={muted}
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                            ) : (
                                <Image
                                    src={`${base}/instagram/${item.file}`}
                                    alt={alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 470px"
                                    className="object-contain"
                                    priority={priority && slide === 0}
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
                            className="absolute start-2 top-1/2 -translate-y-1/2 hidden sm:flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-neutral-800 opacity-0 transition group-hover:opacity-100 hover:bg-white"
                        >
                            <LuChevronRight className="h-4 w-4"/>
                        </button>
                    )}
                    {index < count - 1 && (
                        <button
                            type="button"
                            aria-label="اسلاید بعدی"
                            onClick={() => go(index + 1)}
                            className="absolute end-2 top-1/2 -translate-y-1/2 hidden sm:flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-neutral-800 opacity-0 transition group-hover:opacity-100 hover:bg-white"
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

            {media[index]?.type === "video" && (
                <button
                    type="button"
                    aria-label={muted ? "پخش صدا" : "قطع صدا"}
                    onClick={() => setMuted((previous) => !previous)}
                    className="absolute bottom-3 end-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/75"
                >
                    {muted ? <LuVolumeX className="h-4 w-4"/> : <LuVolume2 className="h-4 w-4"/>}
                </button>
            )}
        </div>
    );
}
