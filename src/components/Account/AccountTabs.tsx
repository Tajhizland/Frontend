"use client";

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ArrowsRightLeftIcon} from "@heroicons/react/24/outline";

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

    return <nav aria-label="بخش‌های حساب کاربری" className="mt-8 border-t border-slate-200 dark:border-slate-700">
        <div ref={viewport} dir="rtl" className="flex gap-3 overflow-x-auto overscroll-x-contain hiddenScrollbar border-b border-slate-200 dark:border-slate-700">
            {pages.map((item) => {
                const active = pathname === item.link;
                return <Link key={item.link} href={item.link} aria-current={active ? "page" : undefined}
                    className={`shrink-0 flex flex-col items-center pt-4 pb-4 -mb-px border-b-2 transition-colors ${active ? "border-primary-500" : "border-transparent"}`}>
                    <span className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm sm:text-base transition-colors ${active
                        ? "border-primary-500 font-medium text-slate-900 dark:text-slate-100"
                        : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 hover:border-slate-300 dark:hover:text-slate-200"}`}>
                        {item.name}
                    </span>
                </Link>;
            })}
        </div>
        {(edges.before || edges.after) && <p className="flex items-center justify-center gap-1.5 pt-2 text-center text-[11px] leading-5 text-slate-500 dark:text-slate-400 sm:hidden">
            <ArrowsRightLeftIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0"/>
            برای دیدن بقیه بخش‌ها، نوار را به طرفین بکشید.
        </p>}
    </nav>;
}
