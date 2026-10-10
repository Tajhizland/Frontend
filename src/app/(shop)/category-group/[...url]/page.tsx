import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {findCategoryGroupByUrl} from "@/services/server/shop";
import GroupListing from "@/components/Linsting/GroupListing";
import JsonLd from "@/components/Seo/JsonLd";
import {buildMetadata, assetUrl, breadcrumbSchema, pageNumber} from "@/utils/seo";

type Props = {params: Promise<{url: string[]}>; searchParams: Promise<{page?: string | string[]}>};
export const revalidate = 300;

export async function generateMetadata({params, searchParams}: Props): Promise<Metadata> {
    const {url} = await params;
    const page = pageNumber((await searchParams).page);
    const response = await findCategoryGroupByUrl(decodeURIComponent(url.join("/")), "", page);
    return buildMetadata({title: response.category.name, description: response.category.description || response.category.name,
        path: `/category-group/${response.category.url}`, page, image: assetUrl("category", response.category.image)});
}

export default async function Page({params, searchParams}: Props) {
    const {url} = await params;
    const page = pageNumber((await searchParams).page);
    const response = await findCategoryGroupByUrl(decodeURIComponent(url.join("/")), "", page);
    if (page > 1 && !response.groups.data.length) notFound();
    return <>
        <JsonLd data={breadcrumbSchema(response.breadcrumb.data)} />
        <GroupListing key={page} response={response} url={decodeURIComponent(url.join("/"))} breadcrump={response.breadcrumb.data.map(item => ({title: item.name, href: item.url}))} />
    </>;
}
