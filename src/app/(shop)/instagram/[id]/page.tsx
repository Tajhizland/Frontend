import {cache} from "react";
import {isAxiosError} from "axios";
import Link from "next/link";
import {notFound} from "next/navigation";
import {LuChevronRight} from "react-icons/lu";
import InstagramPostCard from "@/components/Instagram/InstagramPostCard";
import {findInstagramPostById} from "@/services/api/shop/instagramPost";
import {instagramPostPath} from "@/components/Instagram/helpers";
import {assetUrl, buildMetadata} from "@/utils/seo";

export const dynamic = "force-dynamic";

const getPost = cache(async (id: string) => {
    if (!/^[1-9]\d*$/.test(id)) notFound();
    const response = await findInstagramPostById(id).catch((error: unknown) => {
        if (isAxiosError(error) && error.response?.status === 404) notFound();
        throw error;
    });
    if (!response?.post?.media?.length) notFound();
    return response.post;
});

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props) {
    const {id} = await params;
    const post = await getPost(id);
    const first = post.media?.[0];
    return buildMetadata({
        title: "پست اینستاگرام تجهیزلند",
        description: post.caption || "تصاویر و ویدیوهای اینستاگرام تجهیزلند",
        path: instagramPostPath(id),
        image: assetUrl("instagram", first?.type === "video" ? first.cover : first?.file),
    });
}

export default async function Page({params}: Props) {
    const {id} = await params;
    const post = await getPost(id);

    return (
        <main dir="rtl" className="mx-auto mt-4 mb-12 w-full max-w-[640px] sm:px-5 lg:mt-14">
            <nav aria-label="ناوبری پست" className="relative flex h-14 items-center justify-center border-b border-neutral-200 px-4 dark:border-neutral-800">
                <Link href="/instagram" aria-label="بازگشت به همه پست‌ها"
                      className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <LuChevronRight className="h-6 w-6"/>
                </Link>
                <h1 className="text-base font-semibold">پست‌ها</h1>
            </nav>
            <InstagramPostCard key={post.id} post={post} priority/>
        </main>
    );
}
