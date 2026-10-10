import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getSpecialProductsPaginate} from "@/services/server/shop";
import SpecialListing from "@/components/Linsting/SpecialListing";
import {buildMetadata, pageNumber, SITE_DESCRIPTION} from "@/utils/seo";

type Props = {searchParams: Promise<{page?: string | string[]; search?: string}>};
export const revalidate = 300;

export async function generateMetadata({searchParams}: Props): Promise<Metadata> {
    const query = await searchParams;
    return buildMetadata({title: "محصولات ویژه", description: "محصولات ویژه؛ " + SITE_DESCRIPTION,
        path: "/special", page: pageNumber(query.page), noindex: Boolean(query.search)});
}

export default async function Page({searchParams}: Props) {
    const query = await searchParams;
    const page = pageNumber(query.page);
    const response = await getSpecialProductsPaginate(page);
    if (page > 1 && !response.data.data.length) notFound();
    return <SpecialListing key={`${page}:${query.search || ""}`} response={response} />;
}
