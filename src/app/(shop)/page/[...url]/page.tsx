import {buildMetadata, assetUrl, absoluteUrl, metaDescription} from "@/utils/seo";
import {normalizeContentHeadings} from "@/utils/seo";
import React from "react";
import {findPageByUrl} from "@/services/server/shop";
import {Metadata} from "next";
import JsonLd from "@/components/Seo/JsonLd";
import styles from "./page.module.css";

interface ProductPageProps {
    params: Promise<{
        url: [string];
    }>
}

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
    const {url} = await props.params;
    const page = await findPageByUrl(decodeURIComponent(url.join("/")));
    return buildMetadata({title: page.title, description: page.content || page.title,
        path: `/page/${page.url}`, image: assetUrl("page", page.image)});
}

const BlogSingle = async (props: ProductPageProps) => {
    const params = await props.params;

    const page = await findPageByUrl(decodeURIComponent(params.url.join("/")));

    const structuredData = {
        "@context": "https://schema.org", "@type": "WebPage",
        name: page.title, description: metaDescription(page.content),
        image: assetUrl("page", page.image), url: absoluteUrl(`/page/${page.url}`),
    };

    const renderHeader = () => {
        return (
            <>

            <header className="container rounded-xl mb-6 sm:mb-10">
                <div className="max-w-[var(--breakpoint-md)] mx-auto space-y-5 flex justify-center">
                    <h1
                        className="text-center text-neutral-900 font-bold text-2xl leading-relaxed sm:text-3xl lg:text-4xl dark:text-neutral-100 max-w-4xl"
                    >
                        {page.title}
                    </h1>
                </div>
            </header>
            </>
        );
    };

    const renderContent = () => {
        return (
            <div className={`description ${styles.content}`} dangerouslySetInnerHTML={{__html: normalizeContentHeadings(page.content)}}/>
        );
    };

    return (
        <>
            <JsonLd data={structuredData} />
            <div className="nc-PageSingle pt-8 pb-12 lg:pt-16 lg:pb-20">

                {renderHeader()}
                <hr/>
                <div className="nc-SingleContent container space-y-10 text-right page mt-6 sm:mt-10">
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
