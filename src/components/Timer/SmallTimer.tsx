"use client";

import {useEffect, useState} from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function SmallTimer({date}: { date: string }) {
    const targetDate = dayjs(date); // تاریخ هدف
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const updateTimer = () => {
            const now = dayjs();
            const diff = targetDate.diff(now);

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
                return;
            }

            const durationObj = dayjs.duration(diff);
            const totalDays = Math.floor(durationObj.asDays());
            const remainingHours = durationObj.hours();
            const remainingMinutes = durationObj.minutes();

            setTimeLeft({
                days: totalDays,
                hours: remainingHours,
                minutes: remainingMinutes,
            });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000); // هر دقیقه آپدیت شود

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"flex items-center text-sm font-bold gap-0.5 sm:gap-1 text-red-500"} style={{direction:"ltr"}}>
            <span>
                {new Intl.NumberFormat('fa').format(timeLeft.days)}
            </span>
            <span className={"font-bold"}>:</span>
            <span>
                {new Intl.NumberFormat('fa').format(timeLeft.hours)}

            </span>
            <span className={"font-bold"}>:</span>
            <span>
                {new Intl.NumberFormat('fa').format(timeLeft.minutes)}
            </span>
        </div>
    );
}
