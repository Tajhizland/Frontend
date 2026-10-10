import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getDiscountedProducts} from "@/services/server/shop";
import DiscountListing from "@/components/Linsting/DiscountListing";
import {buildMetadata, pageNumber, SITE_DESCRIPTION} from "@/utils/seo";

type Props = {searchParams: Promise<{page?: string | string[]; search?: string}>};
export const revalidate = 300;

export async function generateMetadata({searchParams}: Props): Promise<Metadata> {
    const query = await searchParams;
    return buildMetadata({title: "محصولات تخفیف‌دار", description: "محصولات تخفیف‌دار؛ " + SITE_DESCRIPTION,
        path: "/product/discounted", page: pageNumber(query.page), noindex: Boolean(query.search)});
}

export default async function Page({searchParams}: Props) {
    const query = await searchParams;
    const page = pageNumber(query.page);
    const response = await getDiscountedProducts(page);
    if (page > 1 && !response.data.data.length) notFound();
    return <DiscountListing key={`${page}:${query.search || ""}`} response={response} />;
}
