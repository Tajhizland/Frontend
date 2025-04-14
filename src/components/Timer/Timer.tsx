"use client";

import {useEffect, useState} from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function Timer({date, label = false}: { date: string, label?: boolean }) {
    const targetDate = dayjs(date); // تاریخ هدف
    const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0});

    useEffect(() => {
        const updateTimer = () => {
            const now = dayjs();
            const diff = targetDate.diff(now);

            if (diff <= 0) {
                setTimeLeft({days: 0, hours: 0, minutes: 0});
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
        <div className={"flex items-center text-sm font-bold gap-0.5 sm:gap-1"} style={{direction: "ltr"}}>
            <div className={"flex flex-col items-center relative"}>
                <div
                    className={"flex justify-center items-center rounded-lg p-1 bg-white  w-8 h-8 sm:w-10 sm:h-10 text-black"}>
                    {timeLeft.days}
                </div>
                {label && <span  className={"absolute -bottom-5 text-xs"}>روز</span>}
            </div>
            <span className={"text-white font-bold"}>:</span>
            <div className={"flex flex-col items-center relative"}>
                 <div
                    className={"flex justify-center items-center rounded-lg p-1 bg-white w-8 h-8 sm:w-10 sm:h-10 text-black"}>
                    {timeLeft.hours}
                </div>
                {label && <span  className={"absolute -bottom-5 text-xs"}>ساعت</span>}
            </div>

            <span className={"text-white font-bold"}>:</span>
            <div className={"flex flex-col items-center relative"}>
                <div
                    className={"flex justify-center items-center rounded-lg p-1 bg-white w-8 h-8 sm:w-10 sm:h-10 text-black"}>
                    {timeLeft.minutes}
                </div>
                {label && <span className={"absolute -bottom-5 text-xs"}>دقیقه</span>}
            </div>
        </div>
    );
}
