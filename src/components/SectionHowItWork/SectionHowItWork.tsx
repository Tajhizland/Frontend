import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import HIW1img from "@/images/HIW1img.png";
import HIW2img from "@/images/HIW2img.png";
import HIW3img from "@/images/HIW3img.png";
import HIW4img from "@/images/HIW4img.png";
import VectorImg from "@/images/VectorHIW.svg";
import Badge from "@/shared/Badge/Badge";
import Image from "next/image";

export interface SectionHowItWorkProps {
  className?: string;
  data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    img: HIW1img,
    imgDark: HIW1img,
    title: "تجهیز و راه اندازی",
    desc: "صفر تا صد راه اندازی کافه , رستوران و فست فود",
  },
  {
    id: 2,
    img: HIW2img,
    imgDark: HIW2img,
    title: "مشاوره و آموزش",
    desc: "مشاوره در انتخاب کانسپت تا تجهیزات و آموزش و راه اندازی و استفاده در تجهیزات",
  },
  {
    id: 3,
    img: HIW3img,
    imgDark: HIW3img,
    title: "ضمانت اصالت کالا",
    desc: "تضمین اصالت کلیه کالاهای موجود در تجهیزلند",
  },
  {
    id: 4,
    img: HIW4img,
    imgDark: HIW4img,
    title: "ارسال به سراسر کشور",
    desc: "امکان ارسال کلیه کالا ها به سراسر کشور با کمترین هزینه",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div className={`nc-SectionHowItWork ${className}`}>
      <div className="relative grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-16 xl:gap-20">
        <Image
          className="hidden md:block absolute inset-x-0 top-5"
          src={VectorImg}
          alt="vector"
        />
        {data.map((item: typeof DEMO_DATA[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-start max-w-xs mx-auto"
          >
            <NcImage
              containerClassName="mb-4 sm:mb-10 max-w-[140px] mx-auto"
              className="rounded-3xl"
              src={item.img}
              sizes="150px"
              alt="HIW"
            />
            <div className="text-center  space-y-5">
              {/* <Badge
                name={`Step ${index + 1}`}
                color={
                  !index
                    ? "red"
                    : index === 1
                    ? "indigo"
                    : index === 2
                    ? "yellow"
                    : "purple"
                }
              /> */}
              <h3 className="text-sm font-semibold dark:text-white">{item.title}</h3>
              <span className="block text-slate-600 dark:text-slate-400 text-xs leading-6">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
