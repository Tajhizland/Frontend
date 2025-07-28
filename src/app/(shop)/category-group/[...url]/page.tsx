import React from "react";
import {findCategoryGroupByUrl} from "@/services/api/shop/category";
import {Metadata} from "next";
import {stripHTML} from "@/hooks/StripHtml";
import Script from "next/script";
import {BreadcrumbType} from "@/components/Breadcrumb/BreadcrumbType";
import GroupListing from "@/components/Linsting/GroupListing";

interface CategoryPageProps {
    params: Promise<{
        url: [string];
    }>,
    searchParams: Promise<{
        page?: string;
    }>
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await findCategoryGroupByUrl(decodeURIComponent(params.url.join("/")), "", page)
    return {
        title: response.category.name,
        description: stripHTML(response.category.description),
        twitter: {
            title: response.category.name,
            description: stripHTML(response.category.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${response.category.image}`,
        },
        openGraph: {
            title: response.category.name,
            description: stripHTML(response.category.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${response.category.image}`,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/category/${response.category.url}`,
            type: "website",
        },
        robots: "index , follow",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/category/${response.category.url}`,
        }
    }
}

const PageCollection = async (props: CategoryPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await findCategoryGroupByUrl(decodeURIComponent(params.url.join("/")), "", page)
    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "ItemList",
        "name": response.category.name,
        "description": response.category.description,
    };
    const renderBreadcrump = () => {
        let breadcrumbs: BreadcrumbType[] = [];
        response.breadcrumb.data.map((breadcrumb) => {
            breadcrumbs.push({title: breadcrumb.name, href: breadcrumb.url});
        })
        return breadcrumbs;
    }
    return (<>
            <Script type="application/ld+json" id="schema">
                {JSON.stringify(structuredData)}
            </Script>
            <GroupListing response={response} breadcrump={renderBreadcrump()}
                          url={decodeURIComponent(params.url.join("/"))}/>
        </>
    );
};

export default PageCollection;
