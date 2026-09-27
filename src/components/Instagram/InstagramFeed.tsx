"use client";

import React from "react";
import Link from "next/link";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import {LuX} from "react-icons/lu";
import {getInstagramPostPaginated, findInstagramPostByUrl} from "@/services/api/shop/instagramPost";
import {InstagramPostListingResponse} from "@/services/types/instagramPost";
import InstagramPostCard from "@/components/Instagram/InstagramPostCard";
import {INSTAGRAM_ACCOUNT, POST_QUERY_PARAM} from "@/components/Instagram/helpers";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";

const CardSkeleton = () => (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-9 w-9 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"/>
            <div className="h-3 w-28 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700"/>
        </div>
        <div className="aspect-square w-full animate-pulse bg-neutral-200 dark:bg-neutral-700"/>
        <div className="space-y-2 px-4 py-4">
            <div className="h-3 w-3/4 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700"/>
            <div className="h-3 w-1/2 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700"/>
        </div>
    </div>
);

export default function InstagramFeed({response}: { response: InstagramPostListingResponse }) {
    const searchParams = useSearchParams();
    const sharedUrl = searchParams.get(POST_QUERY_PARAM);

    // پستی که از طریق لینک اشتراک‌گذاری باز شده — جدا گرفته می‌شود تا حتی
    // اگر در صفحه‌ی دهمِ فید باشد، بدون اسکرول بالای صفحه دیده شود.
    const {data: sharedPost, isError: sharedPostFailed} = useQuery({
        queryKey: ["instagram-post", sharedUrl],
        queryFn: () => findInstagramPostByUrl(sharedUrl as string),
        enabled: !!sharedUrl,
        staleTime: 60_000,
        retry: false,
    });

    const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ["instagram-posts"],
        queryFn: async ({pageParam}) => (await getInstagramPostPaginated(pageParam)).listing,
        initialPageParam: 1,
        initialData: {pages: [response.listing], pageParams: [1]},
        getNextPageParam: (lastPage) =>
            lastPage?.meta?.current_page < lastPage?.meta?.last_page
                ? lastPage.meta.current_page + 1
                : undefined,
        refetchOnWindowFocus: false,
    });

    const sentinelRef = useInfiniteScroll({hasNextPage, isFetchingNextPage, fetchNextPage});

    const posts = (data?.pages ?? []).flatMap((page) => page?.data ?? []);
    // پستِ پین‌شده دوباره پایین تکرار نشود
    const rest = sharedPost?.post ? posts.filter((post) => post.url !== sharedPost.post.url) : posts;

    return (
        <div className="mx-auto flex w-full max-w-[470px] flex-col gap-6">
            {sharedPost?.post && (
                <div
                    className="flex items-center justify-between gap-3 rounded-xl bg-neutral-100 px-4 py-2.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    <span>پست اشتراک‌گذاری‌شده</span>
                    <Link href="/instagram" className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white">
                        نمایش همه پست ها
                        <LuX className="h-3.5 w-3.5"/>
                    </Link>
                </div>
            )}

            {sharedPost?.post && <InstagramPostCard post={sharedPost.post} priority highlighted/>}

            {sharedPostFailed && (
                <p className="rounded-xl bg-neutral-100 px-4 py-3 text-center text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    پست مورد نظر پیدا نشد؛ ممکن است حذف شده باشد. در ادامه بقیه‌ی پست ها را می‌بینید.
                </p>
            )}

            {rest.map((post, position) => (
                <InstagramPostCard key={post.id} post={post} priority={!sharedPost?.post && position === 0}/>
            ))}

            {isFetchingNextPage && <CardSkeleton/>}

            {!posts.length && !sharedPost?.post && (
                <p className="py-20 text-center text-sm text-neutral-500">
                    هنوز پستی از {INSTAGRAM_ACCOUNT} منتشر نشده است.
                </p>
            )}

            <div ref={sentinelRef} className="h-px w-full"/>
        </div>
    );
}
