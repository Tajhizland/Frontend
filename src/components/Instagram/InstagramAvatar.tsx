"use client";

import {useState} from "react";
import Image from "next/image";
import logo from "@/images/lightSmallLogo.png";
import {InstagramProfileResponse} from "@/services/types/instagramProfile";
import {instagramAvatarUrl} from "./helpers";

export default function InstagramAvatar({profile, sizes = "144px"}: {
    profile: InstagramProfileResponse;
    sizes?: string;
}) {
    const [failedImage, setFailedImage] = useState<string | null>(null);
    const avatar = instagramAvatarUrl(profile.avatar);
    const src = avatar && failedImage !== avatar ? avatar : null;

    return <Image src={src ?? logo} alt={`پروفایل ${profile.name}`} width={144} height={144}
                  sizes={sizes} className={`h-full w-full ${src ? "object-cover" : "object-contain"}`}
                  onError={() => setFailedImage(avatar ?? null)}/>;
}
