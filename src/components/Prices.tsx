import React, {FC} from "react";
import toman from "@/images/tajhizland/toman.svg"
import Image from "next/image";
export interface PricesProps {
    className?: string;
    price?: number;
    contentClass?: string;
    priceClass?: string;
}

const Prices: FC<PricesProps> = ({
                                     className = "",
                                     priceClass = "",
                                     price = 33,
                                     contentClass = "",
                                 }) => {
    return (
        <div className={`${className}`}>
            <div
                className={`flex items-center  border-green-500 rounded-lg  py-1 md:py-1.5 text-sm font-medium ${contentClass}`}
            >
                <span
                    className={`text-green-500 !leading-none text-xs sm:text-sm flex items-center gap-1 ${priceClass}`}>{new Intl.NumberFormat('en-US').format(price)}
                <Image src={toman} alt={"تومان"}  width={20} height={20}/>
                </span>
            </div>
        </div>
    );
};

export default Prices;
