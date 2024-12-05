//@ts-nocheck
"use client"

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { BarLoader } from "react-spinners";

const AutoLoading = () => {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleStop = () => setIsLoading(false);

        //@ts-ignore
        const handleLinkClick = (e) => {
            const target = e.target.closest('a');
            const href = target?.getAttribute('href');
            // بررسی آدرس لینک و جلوگیری از نمایش لودینگ در صورتی که لینک به صفحه فعلی باشد
            if (target && href?.startsWith('/') && href !== pathname) {
                handleStart();
            }
        };

        document.addEventListener('click', handleLinkClick);

        return () => {
            document.removeEventListener('click', handleLinkClick);
        };
    }, [pathname]);

    useEffect(() => {
        setIsLoading(false);
    }, [pathname, searchParams]);

    if (!isLoading) return null;

    return (
        <div className="fixed top-0 right-0 left-0 z-50">
            <BarLoader color="#fcb415" width="100%" loading={true} />
        </div>
    );
};

export default AutoLoading;
