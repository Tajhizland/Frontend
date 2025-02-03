import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import rightImgDemo from "@/images/tajhizland/banner1.png";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Logo from "@/shared/Logo/Logo";
import backgroundLineSvg from "@/images/Moon.svg";
import Image from "next/image";

export interface SectionPromo2Props {
  className?: string;
    logo: string;
}

const SectionPromo2: FC<SectionPromo2Props> = ({ className = "lg:pt-10",logo }) => {
  return (
    <div className={`nc-SectionPromo2 ${className}`}>
      <div className="relative flex flex-col lg:flex-row lg:justify-end bg-yellow-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
        <div className="absolute inset-0">
          <Image
            fill
            className="absolute w-full h-full object-contain dark:opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="lg:w-[45%] max-w-lg relative">
          {/* <Logo className="w-28" /> */}
          <h2 className="font-semibold text-xl sm:text-4xl xl:text-5xl mt-6 sm:mt-10 !leading-[1.13] tracking-tight dark:text-white">
               مشاوره تخصصی و <br  className="hidden sm:block" />
                 آموزش کاربردی
          </h2>
          <span className="block mt-6 text-slate-500 dark:text-slate-400 text-sm">
            مشاوره از انتخاب کانسپت تا انتخاب بهترین تجهیزات . همچنین آموزش کاربردی نصب و راه اندازی و استفاده از تجهیزات
          </span>
          <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
            <ButtonPrimary
              href="/"
              className="dark:bg-slate-200 dark:text-slate-900"
            >
              اطلاعات بیشتر
            </ButtonPrimary>
          </div>
        </div>

        <NcImage
          alt=""
          width={1080}
          height={1080}
          containerClassName="relative block lg:absolute lg:start-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(45%-40px)]"
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/poster/${logo}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          className=""
        />
      </div>
    </div>
  );
};

export default SectionPromo2;
