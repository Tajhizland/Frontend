import React, {FC} from "react";
import toman from "@/images/toman.svg"
import Image from "next/image";
export interface PricesProps {
    className?: string;
    price?: number;
    contentClass?: string;
    priceClass?: string;
    image?: boolean;
}


const Prices: FC<PricesProps> = ({
                                     className = "",
                                     priceClass = "",
                                     price = 33,
                                     image = true,
                                     contentClass = "",
                                 }) => {


    return (
        <div className={`${className}`}>
            <div
                className={`flex items-center  border-green-500 rounded-lg  py-1 md:py-1.5 text-sm font-medium ${contentClass}`}
            >
                <span
                    className={`text-green-500 !leading-none text-xs sm:text-sm flex items-center gap-1 ${priceClass} priceFont`}>{new Intl.NumberFormat('en-US').format(price)}
                    {image?<Image src={toman} alt={"تومان"} width={20} height={20} className={"w-4 h-4"}/>:" تومان "}
                </span>
            </div>
        </div>
    );
};

export default Prices;
