import {timingSafeEqual} from "node:crypto";
import {revalidateTag} from "next/cache";
import {SHOP_CACHE_TAG} from "@/services/server/publicShop";

export const runtime = "nodejs";

export async function POST(request: Request) {
    const secret = process.env.SHOP_REVALIDATE_SECRET;
    if (!secret) return Response.json({error: "Revalidation is not configured"}, {status: 503});
    const authorization = Buffer.from(request.headers.get("authorization") || "");
    const expected = Buffer.from(`Bearer ${secret}`);
    if (authorization.length !== expected.length || !timingSafeEqual(authorization, expected)) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    }
    // Inventory, prices and slugs affect detail pages, category lists and groups.
    // Expire immediately so the next visit cannot receive a stale offer.
    revalidateTag(SHOP_CACHE_TAG, {expire: 0});
    return Response.json({revalidated: true});
}
