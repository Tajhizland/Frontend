import React from "react";
import {findNewsByUrl, getNewsPaginated} from "@/services/api/shop/news";
import Heading from "@/components/Heading/Heading";
import Card3 from "./Card3";
import ShopPagination from "@/shared/Pagination/ShopPagination";
import {stripHTML} from "@/hooks/StripHtml";
import MetaTag from "@/components/MetaTag/MetaTag";
import {Metadata} from "next";
import logo from "@/images/tajhizland/logo.png";
import Script from "next/script";

interface BlogPageProps {
    searchParams: { page?: string };
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

const BlogPage = async ({searchParams}: BlogPageProps) => {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    const data = await getNewsPaginated(page);
    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "ItemList",
        "itemListElement": data.data.map((article, index) => ({
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
            <div className="nc-BlogPage overflow-hidden relative">
                <div className="container relative">
                    <div className={`nc-SectionLatestPosts relative py-16 lg:py-28`}>
                        <div className="flex flex-col lg:flex-row">
                            <div className="w-full  xl:pr-14">
                                <Heading>
                                    اخبار و مقالات
                                </Heading>
                                <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
                                    {data.data.map((item, index) => (
                                        <Card3 key={index} className="" item={item}/>
                                    ))}
                                </div>
                                <div
                                    className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                                    <ShopPagination currentPage={page}
                                                    totalPages={((data?.meta?.total ?? 1) / (data?.meta?.total ?? 1))}
                                                    url="news"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPage;
