// app/error.js
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    useEffect(() => {
        // می‌توانید اینجا لاگ خطا را برای بررسی ثبت کنید
        console.error(error);
    }, [error]);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>خطای 500 - مشکلی در سرور رخ داده است</h1>
            <p>لطفاً بعداً دوباره امتحان کنید.</p>
            <p>
                <Link href="/">بازگشت به صفحه اصلی</Link>
            </p>
            <button onClick={() => reset()}>تلاش مجدد</button>
        </div>
    );
}
