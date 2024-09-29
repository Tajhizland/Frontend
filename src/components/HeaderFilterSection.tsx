"use client";

import React, { FC, useState } from "react";
import Heading from "@/shared/Heading/Heading";
import Nav from "@/shared/Nav/Nav";
import NavItem from "@/shared/NavItem/NavItem";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import TabFilters from "@/components/TabFilters";
import { Transition } from "@/app/(shop)/headlessui";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";

export interface HeaderFilterSectionProps {
  className?: string;
  data : HomepageCategoryResponse[];
}

const HeaderFilterSection: FC<HeaderFilterSectionProps> = ({
  className = "mb-12",
    data
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [tabActive, setTabActive] = useState(0);

  return (
    <div className={`flex flex-col relative ${className}`}>
      <Heading>{`What's trending now`}</Heading>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
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
  );
};

export default HeaderFilterSection;
