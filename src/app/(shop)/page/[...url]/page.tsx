import React from "react";
import MetaTag from "@/components/MetaTag/MetaTag";
import {stripHTML} from "@/hooks/StripHtml";
import {findPageByUrl} from "@/services/api/shop/page";

interface ProductPageProps {
    params: {
        url: [string];
    }
}

const BlogSingle = async ({params}: ProductPageProps) => {

    const page = await findPageByUrl(decodeURIComponent(params.url.join("/")));



    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "BlogPosting",
        "headline": page.title,
        "description": stripHTML(page.content),
        "image": process.env.NEXT_PUBLIC_IMAGE_BASE_URL+"/page/"+page.image,
        "datePublished": page.created_at,
        "author": {
            "@type": "Person",
            "name": "مدیر سایت",
            "url": "/page"
        }
    };

    const renderHeader = () => {
        return (
            <header className="container rounded-xl mb-5">
                <div className="max-w-screen-md mx-auto space-y-5 flex justify-between">
                    <h1
                        className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
                        title="Quiet ingenuity: 120,000 lunches and counting"
                    >
                        {page.title}
                    </h1>
                    <span
                        style={{direction: "ltr"}}
                        className=" text-neutral-500 font-semibold text-sm dark:text-neutral-100 "
                    >
            {page.created_at}
          </span>
                </div>
            </header>
        );
    };

    const renderContent = () => {
        return (
            <div dangerouslySetInnerHTML={{__html: page.content}}/>
        );
    };

    return (
        <>
            <MetaTag description={stripHTML(page.content)} title={page.title} structuredData={JSON.stringify(structuredData)}/>
            <div className="nc-PageSingle pt-8 lg:pt-16 ">

                {renderHeader()}
                <hr/>
                <div className="nc-SingleContent container space-y-10 text-center page mt-5">
                    {renderContent()}
                    <div
                        className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>

                </div>
            </div>
        </>
    );
};

export default BlogSingle;