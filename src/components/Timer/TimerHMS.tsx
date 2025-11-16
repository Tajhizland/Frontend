"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function TimerHMS({ date }: { date: string }) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = dayjs(date); // ← منتقل شد داخل useEffect

        const updateTimer = () => {
            const now = dayjs();
            const diff = targetDate.diff(now);

            if (diff <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const d = dayjs.duration(diff);

            setTimeLeft({
                hours: Math.floor(d.asHours()),
                minutes: d.minutes(),
                seconds: d.seconds(),
            });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [date]); // ← این درست‌ترین دیپندنسی است

    const pad = (num: number) => String(num).padStart(2, "0");

    return (
        <div dir={"ltr"} className="flex items-center gap-2 font-bold text-white">
            <div className="bg-white text-black rounded-lg w-10 h-10 flex items-center justify-center">
                {pad(timeLeft.hours)}
            </div>
            :
            <div className="bg-white text-black rounded-lg w-10 h-10 flex items-center justify-center">
                {pad(timeLeft.minutes)}
            </div>
            :
            <div className="bg-white text-black rounded-lg w-10 h-10 flex items-center justify-center">
                {pad(timeLeft.seconds)}
            </div>
        </div>
    );
}
