import React, {Fragment} from "react";
import {getBrandList} from "@/services/api/shop/brand";
import {Metadata} from "next";
//@ts-ignore
import logo from "@/images/lightLogo.png"
import BrandCard from "@/components/Card/BrandCard";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "برند های تجهیزلند",
        description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
        twitter: {
            title: "برند های تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
        },
        openGraph: {
            title: "برند های تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
            type: "website",
        },
        robots: "index , follow",
    }
}

const Page = async () => {
    const response = await getBrandList();
    return (<>
        <div className={`nc-PageCollection dark:bg-neutral-900`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    {/* HEADING */}
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                            برند های تجهیزلند
                        </h2>
                    </div>
                    <hr className="border-slate-200 dark:border-slate-700"/>
                    <main>
                        <div
                            className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10  items-center"   style={{ gridAutoRows: "1fr" }} >
                            {
                                response.map((item, index) => (<Fragment key={index}>
                                    <BrandCard
                                        featuredImage={item.image}
                                        name={item.name}
                                        url={item.url}
                                    />
                                </Fragment>))
                            }
                        </div>
                    </main>
                </div>
            </div>
        </div>

    </>)
};

export default Page;
