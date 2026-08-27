import React, {FC} from "react";
import Image from "next/image";

export interface VlogPosterProps {
    /** نام فایل پوستر (بدون مسیر) */
    poster?: string | null;
    className?: string;
    sizes?: string;
    alt?: string;
}

/**
 * قابِ ثابتِ ۱۶:۹ برای پوستر ولاگ که با پوستر عمودی هم درست کار می‌کند.
 *
 * قاب عمدا ثابت است تا کارت‌های کنار هم در گرید هم‌ارتفاع بمانند. پوستر با
 * object-contain داخل قاب می‌نشیند (پس بریده نمی‌شود) و فضای خالیِ دو طرف با
 * نسخه‌ی بلورشده‌ی خودش پر می‌شود؛ همان کاری که یوتیوب برای ویدیوی عمودی می‌کند.
 */
const VlogPoster: FC<VlogPosterProps> = ({
                                             poster,
                                             className = "",
                                             sizes = "(max-width: 640px) 50vw, 25vw",
                                             alt = "vlog",
                                         }) => {
    const src = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${poster}`;

    return (
        <div className={`relative w-full aspect-16/9 overflow-hidden bg-neutral-200 dark:bg-black/40 ${className}`}>
            <Image
                src={src}
                alt=""
                aria-hidden="true"
                fill
                sizes={sizes}
                className="object-cover scale-110 blur-xl opacity-60"
            />
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                className="relative object-contain"
            />
        </div>
    );
};

export default VlogPoster;
