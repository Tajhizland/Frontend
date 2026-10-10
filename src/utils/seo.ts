import type {Metadata} from "next";
import {stripHTML} from "../hooks/StripHtml";

export const SITE_URL = (process.env.NEXT_PUBLIC_WEBSITE_URL || "https://tajhizland.com").replace(/\/+$/, "");
export const SITE_DESCRIPTION = "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی، رستوران، فست فود و کافی شاپ؛ خرید و مشاوره تخصصی از تجهیزلند.";

export function absoluteUrl(path: string): string {
    return new URL(path.replace(/^\/+/, ""), `${SITE_URL}/`).href;
}

export function assetUrl(folder: string, filename?: string | null): string | undefined {
    if (!filename) return undefined;
    if (/^https?:\/\//.test(filename)) return filename;
    const base = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL || SITE_URL).replace(/\/+$/, "");
    return `${base}/${folder}/${filename}`;
}

export function metaDescription(html?: string | null, max = 155): string {
    const text = stripHTML(html || "").replace(/\s+/g, " ").trim();
    if (text.length <= max) return text;
    const shortened = text.slice(0, max - 1);
    const boundary = shortened.lastIndexOf(" ");
    return `${boundary > max / 2 ? shortened.slice(0, boundary) : shortened}…`;
}

export function pageNumber(value?: string | string[]): number {
    const raw = Array.isArray(value) ? value[0] : value;
    if (!raw || !/^[1-9]\d*$/.test(raw)) return 1;
    const page = Number(raw);
    return Number.isSafeInteger(page) ? page : 1;
}

export function paginatedPath(path: string, page = 1): string {
    return page > 1 ? `${path}?page=${page}` : path;
}

export function isoDate(value?: string | null): string | undefined {
    // The API also returns Jalali display dates. Those must never become schema dates.
    if (!value || !/^(19|20)\d{2}-\d{2}-\d{2}(?:T|$)/.test(value)) return undefined;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

type PageMetadata = {
    title: string;
    description?: string | null;
    path: string;
    image?: string;
    page?: number;
    noindex?: boolean;
    type?: "website" | "article" | "video.other" | "product";
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
};

export function buildMetadata(options: PageMetadata): Metadata {
    const page = options.page || 1;
    const title = page > 1 ? `${options.title} — صفحه ${page}` : options.title;
    const description = metaDescription(options.description) || metaDescription(options.title);
    const url = absoluteUrl(paginatedPath(options.path, page));
    const images = [options.image || absoluteUrl("/logo.png")];
    return {
        title,
        description,
        alternates: {canonical: url},
        robots: {index: !options.noindex, follow: true},
        openGraph: {
            title, description, url, images,
            siteName: "تجهیزلند", locale: "fa_IR",
            // Next's Metadata API does not support the Open Graph product extension.
            // ProductOpenGraph renders it as a native, server-rendered meta element.
            ...(options.type !== "product" && {type: options.type || "website"}),
            ...(options.type === "article" && {
                publishedTime: isoDate(options.publishedTime),
                modifiedTime: isoDate(options.modifiedTime),
                authors: options.author ? [options.author] : undefined,
            }),
        },
        twitter: {card: "summary_large_image", title, description, images},
    };
}

export function serializeJsonLd(data: unknown): string {
    return JSON.stringify(data).replace(/</g, "\\u003c");
}

// Heading normalization is separate from HTML sanitization.
export function normalizeContentHeadings(html?: string | null): string {
    return (html || "").replace(/<(\/?)[hH]1(?=[\s>])/g, "<$1h2");
}

export function breadcrumbSchema(items: {name: string; url: string}[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{name: "خانه", url: "/"}, ...items].map((item, index) => ({
            "@type": "ListItem", position: index + 1,
            name: item.name, item: absoluteUrl(item.url),
        })),
    };
}
