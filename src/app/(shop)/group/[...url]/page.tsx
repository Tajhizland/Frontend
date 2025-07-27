import React from "react";
import {
    ClockIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

import {findProductByUrl} from "@/services/api/shop/product";
import ProductSidebar from "@/components/Product/ProductSidebar";
import ProductImage from "../../../../components/Product/ProductImage";
import ProductComment from "../../../../components/Product/ProductComment";
import {Metadata} from "next";
import Script from "next/script";
import {stripHTML} from "@/hooks/StripHtml";
import TextExpander from "@/shared/TextExpander/TextExpander";
import {ProductResponse} from "@/services/types/product";
import Policy from "../../../../components/Product/Policy";
import SectionLinkedProductSlider from "@/components/Section/SectionLinkedProductSlider";
import IconDiscount from "@/components/Icon/IconDiscount";
import LikeSaveBtns from "@/shared/Button/LikeSaveBtns";
import Accordion from "@/components/Accordion/Accordion";
import SectionVideo from "@/components/Section/SectionVideo";
import Badge from "@/shared/Badge/Badge";
import SectionProductVideo from "@/components/Section/SectionProductVideo";
import SectionGroup from "@/components/Group/SectionGroup";
import Link from "next/link";
import {FaCodeCompare} from "react-icons/fa6";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import {MdCompare} from "react-icons/md";
import {FaShareAlt} from "react-icons/fa";
import ShareButton from "@/shared/Button/ShareButton";
import SectionGroupInfo from "@/components/Group/SectionGroupInfo";
import {findGroupByUrl} from "@/services/api/shop/group";

interface ProductPageProps {
    params: Promise<{
        url: [string];
    }>
}

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
    const params = await props.params;
    let productResponse = await findGroupByUrl(decodeURIComponent(params.url.join("/")));
    let product = productResponse.product;

    return {
        title: product.meta_title ?? product.name,
        description: product.meta_description ?? stripHTML(product.description),
        twitter: {
            title: product.meta_title ?? product.name,
            description: product.meta_description ?? stripHTML(product.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product?.images?.data[0]?.url}`,

        },
        openGraph: {
            title: product.meta_title ?? product.name,
            description: product.meta_description ?? stripHTML(product.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product?.images?.data[0]?.url}`,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/product/${product.url}`,
            type: "website",
        },
        robots: "index , follow",
        other: {
            product_id: product?.id,
            product_name: product?.name,
            product_price: product?.min_price,
            product_old_price: product?.min_price,
            availability: product.status == 1 ? "instock" : "outofstock",
            guarantee: product?.guaranties.data[0] ? product?.guaranties.data[0]?.name ?? "" : ""
        }

    }
}

const ProductDetailPage2 = async (props: ProductPageProps) => {
    const params = await props.params;
    let productResponse = await findGroupByUrl(decodeURIComponent(params.url.join("/")));
    let product = productResponse.product;
    let relatedProduct = productResponse.relatedProduct.data;

    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product?.images?.data[0]?.url}`,
        "description": product.description,
        "sku": product.id,
        "offers": {
            "@type": "Offer",
            "url": product.url,
            "priceCurrency": "IRR",
            "price": product.min_price,
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
        },
        "brand": {
            "@type": "Brand",
            "name": product.brand
        }
    };


    return (
        <>
            <Script type="application/ld+json" id="schema">
                {JSON.stringify(structuredData)}
            </Script>
            <SectionGroupInfo groupItems={product.groupItems.data} relatedProduct={relatedProduct} />
        </>
    );
};

export default ProductDetailPage2;
