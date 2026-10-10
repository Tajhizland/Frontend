"use client";

import {useState} from "react";
import Image from "next/image";
import {LuClapperboard, LuLayers, LuPlay} from "react-icons/lu";
import logo from "@/images/lightSmallLogo.png";
import {InstagramPostResponse} from "@/services/types/instagramPost";
import {INSTAGRAM_ACCOUNT} from "./helpers";

export default function InstagramExploreCard({post, onOpen, eager}: {
    post: InstagramPostResponse;
    onOpen: () => void;
    eager?: boolean;
}) {
    const [failedImage, setFailedImage] = useState<string | null>(null);
    const media = post.media ?? [];
    const first = media[0];
    if (!first) return null;

    const file = first.type === "video" ? first.cover : first.file;
    const cover = file ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/instagram/${file}` : null;
    const caption = post.caption?.trim().slice(0, 100) || `پست ${INSTAGRAM_ACCOUNT}`;

    return (
        <button type="button" onClick={onOpen} aria-haspopup="dialog" aria-label={`باز کردن ${caption}`}
                className="group relative aspect-square w-full overflow-hidden bg-neutral-100 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:bg-neutral-800">
            {cover && failedImage !== cover ? (
                <Image src={cover} alt={caption} fill
                       sizes="(max-width: 960px) 33vw, 320px"
                       loading={eager ? "eager" : "lazy"}
                       className="object-cover" onError={() => setFailedImage(cover)}/>
            ) : (
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-100 dark:bg-neutral-800">
                    <Image src={logo} alt="" className="h-12 w-12 object-contain opacity-60 sm:h-20 sm:w-20"/>
                    {first.type === "video" && <LuPlay aria-hidden="true" className="h-6 w-6 text-neutral-500 sm:h-8 sm:w-8"/>}
                </span>
            )}
            <span aria-hidden="true" className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15 group-focus-visible:bg-black/15"/>
            <span aria-hidden="true" className="absolute top-2 right-2 text-white drop-shadow-md sm:top-3 sm:right-3">
                {media.length > 1 ? <LuLayers className="h-5 w-5 fill-black/20 sm:h-6 sm:w-6"/>
                    : first.type === "video" ? <LuClapperboard className="h-5 w-5 fill-black/20 sm:h-6 sm:w-6"/> : null}
            </span>
        </button>
    );
}
