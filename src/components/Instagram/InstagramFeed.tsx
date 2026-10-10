"use client";

import {useInfiniteQuery} from "@tanstack/react-query";
import {LuGrid3X3} from "react-icons/lu";
import {getInstagramPostPaginated} from "@/services/api/shop/instagramPost";
import {InstagramPostListingResponse} from "@/services/types/instagramPost";
import InstagramExploreCard from "./InstagramExploreCard";
import {INSTAGRAM_ACCOUNT} from "./helpers";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";

export default function InstagramFeed({response}: {response: InstagramPostListingResponse}) {
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError} = useInfiniteQuery({
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

    const sentinelRef = useInfiniteScroll({
        hasNextPage: hasNextPage && !isFetchNextPageError,
        isFetchingNextPage,
        fetchNextPage,
        rootMargin: "100px",
    });
    const posts = (data?.pages ?? []).flatMap((page) => page?.data ?? [])
        .filter((post, index, all) => post.media?.length && all.findIndex((item) => item.id === post.id) === index);

    return (
        <div className="mx-auto w-full max-w-[960px]">
            <div className="flex justify-center border-t border-neutral-200 dark:border-neutral-700">
                <div className="-mt-px flex items-center gap-2 border-t border-neutral-900 px-6 py-4 text-xs font-semibold text-neutral-900 dark:border-white dark:text-white">
                    <LuGrid3X3 aria-hidden="true" className="h-4 w-4"/>
                    پست‌ها
                </div>
            </div>

            <div aria-label="پست‌های اینستاگرام" className="grid grid-cols-3 gap-[3px]">
                {posts.map((post, index) => (
                    <InstagramExploreCard key={post.id} post={post} eager={index < 6}/>
                ))}
                {isFetchingNextPage && Array.from({length: 12}, (_, index) => (
                    <div key={index} aria-hidden="true" className="aspect-[3/4] animate-pulse bg-neutral-200 dark:bg-neutral-800"/>
                ))}
            </div>

            {!posts.length && (
                <p className="px-4 py-20 text-center text-sm text-neutral-500">
                    هنوز پستی از {INSTAGRAM_ACCOUNT} منتشر نشده است.
                </p>
            )}

            {isFetchNextPageError && (
                <div className="py-6 text-center text-sm text-neutral-500" role="status">
                    دریافت پست‌های بیشتر انجام نشد.
                    <button type="button" onClick={() => fetchNextPage()} className="ms-2 text-sky-600">تلاش دوباره</button>
                </div>
            )}
            <div ref={sentinelRef} className="h-px w-full"/>

        </div>
    );
}
