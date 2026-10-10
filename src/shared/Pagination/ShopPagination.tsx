import Link from "next/link";
import {paginatedPath} from "@/utils/seo";

type Props = {currentPage: number; totalPages: number; url: string};

export default function ShopPagination({currentPage, totalPages, url}: Props) {
    if (!Number.isFinite(totalPages) || totalPages <= 1) return null;
    const pages = [...new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages])]
        .filter(page => page >= 1 && page <= totalPages).sort((a, b) => a - b);
    const className = "inline-flex items-center justify-center rounded-lg border px-3 py-2 dark:text-white";
    return <nav aria-label="صفحه‌بندی" className="flex flex-wrap justify-center items-center gap-2 my-8">
        {currentPage > 1 && <Link prefetch={false} rel="prev" className={className}
            href={paginatedPath(url, currentPage - 1)}>صفحه قبل</Link>}
        {pages.map((page, index) => <span key={page} className="inline-flex items-center gap-2">
            {index > 0 && page - pages[index - 1] > 1 && <span aria-hidden="true">…</span>}
            <Link prefetch={false} href={paginatedPath(url, page)} aria-label={`صفحه ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={`${className} ${page === currentPage ? "bg-primary-100 font-bold" : ""}`}>
                {page.toLocaleString("fa-IR")}
            </Link>
        </span>)}
        {currentPage < totalPages && <Link prefetch={false} rel="next" className={className}
            href={paginatedPath(url, currentPage + 1)}>صفحه بعد</Link>}
    </nav>;
}
