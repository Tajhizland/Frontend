"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Heading from "./Heading/Heading";
import CardCategory3 from "./CardCategories/CardCategory3";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { CATS_DISCOVER } from "./CardCategories/data";
import { PopularCategoryResponse } from "@/services/types/popularCategory";

const DiscoverMoreSlider = (data : PopularCategoryResponse[]) => {
  const sliderRef = useRef(null);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 2.8,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1279: {
          gap: 20,
          perView: 2.15,
        },
        1023: {
          gap: 20,
          perView: 1.6,
        },
        768: {
          gap: 20,
          perView: 1.2,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  return (
    <div
      ref={sliderRef}

      className={`nc-DiscoverMoreSlider nc-p-l-container ${
        isShow ? "" : "invisible"
      }`}
    >
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
        desc=""
        rightDescText=""
        hasNextPrev
      >
        دسته‌بندی های پرطرفدار    
          </Heading>

      {
        console.log("DATA" , data.data.data)
      
      }
      <div className="" data-glide-el="track"  style={{direction:"ltr"}}>
        <ul className="glide__slides">
          { data.data.data.map((item, index) => (
            <li key={index} className={`glide__slide`}>
              <CardCategory3
                name={item.category?.name}
                url={item.category?.url}
                desc={item.category?.description}
                featuredImage={item.category?.image} 
                color="bg-orange-50"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscoverMoreSlider;
