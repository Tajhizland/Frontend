"use client";

import React, { FC, useState, useRef } from "react";

import { HomepageCategoryResponse } from "@/services/types/homepageCategory";
import NcImage from "@/shared/NcImage/NcImage";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {Route} from "next";
import {CgSwap} from "react-icons/cg";
import Heading from "@/components/Heading/Heading";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/Nav/NavItem";
import ProductCard2 from "@/components/Card/ProductCard2";

interface SectionHomepageCategoryProps {
    data: HomepageCategoryResponse[];
}

const SectionHomepageCategory: FC<SectionHomepageCategoryProps> = ({ data }) => {
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
        <div className="relative">
            <div className="flex flex-col relative mb-12">
                <Heading>دسته بندی های پرطرفدار</Heading>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between ">
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
                    <div className={"flex justify-center border-b lg:hidden"}>
                        <CgSwap className={" w-8 h-8 text-neutral-400"}/>
                    </div>
                </div>
            </div>

            <div className="grid gap-2 lg:gap-8 grid-cols-2 sm:grid-cols-2 lg:hidden">
                {data[tabActive]?.category?.products?.data.slice(0,4).map((product, index) => (
                    <ProductCard2 data={product} key={index}/>
                ))}
            </div>
            <div className="hidden lg:grid gap-2 lg:gap-8  lg:grid-cols-3 xl:hidden">
                {data[tabActive]?.category?.products?.data.slice(0,6).map((product, index) => (
                    <ProductCard2 data={product} key={index}/>
                ))}
            </div>
            <div className="hidden xl:grid gap-2 lg:gap-8  xl:grid-cols-4">
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

export default SectionHomepageCategory;
