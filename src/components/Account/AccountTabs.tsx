"use client";

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";

export default function AccountTabs({pages}: {pages: {name: string; link: string}[]}) {
    const pathname = usePathname();
    const viewport = useRef<HTMLDivElement>(null);
    const [edges, setEdges] = useState({before: false, after: false});

    useEffect(() => {
        const element = viewport.current;
        if (!element) return;
        const update = () => {
            const bounds = element.getBoundingClientRect();
            const first = element.firstElementChild?.getBoundingClientRect();
            const last = element.lastElementChild?.getBoundingClientRect();
            setEdges({before: !!first && first.right > bounds.right + 2, after: !!last && last.left < bounds.left - 2});
        };
        const frame = requestAnimationFrame(update);
        const observer = new ResizeObserver(update);
        observer.observe(element);
        element.addEventListener("scroll", update, {passive: true});
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            element.removeEventListener("scroll", update);
        };
    }, []);

    useEffect(() => {
        viewport.current?.querySelector('[aria-current="page"]')?.scrollIntoView({block: "nearest", inline: "nearest", behavior: "smooth"});
    }, [pathname]);

    return <nav aria-label="بخش‌های حساب کاربری" className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-2 dark:border-slate-700 dark:bg-slate-800/40">
        <div className="relative px-9" dir="rtl">
            <button type="button" aria-label="بخش‌های قبلی" disabled={!edges.before}
                onClick={() => viewport.current?.scrollBy({left: 240, behavior: "smooth"})}
                className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-25 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
                <ChevronRightIcon className="h-4 w-4"/>
            </button>
            <div ref={viewport} className="flex gap-2 overflow-x-auto overscroll-x-contain py-2" style={{scrollbarWidth: "thin"}}>
                {pages.map((item) => <Link key={item.link} href={item.link} aria-current={pathname === item.link ? "page" : undefined}
                    className={`shrink-0 whitespace-nowrap rounded-xl border px-4 py-2.5 text-xs transition-colors sm:text-sm ${pathname === item.link ? "border-primary-500 bg-primary-500 font-medium text-slate-950" : "border-slate-200 bg-white text-slate-600 hover:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                    {item.name}
                </Link>)}
            </div>
            <button type="button" aria-label="بخش‌های بعدی" disabled={!edges.after}
                onClick={() => viewport.current?.scrollBy({left: -240, behavior: "smooth"})}
                className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-25 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
                <ChevronLeftIcon className="h-4 w-4"/>
            </button>
        </div>
        {(edges.before || edges.after) && <p className="px-2 pb-1 text-center text-[11px] leading-5 text-slate-500 dark:text-slate-400">برای دیدن بقیه بخش‌ها، نوار را به طرفین بکشید یا از فلش‌ها استفاده کنید.</p>}
    </nav>;
}
