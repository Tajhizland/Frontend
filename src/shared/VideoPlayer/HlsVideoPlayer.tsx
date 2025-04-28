//@ts-nocheck
"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function HlsVideoPlayer({ src, poster }: { src: string; poster?: string }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<videojs.Player | null>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        if (!playerRef.current) {
            // اولین بار پلیر بساز
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                responsive: true,
                fluid: true,
                poster: poster,
                autoplay: false,
            });

            // وقتی پلیر آماده شد
            playerRef.current.ready(() => {
                if (src) {
                    playerRef.current?.src([
                        { src: src, type :"application/x-mpegURL"},
                    ]);
                    // playerRef.current?.play().catch((e) => {
                    //     console.log("Autoplay prevented on first load", e);
                    // });
                }
            });
        } else {
            // اگر پلیر ساخته شده بود فقط سورس عوض کن
            playerRef.current.poster(poster || "");
            playerRef.current.src([
                { src: src, type :"application/x-mpegURL"},
            ]);
            // playerRef.current.play().catch((e) => {
            //     console.log("Autoplay prevented on source change", e);
            // });
        }
    }, [src, poster]);

    useEffect(() => {
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    return (
        <div>
            <video ref={videoRef} className="video-js vjs-default-skin" />
        </div>
    );
}
