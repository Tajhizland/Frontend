import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {paginatedCast} from "@/services/server/shop";
import CastListing from "@/components/Linsting/CastListing";
import {buildMetadata, pageNumber, SITE_DESCRIPTION} from "@/utils/seo";

type Props = {searchParams: Promise<{page?: string | string[]; search?: string}>};
export const revalidate = 300;

export async function generateMetadata({searchParams}: Props): Promise<Metadata> {
    const query = await searchParams;
    return buildMetadata({title: "تجهیزکست؛ پادکست تجهیزلند", description: "تجهیزکست؛ پادکست تجهیزلند؛ " + SITE_DESCRIPTION,
        path: "/tajhizcast", page: pageNumber(query.page), noindex: Boolean(query.search)});
}

export default async function Page({searchParams}: Props) {
    const query = await searchParams;
    const page = pageNumber(query.page);
    const response = await paginatedCast(page, query.search ? new URLSearchParams({"filter[search]": query.search}).toString() : "");
    if (page > 1 && !response.listing.data.length) notFound();
    return <CastListing key={`${page}:${query.search || ""}`} response={response} search={query.search} />;
}
