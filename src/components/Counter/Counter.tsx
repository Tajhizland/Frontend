import React, {useState, useEffect} from 'react';

interface CountdownTimerProps {
    initialSeconds: number;
    end?:() => void;
}

const Counter: React.FC<CountdownTimerProps> = ({initialSeconds ,end}) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);

    useEffect(() => {
        if(timeLeft==0 && end){
            end()
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
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            {formatTime(timeLeft)}
        </div>

    );
};

export default Counter;
