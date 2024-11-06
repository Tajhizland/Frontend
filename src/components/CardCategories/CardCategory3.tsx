import React, {FC} from "react";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Link from "next/link";
import Image, {StaticImageData} from "next/image";
import {CATS_DISCOVER} from "./data";

export interface CardCategory3Props {
    className?: string;
    featuredImage?: StaticImageData | string;
    name?: string;
    desc?: string;
    url?: string;
    color?: string;
    index?: number;
}

const CardCategory3: FC<CardCategory3Props> = ({
                                                   className = "",
                                                   index,
                                                   featuredImage = CATS_DISCOVER[2].featuredImage,
                                                   name = CATS_DISCOVER[2].name,
                                                   desc = CATS_DISCOVER[2].desc,
                                                   color = CATS_DISCOVER[2].color,
                                                   url = ""
                                               }) => {

    const renderColor=()=>{
        let colorIndex=(index??0)%4;
        return CATS_DISCOVER[colorIndex].color
    }
    return (

        <div
            className={`relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group ${renderColor()}`}
        >
            <div>
                <div className="absolute inset-5 sm:inset-8">
                    <Image
                        alt=""
                        width={500}
                        height={100}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${featuredImage}`}
                        className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
                    />
                </div>
            </div>
            <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity"></span>

            <div>
                <div className="absolute inset-5 sm:inset-8 flex flex-col">
                    <div className="max-w-xs">
              <span className={`block mb-2 text-sm text-slate-700`}>
                 دسته‌
              </span>
                        {name && (
                            <h2
                                className={`text-sm  lg:text-base  text-slate-900 font-semibold`}
                                dangerouslySetInnerHTML={{__html: name}}
                            ></h2>
                        )}
                    </div>
                    <div className="mt-auto">
                        <ButtonSecondary
                            sizeClass="py-3 px-4 sm:py-3.5 sm:px-6"
                            fontSize="text-sm font-medium"
                            className="nc-shadow-lg"
                        >
                            <Link href={{pathname: "/category/" + url}}>
                                نمایش همه
                            </Link>

                        </ButtonSecondary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCategory3;
