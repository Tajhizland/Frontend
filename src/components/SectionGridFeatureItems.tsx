"use client";

import React, { FC, useState, useRef } from "react";
import ProductCard2 from "@/components/ProductCard";
import Heading from "@/shared/Heading/Heading";
import Nav from "@/shared/Nav/Nav";
import NavItem from "@/shared/NavItem/NavItem";
import { HomepageCategoryResponse } from "@/services/types/homepageCategory";
import NcImage from "@/shared/NcImage/NcImage";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {Route} from "next";

interface SectionGridFeatureItemsProps {
    data: HomepageCategoryResponse[];
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({ data }) => {
    const [tabActive, setTabActive] = useState(0);
    const navRef = useRef<HTMLDivElement | null>(null);

    // Drag scroll logic
    let isDragging = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!navRef.current) return;
        isDragging = true;
        navRef.current.classList.add("grabbing");
        startX = e.pageX - navRef.current.offsetLeft;
        scrollLeft = navRef.current.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
        isDragging = false;
        navRef.current?.classList.remove("grabbing");
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !navRef.current) return;
        e.preventDefault();
        const x = e.pageX - navRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed
        navRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="nc-SectionGridFeatureItems relative">
            <div className="flex flex-col relative mb-12">
                <Heading>دسته بندی های پرطرفدار</Heading>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0">
                    <div
                        ref={navRef}
                        className="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar cursor-grab"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseLeaveOrUp}
                        onMouseLeave={handleMouseLeaveOrUp}
                    >
                        <Nav className="sm:space-x-2">
                            {data.map((item, index) => (
                                <NavItem
                                    key={index}
                                    isActive={tabActive === index}
                                    onClick={() => setTabActive(index)}
                                >
                                    <div
                                        className="flex items-center justify-center gap-x-1.5 sm:gap-x-2.5 text-xs sm:text-sm">
                                        {/*<svg*/}
                                        {/*    className="w-4 h-4 sm:w-5 sm:h-5"*/}
                                        {/*    viewBox="0 0 24 24"*/}
                                        {/*    fill="none"*/}
                                        {/*    xmlns="http://www.w3.org/2000/svg"*/}
                                        {/*>*/}
                                        {/*    <path*/}
                                        {/*        d="M16.7 18.98H7.30002C6.88002 18.98 6.41002 18.65 6.27002 18.25L2.13002 6.66999C1.54002 5.00999 2.23002 4.49999 3.65002 5.51999L7.55002 8.30999C8.20002 8.75999 8.94002 8.52999 9.22002 7.79999L10.98 3.10999C11.54 1.60999 12.47 1.60999 13.03 3.10999L14.79 7.79999C15.07 8.52999 15.81 8.75999 16.45 8.30999L20.11 5.69999C21.67 4.57999 22.42 5.14999 21.78 6.95999L17.74 18.27C17.59 18.65 17.12 18.98 16.7 18.98Z"*/}
                                        {/*        stroke="currentColor"*/}
                                        {/*        strokeWidth="1.5"*/}
                                        {/*        strokeLinecap="round"*/}
                                        {/*        strokeLinejoin="round"*/}
                                        {/*    />*/}
                                        {/*    <path*/}
                                        {/*        d="M6.5 22H17.5"*/}
                                        {/*        stroke="currentColor"*/}
                                        {/*        strokeWidth="1.5"*/}
                                        {/*        strokeLinecap="round"*/}
                                        {/*        strokeLinejoin="round"*/}
                                        {/*    />*/}
                                        {/*    <path*/}
                                        {/*        d="M9.5 14H14.5"*/}
                                        {/*        stroke="currentColor"*/}
                                        {/*        strokeWidth="1.5"*/}
                                        {/*        strokeLinecap="round"*/}
                                        {/*        strokeLinejoin="round"*/}
                                        {/*    />*/}
                                        {/*</svg>*/}
                                        <div
                                            className={" flex items-center  dark:text-slate-300 bg-white rounded-full p-2 text-xs"}
                                        ><NcImage
                                            containerClassName="flex aspect-w-1 aspect-h-1 w-4 h-4  "
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/homepageCategory/${item.icon}`}
                                            className="object-cover w-full h-full drop-shadow-xl"
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                            alt="guaranty"
                                        /></div>
                                        <span>{item.category.name}</span>
                                    </div>
                                </NavItem>
                            ))}
                        </Nav>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data[tabActive]?.category?.products?.data.map((product, index) => (
                    <ProductCard2 data={product} key={index}/>
                ))}
            </div>
            <ButtonPrimary className={"!flex justify-center w-fit mx-auto my-5"} href={"/category/"+data[tabActive]?.category.url as Route}>
                مشاهده همه
            </ButtonPrimary>
        </div>
    );
};

export default SectionGridFeatureItems;
