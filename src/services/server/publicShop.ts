import "server-only";
import {cache} from "react";
import {unstable_cache} from "next/cache";
import {notFound, permanentRedirect} from "next/navigation";
import {absoluteUrl} from "@/utils/seo";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/+$/, "");
export const SHOP_CACHE_TAG = "shop-public";

async function readPublicShop(path: string, slug?: string): Promise<unknown> {
    if (!apiUrl) throw new Error("NEXT_PUBLIC_BACKEND_API_URL is required");
    // Never forward cookies, authorization, session IDs or visitor-specific data
    // into a cache shared by shoppers. Browser API requests remain unchanged.
    const response = await fetch(`${apiUrl}/${path}`, {
        method: slug === undefined ? "GET" : "POST",
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        ...(slug !== undefined && {body: JSON.stringify({url: slug})}),
        redirect: "manual",
        cache: "no-store",
        signal: AbortSignal.timeout(30000),
    });
    if (response.status === 404) notFound();
    const payload = await response.json();
    if (response.status === 301 || response.status === 308) {
        const destination = payload.result?.destination;
        if (typeof destination !== "string" || !destination) throw new Error("Missing redirect destination");
        // URL preserves already encoded Persian slugs; encodeURI would encode % twice.
        permanentRedirect(absoluteUrl(destination));
    }
    if (!response.ok || !payload.success || payload.result?.data == null) {
        throw new Error(`Public shop API failed: ${path} (${response.status})`);
    }
    return payload.result.data;
}

// This application uses the App Router without Cache Components. Cache only
// validated successful reads; errors, redirects and notFound are never stored.
const cachedRead = unstable_cache(readPublicShop, ["shop-public-v1", apiUrl || ""], {
    revalidate: 300,
    tags: [SHOP_CACHE_TAG],
});
const requestRead = cache((path: string, slug?: string, allowCache = true) => {
    // Deploy the backend invalidation hook and shared secret before enabling
    // persistent catalog caching. Without them, prices remain request-fresh.
    return allowCache && process.env.SHOP_REVALIDATE_SECRET
        ? cachedRead(path, slug)
        : readPublicShop(path, slug);
});

export function publicShopRead<T>(path: string, slug?: string, allowCache = true): Promise<T> {
    return requestRead(path, slug, allowCache) as Promise<T>;
}
