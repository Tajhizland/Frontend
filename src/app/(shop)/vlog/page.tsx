import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getVlogPaginated} from "@/services/server/shop";
import VlogListing from "@/components/Linsting/VlogListing";
import {buildMetadata, pageNumber, SITE_DESCRIPTION} from "@/utils/seo";

type Props = {searchParams: Promise<{page?: string | string[]; search?: string}>};
export const revalidate = 300;

export async function generateMetadata({searchParams}: Props): Promise<Metadata> {
    const query = await searchParams;
    return buildMetadata({title: "ویدیوها و ولاگ تجهیزلند", description: "ویدیوها و ولاگ تجهیزلند؛ " + SITE_DESCRIPTION,
        path: "/vlog", page: pageNumber(query.page), noindex: Boolean(query.search)});
}

export default async function Page({searchParams}: Props) {
    const query = await searchParams;
    const page = pageNumber(query.page);
    const response = await getVlogPaginated(page, query.search ? new URLSearchParams({"filter[search]": query.search}).toString() : "");
    if (page > 1 && !response.listing.data.length) notFound();
    return <VlogListing key={`${page}:${query.search || ""}`} response={response} search={query.search} />;
}
