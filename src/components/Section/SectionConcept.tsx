"use client";

import React, {FC, Fragment, useState} from "react";
import Heading from "@/components/Heading/Heading";
import {ConceptResponse} from "@/services/types/concept";
import NcImage from "@/shared/NcImage/NcImage";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/Nav/NavItem";
import CategoryCard from "@/components/Card/CategoryCard";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export interface SectionGridMoreExploreProps {
    className?: string;
    gridClassName?: string;
    data: ConceptResponse[];
}

const SectionConcept: FC<SectionGridMoreExploreProps> = ({
                                                             className = "",
                                                             gridClassName = "grid-cols-3 md:grid-cols-3 xl:grid-cols-4",
                                                             data,
                                                         }) => {
    const [tabActive, setTabActive] = useState(0);
    const [showAll, setShowAll] = useState(false);

    const renderHeading = () => {
        return (
            <div>
                <Heading
                    className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
                    fontClass=" md:text-4xl 2xl:text-5xl font-semibold"
                    isCenter
                    desc="از این قسمت میتونی تجهیزات اصلی کانسپت مورد نظرتو پیدا کنی"
                >
                    چه کانسپتی میخوای راه اندازی کنی ؟!
                </Heading>
                <Nav
                    className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar"
                    containerClassName="mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
                >
                    {data.map((item, index) => (
                        <NavItem
                            key={index}
                            isActive={tabActive === index}
                            onClick={() => {
                                setTabActive(index);
                                setShowAll(false)
                            }}
                        >
                            <div
                                className="flex items-center justify-center gap-x-1.5 sm:gap-x-2.5  text-xs sm:text-sm ">


                                <div
                                    className={" flex items-center  dark:text-slate-300 bg-white rounded-full p-2 text-xs"}
                                ><NcImage
                                    containerClassName="flex aspect-w-1 aspect-h-1 w-4 h-4  "
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/concept/${item.icon}`}
                                    className="object-cover w-full h-full drop-shadow-xl"
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                    alt="guaranty"
                                /></div>

                                <span>{item.title}</span>
                            </div>
                        </NavItem>
                    ))}
                </Nav>
            </div>
        );
    };

    return (
        <div className={`nc-SectionGridMoreExplore relative ${className}`}>
            {renderHeading()}
            <div className={`hidden xl:grid gap-1 md:gap-7 ${gridClassName}`}>
                {data.map((item, index) => (<Fragment key={index}>
                    {
                        item.categories?.data.slice(0,showAll?-1:8).map((category, index2) => (<Fragment key={index2}>
                            {
                                tabActive == index ? <CategoryCard
                                        featuredImage={`${category.image}`}
                                        name={category?.display_name ?? category.name}
                                        key={category.id}
                                        url={category.url}
                                        color={"bg-orange-50"}
                                        {...item}
                                    />
                                    : ""
                            }

                        </Fragment>))
                    }


                </Fragment>))}

            </div>
            <div className={`grid xl:hidden gap-1 md:gap-7 ${gridClassName}`}>
                {data.map((item, index) => (<Fragment key={index}>
                    {
                        item.categories?.data.slice(0,showAll?-1:6).map((category, index2) => (<Fragment key={index2}>
                            {
                                tabActive == index ? <CategoryCard
                                        featuredImage={`${category.image}`}
                                        name={category?.display_name ?? category.name}
                                        key={category.id}
                                        url={category.url}
                                        color={"bg-orange-50"}
                                        {...item}
                                    />
                                    : ""
                            }

                        </Fragment>))
                    }


                </Fragment>))}

            </div>
            <div className={"flex xl:hidden justify-center mt-5"}>
            {
                data.map((item, index) => (<Fragment key={index}>
                    {(tabActive == index && !showAll && (item.categories?.data.length ?? 0) > 6) ?
                        <ButtonPrimary onClick={()=>{setShowAll(true)}}>مشاهده همه </ButtonPrimary>
                        :
                        <></>}
                </Fragment>))
            }
            </div>
            <div className={"hidden xl:flex justify-center mt-5"}>
                {
                    data.map((item, index) => (<Fragment key={index}>
                        {(tabActive == index && !showAll && (item.categories?.data.length ?? 0) > 8) ?
                            <ButtonPrimary onClick={()=>{setShowAll(true)}}>مشاهده همه </ButtonPrimary>
                            :
                            <></>}
                    </Fragment>))
                }
            </div>
        </div>
    );
};

export default SectionConcept;
