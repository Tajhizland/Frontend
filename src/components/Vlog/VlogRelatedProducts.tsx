"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {StarIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {ProductCardResponse} from "@/services/types/product";
import Prices from "@/components/Price/Prices";
import {isColorAvailable} from "@/utils/productColors";

export default function VlogRelatedProducts({products}: {products: ProductCardResponse[]}) {
    const [dismissed, setDismissed] = useState(false);
    if (!products.length || dismissed) return null;

    return (
        <section aria-label="محصولات مرتبط" dir="rtl"
                 className="mt-3 rounded-xl bg-white p-3 text-right text-neutral-900 dark:bg-neutral-800 dark:text-white lg:absolute lg:bottom-16 lg:left-5 lg:z-10 lg:mt-0 lg:w-[480px] lg:max-w-[55%] lg:rounded-none lg:bg-transparent lg:p-0 lg:dark:bg-transparent">
            <div className="mb-2 flex items-center justify-between gap-3 lg:mb-0 lg:ml-auto lg:w-fit lg:flex-row-reverse lg:justify-center lg:gap-1.5 lg:rounded-t-[28px] lg:bg-white/95 lg:px-5 lg:pb-2 lg:pt-3 lg:dark:bg-neutral-800/95">
                <h2 className="text-xs font-semibold">{products.length === 1 ? "محصول مرتبط" : "محصولات مرتبط"}</h2>
                <button type="button" aria-label="بستن محصولات مرتبط" onClick={() => setDismissed(true)}
                        className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-primary-500 lg:bg-red-500 lg:p-0.5 lg:text-white lg:hover:bg-red-600">
                    <XMarkIcon className="h-4 w-4 lg:h-3 lg:w-3"/>
                </button>
            </div>
            <div className="max-h-48 space-y-3 overflow-y-auto overscroll-contain lg:max-h-80 lg:space-y-0 lg:bg-white/95 lg:dark:bg-neutral-800/95">
                {products.map(product => {
                    const available = product.colors.filter(isColorAvailable);
                    const color = available.reduce<(typeof available)[number] | undefined>((lowest, current) =>
                        !lowest || current.price < lowest.price ? current : lowest, undefined);
                    const price = color?.discountItem?.[0]?.discount_price || color?.price;
                    return (
                        <Link key={product.id} href={`/product/${product.url}`}
                              className="flex items-center gap-3 rounded-lg p-1 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-primary-500 dark:hover:bg-neutral-700 lg:grid lg:min-h-36 lg:grid-cols-[100px_minmax(0,1fr)_110px] lg:grid-rows-[auto_1fr] lg:gap-x-3 lg:gap-y-2 lg:rounded-none lg:border-b lg:border-neutral-100 lg:p-4 lg:last:border-b-0 lg:dark:border-neutral-700">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white lg:row-span-2 lg:h-28 lg:w-full lg:rounded-none">
                                {product.images?.[0]?.url && <Image fill sizes="(min-width: 1024px) 100px, 80px" className="object-contain"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product.images[0].url}`} alt={product.name}/>}
                            </div>
                            <div className="min-w-0 flex-1 space-y-2 lg:contents lg:space-y-0">
                                <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-300 lg:col-start-2 lg:row-start-1 lg:pt-2">
                                    <StarIcon className="h-4 w-4 text-amber-400"/>
                                    <span>{product.rating || 0} ({product.comments_count || 0} نظر)</span>
                                </div>
                                <h3 className="line-clamp-2 text-xs font-medium leading-6 lg:col-start-2 lg:row-start-2 lg:self-start lg:pt-1">{product.name}</h3>
                                <div className="flex flex-wrap items-center justify-end gap-2 lg:col-start-3 lg:row-start-2 lg:justify-start lg:self-start lg:pt-1">
                                    {color && price && price < color.price && <del className="text-xs text-neutral-400">{new Intl.NumberFormat("fa").format(color.price)}</del>}
                                    {price ? <Prices price={price}/> : <span className="text-xs text-red-500">ناموجود</span>}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
