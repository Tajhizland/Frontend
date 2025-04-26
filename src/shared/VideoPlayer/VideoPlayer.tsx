//@ts-nocheck
"use client";
import {useEffect, useRef} from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer({src, poster}: { src: string; poster?: string }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<videojs.Player | null>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        if (!playerRef.current) {
            // فقط یکبار پلیر ساخته بشه
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                responsive: true,
                fluid: true,
                poster: poster,
                autoplay: false,
            });
        } else {
            // اگر پلیر ساخته شده بود، فقط سورس رو تغییر بده
            playerRef.current.poster(poster || "");

            playerRef.current.src([
                {src: src, type: "video/mp4"},
                // { src: src, type: "application/x-mpegURL" }, // HLS اگر خواستی
            ]);
        }
    }, [src, poster]);

    useEffect(() => {
        return () => {
            // در نهایت وقتی کامپوننت destroy شد پلیر رو dispose کن
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    return (
        <div>
            <video ref={videoRef} className="video-js vjs-default-skin"/>
        </div>
    );
}