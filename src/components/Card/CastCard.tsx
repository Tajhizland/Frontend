import Link from "next/link";
import Image from "next/image";
import {CastResponse} from "@/services/types/cast";
import Badge from "@/shared/Badge/Badge";
import NcImage from "@/shared/NcImage/NcImage";
import {stripHTML} from "@/hooks/StripHtml";
import MetaCard from "@/components/Card/MetaCard";
import React from "react";

export default function CastCard({cast}: { cast: CastResponse }) {
    return (
        <Link
            href={"/tajhizcast/" + cast.url}
            className={`nc-BlogCard relative flex flex-col sm:flex-row sm:items-center group border rounded-2xl py-4 px-4 sm:mx-10 transition-all hover:shadow-xl`}
            data-nc-id="BlogCard"
        >

            <div
                className={`block relative flex-shrink-0 sm:w-56 sm:ml-6  mb-5 sm:mb-0 shadow-2xl `}
            >
                <div

                    className="block w-full h-0 aspect-h-2 aspect-w-3 rounded-2xl overflow-hidden static sm:absolute  sm:-right-10  sm:top-1/2  sm:-translate-y-1/2"
                >
                    <NcImage
                        alt=""
                        fill
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/cast/image/${cast.image}`}
                        containerClassName="absolute inset-0"
                        className="w-full"
                    />
                </div>
            </div>

            <div className="flex flex-col flex-grow sm:py-5">
                <div className="space-y-5 mb-4">
                    <div>
                        <h2
                            className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 text-xl`}
                        >
                            <div
                                className="line-clamp-2 capitalize text-sm sm:text-base"
                                title={"عنوان"}
                            >
                                {cast.title}
                            </div>
                        </h2>
                        <div className="  sm:block sm:mt-2">
              <span className="text-neutral-500 dark:text-neutral-400  text-xs sm:text-sm line-clamp-2">
                <div dangerouslySetInnerHTML={{__html: stripHTML(cast.description)}}/>
              </span>
                        </div>
                    </div>
                    <Badge name={"مشاهده بیشتر"}/>

                </div>
            </div>

        </Link>
    );
}
