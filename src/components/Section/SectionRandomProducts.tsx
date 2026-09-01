"use client";

import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon, SparklesIcon} from "@heroicons/react/24/outline";
import {ProductCardResponse} from "@/services/types/product";
import ProductCard2 from "@/components/Card/ProductCard2";

export interface SectionRandomProductsProps {
    className?: string;
    heading?: string;
    data: ProductCardResponse[];
}

/**
 * ریلِ افقیِ «منتخب تجهیزلند».
 *
 * محصولات از سمت سرور به صورت تصادفی از دسته‌بندی‌های تعریف‌شده در پنل می‌آیند،
 * پس اینجا فقط نمایش است و هیچ رندومی سمت کلاینت اتفاق نمی‌افتد (وگرنه خروجی
 * سرور و کلاینت یکی نمی‌شد و hydration می‌شکست).
 */
const SectionRandomProducts: FC<SectionRandomProductsProps> = ({
                                                                  className = "",
                                                                  heading = "منتخب تجهیزلند",
                                                                  data,
                                                              }) => {
    const railRef = useRef<HTMLDivElement | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const syncArrows = useCallback(() => {
        const rail = railRef.current;
        if (!rail) return;

        // در RTL مقدار scrollLeft منفی (یا معکوس) است؛ با قدرمطلق یکسان‌سازی می‌شود.
        const offset = Math.abs(rail.scrollLeft);
        const max = rail.scrollWidth - rail.clientWidth;

        setCanPrev(offset > 8);
        setCanNext(offset < max - 8);
    }, []);

    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;

        syncArrows();
        rail.addEventListener("scroll", syncArrows, {passive: true});
        window.addEventListener("resize", syncArrows);

        return () => {
            rail.removeEventListener("scroll", syncArrows);
            window.removeEventListener("resize", syncArrows);
        };
    }, [syncArrows, data.length]);

    const scrollByPage = (direction: "prev" | "next") => {
        const rail = railRef.current;
        if (!rail) return;

        const isRtl = getComputedStyle(rail).direction === "rtl";
        const amount = rail.clientWidth * 0.85;
        // در RTL حرکت به «بعدی» یعنی رفتن به سمت چپِ فیزیکی.
        const sign = direction === "next" ? (isRtl ? -1 : 1) : (isRtl ? 1 : -1);

        rail.scrollBy({left: sign * amount, behavior: "smooth"});
    };

    if (!data?.length) return null;

    const arrowClass =
        "w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 " +
        "flex items-center justify-center text-neutral-700 dark:text-neutral-200 shadow-xs transition " +
        "hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 " +
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-neutral-700";

    return (
        <section
            dir="rtl"
            className={`nc-SectionRandomProducts relative overflow-hidden rounded-3xl
                        bg-linear-to-bl from-amber-50 via-white to-amber-50/40
                        dark:from-slate-800 dark:via-slate-900 dark:to-slate-800
                        border border-amber-100 dark:border-slate-700
                        px-4 py-6 sm:px-8 sm:py-10 ${className}`}
        >
            {/* لکه‌های تزئینی پس‌زمینه */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -start-20 w-72 h-72 rounded-full bg-[#fcb415]/20 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -end-16 w-72 h-72 rounded-full bg-[#fcb415]/10 blur-3xl"
            />

            <div className="relative">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                        <span
                            className="inline-flex items-center gap-x-1.5 rounded-full bg-[#fcb415]/15 text-[#8a6206]
                                       dark:bg-[#fcb415]/20 dark:text-[#fcb415] px-3 py-1 text-xs font-medium">
                            <SparklesIcon className="w-4 h-4"/>
                            انتخاب تازه
                        </span>

                    </div>

                    <div className="hidden sm:flex items-center gap-x-2">
                        <button
                            type="button"
                            aria-label="محصولات قبلی"
                            onClick={() => scrollByPage("prev")}
                            disabled={!canPrev}
                            className={arrowClass}
                        >
                            <ChevronRightIcon className="w-5 h-5"/>
                        </button>
                        <button
                            type="button"
                            aria-label="محصولات بعدی"
                            onClick={() => scrollByPage("next")}
                            disabled={!canNext}
                            className={arrowClass}
                        >
                            <ChevronLeftIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>

                <div
                    ref={railRef}
                    className="flex gap-3 sm:gap-5 overflow-x-auto hiddenScrollbar snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1"
                >
                    {data.map((product) => (
                        <div
                            key={product.id}
                            className="snap-start shrink-0
                                       w-[calc((100%_-_1.5rem)/3)]
                                       sm:w-[calc((100%_-_3.75rem)/4)]
                                       lg:w-[calc((100%_-_6.25rem)/6)]"
                        >
                            <div
                                className="h-full rounded-2xl bg-white dark:bg-slate-800 border border-neutral-100
                                           dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                <ProductCard2 data={product} className="bg-transparent! dark:bg-transparent!"/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SectionRandomProducts;
