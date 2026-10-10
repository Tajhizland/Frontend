import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getVlogByCategoryPaginated} from "@/services/server/shop";
import VlogCategoryListing from "@/components/Linsting/VlogCategoryListing";
import {buildMetadata, pageNumber} from "@/utils/seo";

type Props = {params: Promise<{url: string[]}>; searchParams: Promise<{page?: string | string[]; search?: string}>};
export const revalidate = 300;

export async function generateMetadata({params, searchParams}: Props): Promise<Metadata> {
    const {url} = await params;
    const query = await searchParams;
    const page = pageNumber(query.page);
    const response = await getVlogByCategoryPaginated(decodeURIComponent(url.join("/")), page,
        query.search ? new URLSearchParams({"filter[search]": query.search}).toString() : "");
    return buildMetadata({title: response.category.name, description: `ویدیوهای ${response.category.name} در تجهیزلند`,
        path: `/vlog/category/${response.category.url}`, page, noindex: Boolean(query.search)});
}

export default async function Page({params, searchParams}: Props) {
    const query = await searchParams;
    const page = pageNumber(query.page);
    const url = decodeURIComponent((await params).url.join("/"));
    const response = await getVlogByCategoryPaginated(url, page,
        query.search ? new URLSearchParams({"filter[search]": query.search}).toString() : "");
    if (page > 1 && !response.listing.data.length) notFound();
    return <VlogCategoryListing key={`${url}:${page}:${query.search || ""}`} url={url} response={response} search={query.search} />;
}
