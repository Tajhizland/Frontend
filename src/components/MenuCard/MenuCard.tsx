import React, { FC } from "react";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import {CATS_DISCOVER} from "@/components/CardCategories/data";
import {Route} from "next";

export interface CardCategory3Props {
  className?: string;
  featuredImage?: StaticImageData | string;
  name?: string;
  desc?: string;
  url?:string;
  color?: string;
}

const Menu: FC<CardCategory3Props> = ({
   featuredImage = "",
  name = "" ,
  color = "bg-red-50",
  url=""
}) => {
  return (

      <div
        className={`relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group ${color}`}
      >
        <div>
          <div className="absolute inset-5 sm:inset-8">
            <Image
              alt=""
              width={500}
              height={100}
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/menu/${featuredImage}`}
              className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
        <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity"></span>

        <div>
          <div className="absolute inset-5 sm:inset-8 flex flex-col">
            <div className="max-w-xs">
              <span className={`block mb-2 text-sm text-slate-700`}>
                 دسته‌بندی های پرطرفدار
              </span>
              {name && (
                <h2
                  className={`text-xl md:text-2xl text-slate-900 font-semibold`}
                  dangerouslySetInnerHTML={{ __html: name }}
                ></h2>
              )}
            </div>
            <div className="mt-auto">
              <ButtonSecondary
                sizeClass="py-3 px-4 sm:py-3.5 sm:px-6"
                fontSize="text-sm font-medium"
                className="nc-shadow-lg"
              >
                  <Link href={url as Route}>

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
