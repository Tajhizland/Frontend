import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    initialSeconds: number;
    end?: () => void;
}

const Counter2: React.FC<CountdownTimerProps> = ({ initialSeconds, end }) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);

    useEffect(() => {
        if (timeLeft === 0 && end) {
            end();
        }
        if (timeLeft <= 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, end]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600); // محاسبه ساعت
        const minutes = Math.floor((seconds % 3600) / 60); // محاسبه دقیقه
        const secs = seconds % 60; // محاسبه ثانیه
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return <div>{formatTime(timeLeft)}</div>;
};

export default Counter2;
