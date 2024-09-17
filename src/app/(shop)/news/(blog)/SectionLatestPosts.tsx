import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import WidgetCategories from "./WidgetCategories";
import WidgetPosts from "./WidgetPosts";
import Card3 from "./Card3";
import { NewsResponse } from "@/services/types/news";

//
export interface SectionLatestPostsProps {
  data:NewsResponse[]
  className?: string;
  postCardName?: "card3";
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  data ,
  postCardName = "car,d3",
  className = "",
}) => {
  return (
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full  xl:pr-14">
          <Heading>
            اخبار و مقالات
          </Heading>
          <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
            {data.map((item, index) => (
              <Card3 key={index} className="" item={item} />
            ))}
          </div>
          <div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
          </div>
        </div>

      </div>
    </div>
  );
};

export default SectionLatestPosts;
