"use client";

import React, {useState, useSyncExternalStore} from "react";
import Link from "next/link";
import {FiBookmark, FiHeart} from "react-icons/fi";
import {InstagramPostResponse} from "@/services/types/instagramPost";
import {InstagramProfileResponse} from "@/services/types/instagramProfile";
import InstagramAvatar from "./InstagramAvatar";
import InstagramCarousel from "@/components/Instagram/InstagramCarousel";
import InstagramShareButton from "@/components/Instagram/InstagramShareButton";
import {instagramPostLink, relativeTime} from "@/components/Instagram/helpers";
import {usePostPreference} from "./usePostPreference";

type Props = {
    post: InstagramPostResponse;
    profile: InstagramProfileResponse;
    priority?: boolean;
};

const CAPTION_CLAMP = 180;

/** روی سرور false و بعد از hydrate شدن true — بدون setState داخل افکت */
const neverChanges = () => () => undefined;
const onClient = () => true;
const onServer = () => false;

export default function InstagramPostCard({post, profile, priority}: Props) {
    const media = post.media ?? [];
    const [index, setIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [liked, toggleLiked] = usePostPreference(post.id, "liked");
    const [saved, toggleSaved] = usePostPreference(post.id, "saved");
    // زمان نسبی به «الان» وابسته است و روی سرور و کلاینت یکی درنمی‌آید؛
    // تا قبل از hydrate همان تاریخ شمسیِ سرور نمایش داده می‌شود.
    const mounted = useSyncExternalStore(neverChanges, onClient, onServer);

    if (!media.length) return null;

    const caption = post.caption ?? "";
    const isLong = caption.length > CAPTION_CLAMP;
    const shown = !isLong || expanded ? caption : caption.slice(0, CAPTION_CLAMP).trimEnd();

    return (
        <article dir="ltr"
            className="mx-auto flex w-full max-w-[600px] flex-col bg-white sm:overflow-hidden sm:rounded-sm sm:border sm:border-neutral-200 dark:bg-neutral-900 sm:dark:border-neutral-800">
            <header dir="rtl" className="flex items-center gap-3 px-4 py-3">
                <Link href="/instagram" aria-label={`پروفایل ${profile.name}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-yellow-400 via-rose-500 to-purple-600 p-[2px]">
                    <span
                        className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white p-[2px] dark:bg-neutral-900">
                        <InstagramAvatar profile={profile} sizes="36px"/>
                    </span>
                </Link>
                <div className="flex min-w-0 flex-col leading-tight">
                    <Link href="/instagram" dir="ltr" className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {profile.username}
                    </Link>
                    <span dir="auto" className="mt-1 truncate text-xs text-neutral-500">{profile.name}</span>
                </div>
                <a href={profile.url} target="_blank" rel="noopener noreferrer"
                   className="ms-auto shrink-0 text-xs font-semibold text-sky-500 hover:text-sky-600">دنبال کردن</a>
            </header>

            <div className="min-h-0 min-w-0">
                <InstagramCarousel
                    media={media}
                    index={index}
                    onIndexChange={setIndex}
                    alt={caption ? caption.slice(0, 80) : `پست اینستاگرام ${profile.username}`}
                    priority={priority}
                />
            </div>

            <div dir="rtl" className="px-4 py-3">
                <div className="relative flex min-h-8 items-center gap-4">
                    <button type="button" onClick={toggleLiked} aria-pressed={liked}
                            aria-label={liked ? "حذف از پسندیده‌های این مرورگر" : "پسندیدن در این مرورگر"}
                            title="پسندیده‌های این مرورگر"
                            className="transition hover:opacity-60 active:scale-90">
                        <FiHeart className={`h-6 w-6 ${liked ? "fill-rose-500 text-rose-500" : ""}`}/>
                    </button>
                    <InstagramShareButton link={instagramPostLink(post.id)}/>
                    <button type="button" onClick={toggleSaved} aria-pressed={saved}
                            aria-label={saved ? "حذف از ذخیره‌های این مرورگر" : "ذخیره پست در این مرورگر"}
                            title="ذخیره در این مرورگر"
                            className="ms-auto transition hover:opacity-60 active:scale-90">
                        <FiBookmark className={`h-6 w-6 ${saved ? "fill-current" : ""}`}/>
                    </button>
                </div>
                {media.length > 1 && (
                    <div className="mt-2 flex flex-wrap items-center justify-center" aria-label="انتخاب اسلاید">
                        {media.map((item, slide) => (
                            <button
                                key={item.id}
                                type="button"
                                aria-label={`اسلاید ${slide + 1}`}
                                aria-current={slide === index ? "true" : undefined}
                                onClick={() => setIndex(slide)}
                                className="flex h-6 w-5 items-center justify-center"
                            >
                                <span className={`h-1.5 w-1.5 rounded-full transition ${slide === index ? "bg-sky-500" : "bg-neutral-300 dark:bg-neutral-600"}`}/>
                            </button>
                        ))}
                    </div>
                )}
                {post.view > 0 && <p className="mt-2 text-xs font-semibold">{post.view.toLocaleString("fa-IR")} بازدید</p>}
            </div>

            <div dir="rtl" className="min-h-0 px-4 pb-5 text-sm leading-7 wrap-anywhere text-neutral-800 dark:text-neutral-200">
                {caption && (
                    <>
                        <Link href="/instagram" dir="ltr" className="inline-block font-semibold">{profile.username}</Link>{" "}
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
                    </>
                )}
                <time className="mt-2 block text-[11px] text-neutral-500">
                    {mounted ? relativeTime(post.timestamp, post.created_at) : post.created_at}
                </time>
            </div>
        </article>
    );
}
