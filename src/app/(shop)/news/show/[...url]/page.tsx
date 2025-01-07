import React from "react";
import {findNewsByUrl} from "@/services/api/shop/news";
import MetaTag from "@/components/MetaTag/MetaTag";
import {stripHTML} from "@/hooks/StripHtml";
import {Metadata} from "next";
import Script from "next/script";

interface ProductPageProps {
    params: Promise<{
        url: [string];
    }>
}


export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
    const params = await props.params;
    const news = await findNewsByUrl(decodeURIComponent(params.url.join("/")));
    return {
        title: news.title,
        description: stripHTML(news.content),
        twitter: {
            title: news.title,
            description: stripHTML(news.content),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/news/${news.img}`,
        },
        openGraph: {
            title: news.title,
            description: stripHTML(news.content),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/news/${news.img}`,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/news/show/${news.url}`,
            type: "website",
        },
        robots: "index , follow",
    }
}


const BlogSingle = async (props: ProductPageProps) => {
    const params = await props.params;

    const news = await findNewsByUrl(decodeURIComponent(params.url.join("/")));


    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "BlogPosting",
        "headline": news.title,
        "description": stripHTML(news.content),
        "image": process.env.NEXT_PUBLIC_IMAGE_BASE_URL + "/blog/" + news.img,
        "datePublished": news.created_at,
        "author": {
            "@type": "Person",
            "name": "مدیر سایت",
            "url": "/news"
        }
    };

    const renderHeader = () => {
        return (
            <>
                <Script type="application/ld+json" id="schema">
                    {JSON.stringify(structuredData)}
                </Script>
            <header className="container rounded-xl mb-5">
                <div className="max-w-screen-md mx-auto space-y-5 flex justify-between">
                    <h1
                        className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
                        title="Quiet ingenuity: 120,000 lunches and counting"
                    >
                        {news.title}
                    </h1>
                    <span
                        style={{direction: "ltr"}}
                        className=" text-neutral-500 font-semibold text-sm dark:text-neutral-100 "
                    >
            {news.created_at}
          </span>
                </div>
            </header>
            </>
        );
    };

    const renderContent = () => {
        return (
            <div dangerouslySetInnerHTML={{__html: news.content}}/>
        );
    };

    return (
        <>
            <MetaTag description={stripHTML(news.content)} title={news.title}
                     structuredData={JSON.stringify(structuredData)}/>
            <div className="nc-PageSingle pt-8 lg:pt-16 ">

                {renderHeader()}
                <hr/>
                <div className="nc-SingleContent container space-y-10 text-center news mt-5">
                    {renderContent()}
                    <div
                        className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>

                </div>
            </div>
        </>
    );
};

export default BlogSingle;
