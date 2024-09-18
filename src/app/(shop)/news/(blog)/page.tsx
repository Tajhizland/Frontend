import React from "react";
import { getNewsPaginated } from "@/services/api/shop/news";
import Heading from "@/components/Heading/Heading";
import Card3 from "./Card3";
import Pagination from "@/shared/Pagination/Pagination";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import ShopPagination from "@/shared/Pagination/ShopPagination";

interface BlogPageProps {
  searchParams: { page?: string };
}
const BlogPage  = async ({ searchParams }: BlogPageProps) => {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  console.log("PAGE IS ",page);

  const data = await getNewsPaginated(page);
  return (
    <div className="nc-BlogPage overflow-hidden relative">
      <div className="container relative">
        <div className={`nc-SectionLatestPosts relative py-16 lg:py-28`}>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full  xl:pr-14">
              <Heading>
                اخبار و مقالات
              </Heading>
              <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
                {data.data.map((item, index) => (
                  <Card3 key={index} className="" item={item} />
                ))}
              </div>
              <div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                <ShopPagination currentPage={page}  totalPages={((data?.meta?.total??1) / (data?.meta?.total??1)) } url="news"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
