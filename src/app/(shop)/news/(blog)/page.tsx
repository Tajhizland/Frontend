import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getNewsPaginated} from "@/services/server/shop";
import BlogListing from "@/components/Linsting/BlogListing";
import {absoluteUrl, buildMetadata, pageNumber, paginatedPath, SITE_DESCRIPTION} from "@/utils/seo";
import JsonLd from "@/components/Seo/JsonLd";

type Props = {searchParams: Promise<{page?: string | string[]; search?: string}>};
export const revalidate = 300;

export async function generateMetadata({searchParams}: Props): Promise<Metadata> {
    const query = await searchParams;
    return buildMetadata({title: "اخبار و مقالات", description: "اخبار و مقالات؛ " + SITE_DESCRIPTION,
        path: "/news", page: pageNumber(query.page), noindex: Boolean(query.search)});
}

export default async function Page({searchParams}: Props) {
    const query = await searchParams;
    const page = pageNumber(query.page);
    const response = await getNewsPaginated(page);
    if (page > 1 && !response.listing.data.length) notFound();
    return <>
        <JsonLd data={{"@context": "https://schema.org", "@type": "CollectionPage",
            name: "اخبار و مقالات تجهیزلند", url: absoluteUrl(paginatedPath("/news", page)),
            mainEntity: {"@type": "ItemList", itemListElement: response.listing.data.map((article, index) => ({
                "@type": "ListItem", position: (page - 1) * response.listing.meta.per_page + index + 1,
                name: article.title, url: absoluteUrl(`/news/show/${article.url}`),
            }))},
        }} />
        <BlogListing key={`${page}:${query.search || ""}`} response={response} />
    </>;
}
