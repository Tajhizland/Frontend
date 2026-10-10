import Link from "next/link";

export default function NotFound() {
    return (
        <main dir="rtl" className="mx-auto max-w-lg px-6 py-24 text-center">
            <h1 className="text-xl font-semibold">این پست در دسترس نیست</h1>
            <p className="mt-3 text-sm leading-7 text-neutral-500">ممکن است پست حذف شده باشد یا نشانی آن درست نباشد.</p>
            <Link href="/instagram" className="mt-6 inline-block text-sm font-semibold text-sky-600">بازگشت به پست‌ها</Link>
        </main>
    );
}
