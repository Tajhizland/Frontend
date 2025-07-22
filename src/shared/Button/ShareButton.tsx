"use client"
import { FaShareAlt } from 'react-icons/fa';
import { useState } from 'react';

const ShareButton = () => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'عنوان صفحه',
                    text: 'توضیحات یا متن اشتراک‌گذاری',
                    url: window.location.href,
                });
                console.log('محتوا با موفقیت به اشتراک گذاشته شد');
            } catch (error) {
                console.error('خطا در اشتراک‌گذاری:', error);
            }
        } else {
            // در صورت عدم پشتیبانی از Web Share API، لینک به‌صورت خودکار کپی می‌شود
            navigator.clipboard.writeText(window.location.href).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // نمایش پیام موقت برای 2 ثانیه
            }).catch((error) => {
                console.error('خطا در کپی کردن لینک:', error);
                alert('خطا در کپی کردن لینک!');
            });
        }
    };

    return (
        <div
            className="w-fit gap-2 flex items-center justify-center px-4 py-2 rounded-xl bg-white text-slate-800 cursor-pointer text-sm z-10"
            onClick={handleShare}
            role="button"
            aria-label="اشتراک‌گذاری یا کپی لینک"
        >
            <FaShareAlt />
            <span>{copied ? 'لینک کپی شد!' : 'اشتراک‌گذاری'}</span>
        </div>
    );
};

export default ShareButton;
