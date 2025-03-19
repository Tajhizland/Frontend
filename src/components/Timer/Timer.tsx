"use client";

import {useEffect, useState} from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function Timer({date}: { date: string }) {
    const targetDate = dayjs(date); // تاریخ هدف
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateTimer = () => {
            const now = dayjs();
            const diff = targetDate.diff(now); // اختلاف زمانی به میلی‌ثانیه

            if (diff <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const duration = dayjs.duration(diff);
            const totalHours = Math.floor(duration.asHours()); // ساعت کلی

            setTimeLeft({
                hours: totalHours,
                minutes: duration.minutes(),
                seconds: duration.seconds(),
            });
        };

        updateTimer(); // مقدار اولیه
        const interval = setInterval(updateTimer, 1000); // هر ثانیه آپدیت شود

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"flex items-center text-sm font-bold gap-1"} style={{direction:"ltr"}}>
            <div className={"flex justify-center items-center rounded-lg p-1 bg-white w-8 h-8"}>
                {timeLeft.hours}
            </div>
            <span className={"text-white font-bold"}>
                :
            </span>
            <div className={"flex justify-center items-center rounded-lg p-1 bg-white w-8 h-8"}>
                {timeLeft.minutes}
            </div>
            <span className={"text-white font-bold"}>
                :
            </span>
            <div className={"flex justify-center items-center rounded-lg p-1 bg-white w-8 h-8"}>
                {timeLeft.seconds}
            </div>
        </div>
    );
}
