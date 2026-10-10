"use client";

import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import {LuGrid3X3, LuX} from "react-icons/lu";
import {getInstagramPostPaginated, findInstagramPostById} from "@/services/api/shop/instagramPost";
import {InstagramPostListingResponse} from "@/services/types/instagramPost";
import InstagramPostCard from "./InstagramPostCard";
import InstagramExploreCard from "./InstagramExploreCard";
import {INSTAGRAM_ACCOUNT, POST_QUERY_PARAM} from "./helpers";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";

export default function InstagramFeed({response}: {response: InstagramPostListingResponse}) {
    const searchParams = useSearchParams();
    const sharedId = searchParams.get(POST_QUERY_PARAM);
    const validId = !!sharedId && /^[1-9]\d*$/.test(sharedId);

    const {data: sharedPost, isError: sharedPostFailed} = useQuery({
        queryKey: ["instagram-post", sharedId],
        queryFn: () => findInstagramPostById(sharedId as string),
        enabled: validId,
        staleTime: 60_000,
        refetchOnWindowFocus: false,
        retry: false,
    });

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
        hasNextPage: hasNextPage && !sharedId && !isFetchNextPageError,
        isFetchingNextPage,
        fetchNextPage,
        rootMargin: "100px",
    });
    const posts = (data?.pages ?? []).flatMap((page) => page?.data ?? []);
    const selectedPost = sharedPostFailed ? undefined : sharedPost?.post ?? posts.find((post) => String(post.id) === sharedId);

    const openPost = (id: number) => {
        const url = new URL(window.location.href);
        url.searchParams.set(POST_QUERY_PARAM, String(id));
        window.history.pushState(null, "", url.pathname + url.search + url.hash);
    };

    const closePost = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete(POST_QUERY_PARAM);
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    };

    return (
        <div className="mx-auto w-full max-w-[960px]">
            <div className="flex justify-center border-t border-neutral-200 dark:border-neutral-700">
                <div className="-mt-px flex items-center gap-2 border-t border-neutral-900 px-6 py-4 text-xs font-semibold text-neutral-900 dark:border-white dark:text-white">
                    <LuGrid3X3 aria-hidden="true" className="h-4 w-4"/>
                    پست‌ها
                </div>
            </div>

            <div aria-label="اکسپلور اینستاگرام" className="grid grid-cols-3 gap-0.5 sm:gap-1">
                {posts.map((post, index) => (
                    <InstagramExploreCard key={post.id} post={post} onOpen={() => openPost(post.id)} eager={index < 3}/>
                ))}
                {isFetchingNextPage && Array.from({length: 12}, (_, index) => (
                    <div key={index} aria-hidden="true" className="aspect-square animate-pulse bg-neutral-200 dark:bg-neutral-800"/>
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

            <Dialog open={!!sharedId} onClose={closePost} className="fixed inset-0 z-[10000]">
                <DialogBackdrop className="fixed inset-0 bg-black/80"/>
                <div className="fixed inset-0 flex items-center justify-center px-2 py-14 sm:px-6">
                    <DialogPanel className="relative max-h-[calc(100dvh-7rem)] w-full max-w-[470px] overflow-y-auto overscroll-contain rounded-lg bg-white shadow-xl dark:bg-neutral-900">
                        <DialogTitle className="sr-only">نمایش پست اینستاگرام</DialogTitle>
                        <button type="button" onClick={closePost} aria-label="بستن پست" autoFocus
                                className="fixed top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-white sm:top-4 sm:right-4">
                            <LuX className="h-6 w-6"/>
                        </button>
                        {(!validId || sharedPostFailed) ? (
                            <p role="status" className="px-6 py-16 text-center text-sm leading-7 text-neutral-500">
                                پست مورد نظر در دسترس نیست؛ ممکن است حذف شده باشد.
                            </p>
                        ) : selectedPost ? (
                            <InstagramPostCard key={selectedPost.id} post={selectedPost} priority/>
                        ) : (
                            <div role="status" className="flex aspect-square items-center justify-center text-sm text-neutral-500">
                                در حال دریافت پست…
                            </div>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}
