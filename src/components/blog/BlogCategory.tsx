import React from "react"; 
import Link from "next/link";
import { Route } from "next"; 
import { BlogCategoryResponse } from "@/services/types/blogCategory"; 

export default function BlogCategory({
    blogCategory
}: { blogCategory: BlogCategoryResponse[] }) {
    return (<>
        <div
            className={`nc-WidgetCategories rounded-3xl overflow-hidden  bg-neutral-100 dark:bg-neutral-800`}
            data-nc-id="WidgetCategories"
        >
            <div
                className={`nc-WidgetHeading1 flex items-center justify-between p-4 xl:p-5 border-b border-neutral-200 dark:border-neutral-700  `}
            >
                <h2 className="text-lg text-neutral-900 dark:text-neutral-100 font-semibold flex-grow">
                    دسته بندی مقاله ها
                </h2>

            </div>
            <div className="flow-root">
                <div className="flex flex-col  bg-white dark:bg-black/20 divide-y divide-neutral-200 dark:divide-neutral-700 ">
                    {
                        blogCategory.map((item, index) => (<Link
                            href={"/blog/" + item.url as Route}
                            key={index}
                            className={"flex items-center gap-1 py-2 px-1  hover:bg-neutral-100 dark:hover:bg-neutral-700"}>
 
                            <span className="py-2.5 px-2 dark:text-white text-xs">{item.name}</span>

                        </Link>))
                    }
                </div>
            </div>
        </div>
    </>)
}
