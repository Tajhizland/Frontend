"use client"
import {useEffect, useRef, useState} from "react";
//@ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import Heading from "@/components/Heading/Heading";
import {useQuery} from "react-query";
import {useUser} from "@/services/globalState/GlobalState";
import {suggestIpProduct, suggestProduct} from "@/services/api/shop/categoryViewHistory";
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
    const {data: data2} = useQuery({
        queryKey: [`suggest-product-ip`],
        queryFn: () => suggestIpProduct(),
        staleTime: 5000,
    });
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
                <ul className={"grid grid-cols-3 md:grid-cols-6"}>
                    {user  ? (data && data.map((item, index) => (
                        <li key={index} className={`glide__slide  `}>
                            <ProductCard2 data={item}/>
                        </li>
                    )))
                    :
                        (data2 && data2.map((item, index) => (
                            <li key={index} className={`glide__slide  `}>
                                <ProductCard2 data={item}/>
                            </li>
                        )))
                    }
                </ul>
                {/*<div className="glide__track" data-glide-el="track" style={{direction: "rtl"}}>*/}
                {/*    <ul className="glide__slides">*/}
                {/*       */}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

