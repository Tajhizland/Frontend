import React from "react";
import {getNewsPaginated} from "@/services/api/shop/news";
import {stripHTML} from "@/hooks/StripHtml";
import {Metadata} from "next";
//@ts-ignore
import logo from "@/images/tajhizland/logo.png";
import Script from "next/script";
import Listing from "@/app/(shop)/news/(blog)/Listing";

interface BlogPageProps {
    searchParams: Promise<{ page?: string }>;
}


export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "اخبار و مقالات",
        description: "اخبار و مقالات",
        twitter: {
            title: "اخبار و مقالات",
            description: "اخبار و مقالات",
            images: logo.src,
        },
        openGraph: {
            title: "اخبار و مقالات",
            description: "اخبار و مقالات",
            images: logo.src,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/news`,
            type: "website",
        },
        robots: "index , follow",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/news`,
        }
    }
}

const BlogPage = async (props: BlogPageProps) => {
    const searchParams = await props.searchParams;
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    const data = await getNewsPaginated(page);
    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "ItemList",
        "itemListElement": data.listing.data.map((article, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "NewsArticle",
                "headline": article.title,
                "description": stripHTML(article.content),
                "image": article.img,
                "datePublished": article.created_at,
                "author": {
                    "@type": "Person",
                    "name": "مدیر سایت",
                    "url": "/news"
                },
                "url": article.url
            }
        }))
    };
    return (
        <>
            <Script type="application/ld+json" id="schema">
                {JSON.stringify(structuredData)}
            </Script>
            <Listing response={data} />
        </>
    );
};

export default BlogPage;
