import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {findBrandByUrl} from "@/services/server/shop";
import BrandListing from "@/components/Linsting/BrandListing";
import JsonLd from "@/components/Seo/JsonLd";
import {buildMetadata, assetUrl, absoluteUrl, breadcrumbSchema, pageNumber, paginatedPath} from "@/utils/seo";

type Props = {params: Promise<{url: string[]}>; searchParams: Promise<{page?: string | string[]}>};
export const revalidate = 300;

export async function generateMetadata({params, searchParams}: Props): Promise<Metadata> {
    const {url} = await params;
    const page = pageNumber((await searchParams).page);
    const response = await findBrandByUrl(decodeURIComponent(url.join("/")), "", page);
    return buildMetadata({title: response.brand.name, description: response.brand.description || response.brand.name,
        path: `/brand/${response.brand.url}`, page, image: assetUrl("brand", response.brand.image)});
}

export default async function Page({params, searchParams}: Props) {
    const {url} = await params;
    const page = pageNumber((await searchParams).page);
    const response = await findBrandByUrl(decodeURIComponent(url.join("/")), "", page);
    if (page > 1 && !response.products.data.length) notFound();
    const path = `/brand/${response.brand.url}`;
    return <>
        <JsonLd data={{"@context": "https://schema.org", "@type": "CollectionPage",
            name: response.brand.name, url: absoluteUrl(paginatedPath(path, page)),
            about: {"@type": "Brand", name: response.brand.name, logo: assetUrl("brand", response.brand.image)},
            mainEntity: {"@type": "ItemList", itemListElement: response.products.data.map((product, index) => ({
                "@type": "ListItem", position: ((page - 1) * (response.products.meta?.per_page || response.products.data.length)) + index + 1,
                name: product.name, url: absoluteUrl(`/product/${product.url}`),
            }))},
        }} />
        <BrandListing key={page} response={response} url={decodeURIComponent(url.join("/"))} />
    </>;
}
