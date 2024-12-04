"use client";

import React, {FC, useState} from "react";
import CardCategory1 from "@/components/CardCategories/CardCategory1";
import CardCategory4 from "@/components/CardCategories/CardCategory4";
import Heading from "@/components/Heading/Heading";
import NavItem2 from "@/components/NavItem2";
import Nav from "@/shared/Nav/Nav";
import CardCategory6 from "@/components/CardCategories/CardCategory6";
import {DEMO_MORE_EXPLORE_DATA, ExploreType} from "./data";
import {ConceptResponse} from "@/services/types/concept";


import explore1Png from "@/images/collections/explore1.svg";
import explore2Png from "@/images/collections/explore2.svg";
import explore3Png from "@/images/collections/explore3.svg";
import explore4Png from "@/images/collections/explore4.svg";
import explore5Png from "@/images/collections/explore5.svg";
import explore6Png from "@/images/collections/explore6.svg";
import explore7Png from "@/images/collections/explore7.svg";
import explore8Png from "@/images/collections/explore8.svg";
import explore9Png from "@/images/collections/explore9.svg";


export interface SectionGridMoreExploreProps {
    className?: string;
    gridClassName?: string;
    boxCard?: "box1" | "box4" | "box6";
    data: ConceptResponse[];
}

const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
                                                                     className = "",
                                                                     boxCard = "box4",
                                                                     gridClassName = "grid-cols-3 md:grid-cols-3 xl:grid-cols-4",
                                                                     data,
                                                                 }) => {
    const [tabActive, setTabActive] = useState(0);

    const svg=[
        explore1Png,
        explore2Png,
        explore3Png,
        explore4Png,
        explore5Png,
        explore6Png,
        explore7Png,
        explore8Png,
        explore9Png
    ]
    const renderCard = (item: ExploreType) => {
        switch (boxCard) {
            case "box1":
                return (
                    <CardCategory1 key={item.id} featuredImage={item.image} {...item} />
                );

            case "box4":
                return (
                    <CardCategory4
                        bgSVG={item.svgBg}
                        featuredImage={item.image}
                        key={item.id}
                        color={item.color}
                        {...item}
                    />
                );
            case "box6":
                return (
                    <CardCategory6
                        bgSVG={item.svgBg}
                        featuredImage={item.image}
                        key={item.id}
                        color={item.color}
                        {...item}
                    />
                );

            default:
                return (
                    <CardCategory4
                        bgSVG={item.svgBg}
                        featuredImage={item.image}
                        key={item.id}
                        color={item.color}
                        {...item}
                    />
                );
        }
    };

    const renderHeading = () => {
        return (
            <div>
                <Heading
                    className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
                    fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
                    isCenter
                    desc="تجهیزاتی که لازم داری رو میتونی اینجا پیدا کنی"
                >
                    میخوای راه اندازی کنی ؟!
                 </Heading>
                <Nav
                    className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar"
                    containerClassName="mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
                >
                    {data.map((item, index) => (
                        <NavItem2
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
                                        stroke-linejoin="round"/>
                                    <path d="M6.5 22H17.5" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                    <path d="M9.5 14H14.5" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                                <span>{item.title}</span>
                            </div>
                        </NavItem2>
                    ))}
                </Nav>
            </div>
        );
    };

    return (
        <div className={`nc-SectionGridMoreExplore relative ${className}`}>
            {renderHeading()}
            <div className={`grid gap-1 md:gap-7 ${gridClassName}`}>
                {data.map((item , index) => (<>
                    {
                        item.categories?.data.map((category , index2) => (<>
                            {
                                tabActive==index ?   <CardCategory4
                                    featuredImage={`${category.image}`}
                                    name={category?.display_name ?? category.name}
                                    key={category.id}
                                    url={category.url}
                                     color={"bg-orange-50"}
                                    {...item}
                                />
                                    :""
                            }

                        </>))
                    }
                </>))}
            </div>
        </div>
    );
};

export default SectionGridMoreExplore;
