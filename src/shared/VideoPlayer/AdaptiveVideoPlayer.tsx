//@ts-nocheck
"use client";

import {useEffect, useRef, useState} from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export interface AdaptiveVideoPlayerProps {
    /** آدرس mp4 */
    src?: string | null;
    /** آدرس پلی‌لیست HLS؛ اگر باشد بر mp4 اولویت دارد */
    hls?: string | null;
    poster?: string;
    /** کلاس‌های اضافه‌ی قاب؛ معمولا برای محدود کردن ارتفاع (مثلا max-h-[520px]) */
    className?: string;
}

/** نسبت تصویرِ قابِ ویدیوهای عمودی؛ ۴:۵ مثل پستِ اینستاگرام. */
const PORTRAIT_FRAME_RATIO = 0.8;
/** نسبت پیش‌فرض تا وقتی ابعاد واقعی ویدیو مشخص شود. */
const DEFAULT_RATIO = 16 / 9;

/**
 * پلیری که با ویدیوی افقی و عمودی هر دو درست کار می‌کند.
 *
 * مشکل پلیرهای قبلی این بود که با fluid:true خودِ video.js ارتفاع را از نسبت
 * تصویر ویدیو می‌ساخت؛ برای یک ویدیوی ۹:۱۶ یعنی یک ستون بلندِ ۱۷۷ درصدی که
 * چیدمان صفحه را می‌شکست.
 *
 * اینجا به جای آن:
 *  - قاب بیرونی نسبتِ کنترل‌شده دارد (افقی: نسبت خود ویدیو، عمودی: ۴:۵) و
 *    با max-height هم محدود می‌شود، پس هیچ‌وقت از صفحه بیرون نمی‌زند.
 *  - خود پلیر دقیقا هم‌نسبتِ ویدیو است و وسط قاب می‌نشیند، پس نوار سیاه داخل
 *    پلیر نداریم.
 *  - فضای خالیِ کنارِ ویدیوی عمودی با نسخه‌ی بلورشده‌ی پوستر پر می‌شود.
 *
 * نسبت اول از خودِ پوستر حدس زده می‌شود (چون معمولا هم‌جهتِ ویدیوست) و بعد با
 * loadedmetadata دقیق می‌شود؛ این‌طوری پرش چیدمان (CLS) به حداقل می‌رسد.
 */
export default function AdaptiveVideoPlayer({src, hls, poster, className = "max-h-[80vh]"}: AdaptiveVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<videojs.Player | null>(null);
    const [ratio, setRatio] = useState<number>(DEFAULT_RATIO);

    const source = hls && hls !== ""
        ? {src: hls, type: "application/x-mpegURL"}
        : {src: src ?? "", type: "video/mp4"};

    // نسبت تصویر از روی پوستر (حدس اولیه)
    useEffect(() => {
        if (!poster) return;

        const image = new Image();
        image.onload = () => {
            if (image.naturalWidth > 0 && image.naturalHeight > 0) {
                setRatio(image.naturalWidth / image.naturalHeight);
            }
        };
        image.src = poster;
    }, [poster]);

    useEffect(() => {
        if (!videoRef.current || !source.src) return;

        const applyRealRatio = () => {
            const width = playerRef.current?.videoWidth?.();
            const height = playerRef.current?.videoHeight?.();
            if (width > 0 && height > 0) {
                setRatio(width / height);
            }
        };

        if (!playerRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                responsive: true,
                // قاب را خودمان می‌سازیم؛ fluid ارتفاع را از ویدیو می‌گرفت و چیدمان را می‌شکست.
                fluid: false,
                fill: true,
                poster: poster,
                autoplay: false,
                playsinline: true,
                // بدون metadata رویداد loadedmetadata نمی‌آید و جهت واقعی ویدیو مشخص نمی‌شود.
                preload: "metadata",
            });

            playerRef.current.on("loadedmetadata", applyRealRatio);
            playerRef.current.ready(() => {
                playerRef.current?.src([source]);
            });
        } else {
            playerRef.current.poster(poster || "");
            playerRef.current.src([source]);
        }
    }, [source.src, source.type, poster]);

    useEffect(() => {
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    const frameRatio = ratio < 1 ? PORTRAIT_FRAME_RATIO : ratio;

    return (
        <div
            className={`nc-AdaptiveVideoPlayer relative w-full overflow-hidden rounded-2xl bg-neutral-900 ${className}`}
            style={{aspectRatio: `${frameRatio}`}}
        >
            {/* پس‌زمینه‌ی بلور برای پر کردن فضای خالیِ کنار ویدیو (عمودی، یا افقیِ محدودشده با max-height) */}
            {poster && (
                <img
                    src={poster}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50"
                />
            )}

            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="h-full max-h-full max-w-full"
                    style={{aspectRatio: `${ratio}`}}
                >
                    <video
                        ref={videoRef}
                        playsInline
                        className="video-js vjs-default-skin w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
}
