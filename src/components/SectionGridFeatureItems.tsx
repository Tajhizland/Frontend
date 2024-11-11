"use client"
import React, { FC, useState } from "react";
import HeaderFilterSection from "@/components/HeaderFilterSection";
import ProductCard2 from "@/components/ProductCard";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { Product, PRODUCTS } from "@/data/data";
import { HomepageCategoryResponse } from "@/services/types/homepageCategory";
import Heading from "@/shared/Heading/Heading";
import Nav from "@/shared/Nav/Nav";
import NavItem from "@/shared/NavItem/NavItem";

//
export interface SectionGridFeatureItemsProps {
    data: HomepageCategoryResponse[];
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({
    data,
}) => {
    const [tabActive, setTabActive] = useState(0);

    return (
        <div className="nc-SectionGridFeatureItems relative">
            <div className={`flex flex-col relative  mb-12`}>
                <Heading>{`انواع اکسسوری`}</Heading>
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
                                    <div
                                        className="flex items-center justify-center gap-x-1.5 sm:gap-x-2.5  text-xs sm:text-sm ">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.7 18.98H7.30002C6.88002 18.98 6.41002 18.65 6.27002 18.25L2.13002 6.66999C1.54002 5.00999 2.23002 4.49999 3.65002 5.51999L7.55002 8.30999C8.20002 8.75999 8.94002 8.52999 9.22002 7.79999L10.98 3.10999C11.54 1.60999 12.47 1.60999 13.03 3.10999L14.79 7.79999C15.07 8.52999 15.81 8.75999 16.45 8.30999L20.11 5.69999C21.67 4.57999 22.42 5.14999 21.78 6.95999L17.74 18.27C17.59 18.65 17.12 18.98 16.7 18.98Z"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M6.5 22H17.5" stroke="currentColor" stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M9.5 14H14.5" stroke="currentColor" stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                        <span>
                                            {item.category.name}
                                        </span>
                                    </div>

                                </NavItem>
                            )
                        )}
                    </Nav>
                </div>

            </div>
            <div
                className={`grid gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
            >
                {data.map((item, index) => (<>
                    {tabActive === index && item.category.products?.data.map((product, index) => (
                        <ProductCard2 data={product} key={index} />
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
