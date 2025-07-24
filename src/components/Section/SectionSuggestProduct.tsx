"use client"
import {useEffect, useRef, useState} from "react";
//@ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import Heading from "@/components/Heading/Heading";
import {useQuery} from "react-query";
import {useUser} from "@/services/globalState/GlobalState";
import {suggestProduct} from "@/services/api/shop/categoryViewHistory";
import ProductCard2 from "@/components/Card/ProductCard2";

export default function SectionSuggestProduct() {
    const sliderRef = useRef(null);
    const [user] = useUser();

    //
    const [isShow, setIsShow] = useState(false);

    const {data: data} = useQuery({
        queryKey: [`suggest-product`],
        queryFn: () => suggestProduct(),
        staleTime: 5000,
        enabled: !!user
    });

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
            direction: "rtl",
            perView: 4,
            gap: 32,
            bound: true,
            breakpoints: {
                1280: {
                    perView: 4 - 1,
                },
                1024: {
                    gap: 20,
                    perView: 4 - 1,
                },
                768: {
                    gap: 20,
                    perView: 4 - 2,
                },
                640: {
                    gap: 10,
                    perView: 2.2,
                },
                500: {
                    gap: 10,
                    perView: 2.1,
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

    if(!user || !data)
        return ;
    return (
        <div className={`nc-SectionLinkedProductSlider `}>
            <div ref={sliderRef} className={`flow-root  `}>
                <Heading
                    className={"mb-10 text-neutral-900 dark:text-neutral-50"}
                    fontClass={"text-2xl font-semibold"}
                    rightDescText={""}
                    hasNextPrev={false}
                >
                    محصولات پیشنهادی
                </Heading>
                <div className={"grid grid-cols-5"}>
                    {data && data.map((item, index) => (
                        <li key={index} className={`glide__slide  `}>
                            <ProductCard2 data={item}/>
                        </li>
                    ))}
                </div>
                {/*<div className="glide__track" data-glide-el="track" style={{direction: "rtl"}}>*/}
                {/*    <ul className="glide__slides">*/}
                {/*       */}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

