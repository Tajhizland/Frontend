"use client";

import React, {useState, useSyncExternalStore} from "react";
import Image from "next/image";
import logo from "@/images/lightSmallLogo.png";
import {InstagramPostResponse} from "@/services/types/instagramPost";
import InstagramCarousel from "@/components/Instagram/InstagramCarousel";
import InstagramShareButton from "@/components/Instagram/InstagramShareButton";
import {INSTAGRAM_ACCOUNT, instagramPostLink, relativeTime} from "@/components/Instagram/helpers";

type Props = {
    post: InstagramPostResponse;
    priority?: boolean;
};

const CAPTION_CLAMP = 180;

/** روی سرور false و بعد از hydrate شدن true — بدون setState داخل افکت */
const neverChanges = () => () => undefined;
const onClient = () => true;
const onServer = () => false;

export default function InstagramPostCard({post, priority}: Props) {
    const media = post.media ?? [];
    const [index, setIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    // زمان نسبی به «الان» وابسته است و روی سرور و کلاینت یکی درنمی‌آید؛
    // تا قبل از hydrate همان تاریخ شمسیِ سرور نمایش داده می‌شود.
    const mounted = useSyncExternalStore(neverChanges, onClient, onServer);

    if (!media.length) return null;

    const caption = post.caption ?? "";
    const isLong = caption.length > CAPTION_CLAMP;
    const shown = !isLong || expanded ? caption : caption.slice(0, CAPTION_CLAMP).trimEnd();

    // روی موبایل پست دقیقاً مثل اینستاگرام لبه‌تا‌لبه است: بدون حاشیه، بدون
    // گوشه‌ی گرد و بدون فاصله از کناره‌ی صفحه. قاب فقط از اندازه‌ی تبلت به بالا
    // ظاهر می‌شود تا ستون ۴۷۰ پیکسلی در وسط صفحه شناور نماند.
    return (
        <article
            className="w-full bg-white dark:bg-neutral-900 sm:overflow-hidden sm:rounded-lg sm:border sm:border-neutral-200 sm:dark:border-neutral-700">
            <header className="flex items-center gap-3 px-4 py-3">
                <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-yellow-400 via-rose-500 to-purple-600 p-[2px]">
                    <span
                        className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white p-[2px] dark:bg-neutral-900">
                        <Image src={logo} alt={INSTAGRAM_ACCOUNT} className="h-full w-full object-contain"/>
                    </span>
                </span>
                <div className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {INSTAGRAM_ACCOUNT}
                    </span>
                    <time className="text-xs text-neutral-500">
                        {mounted ? relativeTime(post.timestamp, post.created_at) : post.created_at}
                    </time>
                </div>
            </header>

            <InstagramCarousel
                media={media}
                index={index}
                onIndexChange={setIndex}
                alt={caption ? caption.slice(0, 80) : `پست اینستاگرام ${INSTAGRAM_ACCOUNT}`}
                priority={priority}
            />

            <div className="relative flex items-center px-4 py-3">
                <InstagramShareButton link={instagramPostLink(post.id)}/>

                {media.length > 1 && (
                    <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5">
                        {media.map((item, slide) => (
                            <button
                                key={item.id}
                                type="button"
                                aria-label={`اسلاید ${slide + 1}`}
                                onClick={() => setIndex(slide)}
                                className={[
                                    "h-1.5 w-1.5 rounded-full transition",
                                    slide === index ? "bg-sky-500" : "bg-neutral-300 dark:bg-neutral-600",
                                ].join(" ")}
                            />
                        ))}
                    </div>
                )}
            </div>

            {caption && (
                <div className="px-4 pb-4 text-sm leading-7 text-neutral-800 dark:text-neutral-200">
                    <span className="font-semibold">{INSTAGRAM_ACCOUNT}</span>{" "}
                    <span className="whitespace-pre-line">{shown}</span>
                    {isLong && (
                        <button
                            type="button"
                            onClick={() => setExpanded((previous) => !previous)}
                            className="ms-1 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                        >
                            {expanded ? "کمتر" : "… بیشتر"}
                        </button>
                    )}
                </div>
            )}
        </article>
    );
}
