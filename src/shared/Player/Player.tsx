'use client'; // اگر از App Router در Next.js استفاده می‌کنی

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({src}: { src: string }) => {
    return (
        <AudioPlayer
            src={src}// لینک فایل صوتی
            autoPlay={false} // اختیاری: خودکار پخش نشه
            volume={0.8} // ولوم اولیه
            showJumpControls={true} // دکمه‌های جلو/عقب ۱۰ ثانیه‌ای
            showSkipControls={false} // اگر playlist داری، بعدی/قبلی
            onPlay={() => console.log('در حال پخش')}
            onPause={() => console.log('پاز شد')}
            // props های دیگه: loop, muted, preload="auto" و ...
        />
    );
};

export default Player;