"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer({src , poster}:{src:string ,poster?:string}) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;

        const player = videojs(videoRef.current, {
            controls: true,
            responsive: true,
            fluid: true,
            poster:poster ,
            autoplay: false,
            sources: [
                { src: src, type: "video/mp4" },
                // { src: src, type :"application/x-mpegURL"}, // HLS

            ],
        });

        return () => {
            if (player) player.dispose();
        };
    }, [src]);

    return (
        <div>
            <video ref={videoRef} className="video-js vjs-default-skin" />
        </div>
    );
}
