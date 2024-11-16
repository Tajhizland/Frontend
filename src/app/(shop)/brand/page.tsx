import React, {Fragment} from "react";
import {getBrandList} from "@/services/api/shop/brand";
import CardCategory2 from "@/components/CardCategories/CardCategory2";


const Page = async () => {
    let response = await getBrandList();
    return (<>
        <div className={`nc-PageCollection`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    {/* HEADING */}
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            برند های تجهیزلند
                        </h2>
                    </div>
                    <hr className="border-slate-200 dark:border-slate-700"/>
                    <main>
                        <div
                            className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {
                                response.map((item, index) => (<Fragment key={index}>
                                    <CardCategory2
                                        featuredImage={item.image}
                                        name={item.name}
                                        url={item.url}
                                        desc={""}
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
