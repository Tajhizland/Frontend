"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {ArrowLeftIcon, CheckCircleIcon, ClockIcon} from "@heroicons/react/24/outline";
import {openOnHoldOrders} from "@/services/api/shop/onHoldOrder";
import {useUser} from "@/services/globalState/GlobalState";

type Props = {compact?: boolean; onNavigate?: () => void};
const number = (value: number) => value.toLocaleString("fa-IR");

export default function OpenOnHoldOrders({compact = false, onNavigate}: Props) {
    const [user] = useUser();
    const [now, setNow] = useState(() => Date.now());
    const {data, isPending, isError, refetch} = useQuery({
        queryKey: ["open-on-hold-orders", user?.id],
        queryFn: () => openOnHoldOrders(),
        enabled: !!user,
        staleTime: 15000,
        refetchInterval: 60000,
    });

    // Remove expired approvals while the cart stays open, even between refreshes.
    useEffect(() => {
        const deadlines = (data ?? [])
            .filter((item) => Number(item.status) === 1 && item.expire_date_time)
            .map((item) => Number(item.expire_date_time) * 1000)
            .filter((deadline) => deadline > now);
        if (!deadlines.length) return;
        const delay = Math.max(0, Math.min(...deadlines) - Date.now());
        const timer = setTimeout(() => setNow(Date.now()), Math.min(delay + 100, 2147483647));
        return () => clearTimeout(timer);
    }, [data, now]);

    if (!user) return null;
    if (isPending) return <div role="status" className="mb-6 rounded-2xl border border-slate-200 p-4 text-xs text-slate-500 dark:border-slate-700">در حال بررسی سفارش‌های معلق…</div>;
    if (isError) return (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 p-4 text-xs text-slate-500 dark:border-slate-700">
            <span>دریافت سفارش‌های معلق امکان‌پذیر نیست.</span>
            <button type="button" onClick={() => refetch()} className="rounded-lg px-2 py-1 font-semibold text-slate-900 focus-visible:outline-2 dark:text-white">تلاش دوباره</button>
        </div>
    );

    const orders = (data ?? []).filter((item) => Number(item.status) === 0 ||
        (Number(item.status) === 1 && Number(item.expire_date_time) * 1000 > now));
    if (!orders.length) return null;
    const visible = compact ? orders.slice(0, 3) : orders;
    const Heading = compact ? "h3" : "h2";

    return (
        <section aria-label="سفارش‌های معلق باز" className={`mb-6 rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 ${compact ? "p-3" : "p-4 sm:p-6"}`}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <Heading className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                        سفارش‌های معلق
                        <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{number(orders.length)}</span>
                    </Heading>
                    <p className="mt-1.5 text-xs leading-6 text-slate-500 dark:text-slate-400">هر سفارش، پرداخت جداگانه دارد.</p>
                </div>
                <Link href="/account-order-on-hold" onClick={onNavigate} className="inline-flex items-center gap-1 rounded-lg py-1 text-xs font-medium text-slate-600 hover:text-slate-950 focus-visible:outline-2 dark:text-slate-300 dark:hover:text-white">
                    مشاهده همه <ArrowLeftIcon aria-hidden="true" className="h-3.5 w-3.5"/>
                </Link>
            </div>
            <div className={compact ? "space-y-3" : "grid gap-4 lg:grid-cols-2"}>
                {visible.map((item) => {
                    const approved = Number(item.status) === 1;
                    const Icon = approved ? CheckCircleIcon : ClockIcon;
                    return (
                        <article key={item.id} className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-xs font-semibold text-slate-900 dark:text-white">سفارش شماره {number(item.order_id)}</p>
                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${approved ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"}`}>
                                    <Icon aria-hidden="true" className="h-3.5 w-3.5"/>
                                    {approved ? "آماده پرداخت" : "منتظر تأیید"}
                                </span>
                            </div>
                            <p className="mt-3 line-clamp-2 text-xs leading-6 text-slate-600 dark:text-slate-300">{item.product_names.join("، ") || "اقلام سفارش"}</p>
                            <p className="mt-1 text-[11px] text-slate-400">{number(item.items_count)} عدد کالا</p>
                            {approved ? (
                                <div className="mt-auto pt-4">
                                    {item.expire_date && <p className="mb-3 text-[11px] leading-5 text-slate-500 dark:text-slate-400">مهلت پرداخت: <bdi>{item.expire_date}</bdi></p>}
                                    <Link href={`/checkout/on-hold/${item.id}`} onClick={onNavigate} className="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
                                        ادامه و پرداخت این سفارش
                                        <ArrowLeftIcon aria-hidden="true" className="h-4 w-4"/>
                                    </Link>
                                </div>
                            ) : <p className="mt-auto pt-4 text-[11px] leading-6 text-slate-500 dark:text-slate-400">پس از تأیید تجهیزلند، امکان پرداخت این سفارش فعال می‌شود.</p>}
                        </article>
                    );
                })}
            </div>
            {compact && orders.length > visible.length && <Link href="/cart" onClick={onNavigate} className="mt-4 block rounded-lg py-1 text-center text-xs font-medium text-slate-600 dark:text-slate-300">مشاهده {number(orders.length - visible.length)} سفارش دیگر در سبد خرید</Link>}
        </section>
    );
}
