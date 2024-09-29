"use client"
import React, {FC, useState} from "react";
import HeaderFilterSection from "@/components/HeaderFilterSection";
import ProductCard2 from "@/components/ProductCard";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { Product, PRODUCTS } from "@/data/data";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";
import Heading from "@/shared/Heading/Heading";
import Nav from "@/shared/Nav/Nav";
import NavItem from "@/shared/NavItem/NavItem";

//
export interface SectionGridFeatureItemsProps {
  data: HomepageCategoryResponse[];
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({
  data ,
}) => {
    const [tabActive, setTabActive] = useState(0);

    return (
      <div className="nc-SectionGridFeatureItems relative">
          <div className={`flex flex-col relative  mb-12`}>
              <Heading>{`محصولات جدید`}</Heading>
              <div
                  className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
                  <Nav
                      className="sm:space-x-2"
                      containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
                  >
                      {data.map(
                          (item, index) => (
                              <NavItem
                                  key={index}
                                  isActive={tabActive === index}
                                  onClick={() => setTabActive(index)}
                              >
                                  {item.category.name}
                              </NavItem>
                          )
                      )}
                  </Nav>
              </div>

          </div>
          <div
              className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
          >
              {data.map((item, index) => (<>
                      {tabActive === index && item.category.products?.data.map((product, index) => (
                          <ProductCard2 data={product} key={index}/>
                      ))}
                  </>
              ))}
          </div>
          {/*<div className="flex mt-16 justify-center items-center">*/}
          {/*    <ButtonPrimary loading>نمایش بیشتر</ButtonPrimary>*/}
          {/*</div>*/}
      </div>
  );
};

export default SectionGridFeatureItems;
