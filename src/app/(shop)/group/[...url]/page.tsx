import type {Metadata} from "next";
import {findGroupByUrl} from "@/services/server/shop";
import SectionGroupInfo from "@/components/Group/SectionGroupInfo";
import JsonLd from "@/components/Seo/JsonLd";
import {absoluteUrl, assetUrl, buildMetadata} from "@/utils/seo";

type Props = {params: Promise<{url: string[]}>};
export const revalidate = 300;

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {url} = await params;
    const {product} = await findGroupByUrl(decodeURIComponent(url.join("/")));
    return buildMetadata({title: product.meta_title || product.name,
        description: product.meta_description || product.description || product.name,
        path: `/group/${product.url}`, image: assetUrl("product", product.images[0]?.url)});
}

export default async function Page({params}: Props) {
    const {url} = await params;
    const {product, relatedProduct} = await findGroupByUrl(decodeURIComponent(url.join("/")));
    return <>
        <h1 className="container mt-10 text-2xl font-semibold dark:text-white">{product.name}</h1>
        <JsonLd data={{"@context": "https://schema.org", "@type": "CollectionPage",
            name: product.name, url: absoluteUrl(`/group/${product.url}`),
            mainEntity: {"@type": "ItemList", itemListElement: product.groupItems
                .filter(item => item.product).map((item, index) => ({
                    "@type": "ListItem", position: index + 1, name: item.product!.name,
                    url: absoluteUrl(`/product/${item.product!.url}`),
                }))},
        }} />
        <SectionGroupInfo groupItems={product.groupItems} relatedProduct={relatedProduct.data} />
    </>;
}
