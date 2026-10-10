import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getStockProductsPaginate} from "@/services/server/shop";
import StockListing from "@/components/Linsting/StockListing";
import {buildMetadata, pageNumber, SITE_DESCRIPTION} from "@/utils/seo";

type Props = {searchParams: Promise<{page?: string | string[]; search?: string}>};
export const revalidate = 300;

export async function generateMetadata({searchParams}: Props): Promise<Metadata> {
    const query = await searchParams;
    return buildMetadata({title: "محصولات کارکرده", description: "محصولات کارکرده؛ " + SITE_DESCRIPTION,
        path: "/product/stock", page: pageNumber(query.page), noindex: Boolean(query.search)});
}

export default async function Page({searchParams}: Props) {
    const query = await searchParams;
    const page = pageNumber(query.page);
    const response = await getStockProductsPaginate(page);
    if (page > 1 && !response.data.data.length) notFound();
    return <StockListing key={`${page}:${query.search || ""}`} response={response} />;
}
