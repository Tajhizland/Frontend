"use client";

import React from "react";
import Link from "next/link";
import {useQuery} from "react-query";
import {getCookie} from "cookies-next";
import {me} from "@/services/api/auth/me";
import {HiOutlinePencilSquare} from "react-icons/hi2";

export default function AdminEditShortcut({productId}: { productId: number }) {
    const hasToken = !!getCookie("token");

    const {data: user} = useQuery({
        queryKey: ['user'],
        queryFn: () => me(),
        staleTime: 5000,
        enabled: hasToken,
        retry: false,
    });

    if (!hasToken || user?.role !== "admin") {
        return null;
    }

    return (
        <Link
            href={`/admin/product/edit/${productId}`}
            target="_blank"
            rel="noopener noreferrer"
            title="ویرایش محصول"
            aria-label="ویرایش محصول"
            className="group fixed bottom-24 right-5 z-[120] flex items-center gap-2 rounded-full bg-slate-900/90 py-3 pl-4 pr-4 text-white shadow-lg shadow-slate-900/30 ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-xl sm:bottom-8 dark:bg-white/10 dark:hover:bg-white/20"
        >
            <HiOutlinePencilSquare className="h-5 w-5 flex-shrink-0"/>
            <span
                className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[130px] group-hover:opacity-100">
                ویرایش محصول
            </span>
        </Link>
    );
}
