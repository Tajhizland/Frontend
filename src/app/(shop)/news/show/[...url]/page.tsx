import {buildMetadata, assetUrl, absoluteUrl, metaDescription, isoDate} from "@/utils/seo";
import {normalizeContentHeadings} from "@/utils/seo";
import React from "react";
import {findNewsByUrl} from "@/services/server/shop";
import {stripHTML} from "@/hooks/StripHtml";
import {Metadata} from "next";
import JsonLd from "@/components/Seo/JsonLd";

interface ProductPageProps {
    params: Promise<{
        url: [string];
    }>
}


export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
    const {url} = await props.params;
    const news = await findNewsByUrl(decodeURIComponent(url.join("/")));
    return buildMetadata({title: news.title, description: news.content || news.title,
        path: `/news/show/${news.url}`, image: assetUrl("blog", news.img), type: "article", publishedTime: news.published_at_iso, modifiedTime: news.updated_at_iso, author: news.author});
}


const BlogSingle = async (props: ProductPageProps) => {
    const params = await props.params;

    const news = await findNewsByUrl(decodeURIComponent(params.url.join("/")));


    const structuredData = {
        "@context": "https://schema.org", "@type": "BlogPosting",
        headline: news.title, description: metaDescription(news.content),
        image: assetUrl("blog", news.img), url: absoluteUrl(`/news/show/${news.url}`),
        mainEntityOfPage: absoluteUrl(`/news/show/${news.url}`),
        datePublished: isoDate(news.published_at_iso), dateModified: isoDate(news.updated_at_iso),
        ...(news.author && {author: {"@type": "Person", name: news.author}}),
        publisher: {"@type": "Organization", name: "تجهیزلند", url: absoluteUrl("/")},
    };

    const renderHeader = () => {
        return (
            <>
                <JsonLd data={structuredData} />
            <header className="container rounded-xl mb-5">
                <div className=" mx-auto space-y-5 flex justify-center">
                    <h1
                        className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
                    >
                        {news.title}
                    </h1>

                </div>
            </header>
            </>
        );
    };

    const renderContent = () => {
        return (
            <div dangerouslySetInnerHTML={{__html: normalizeContentHeadings(news.content)}}/>
        );
    };

    return (
        <>

            <div className="nc-PageSingle pt-8 lg:pt-16 ">

                {renderHeader()}
                <hr/>
                <div className="nc-SingleContent container space-y-10 text-center news mt-5">
                    {renderContent()}
                    <div
                        className="max-w-[var(--breakpoint-md)] mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>

                </div>
            </div>
        </>
    );
};

export default BlogSingle;

export const revalidate = 300;
