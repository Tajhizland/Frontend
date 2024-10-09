import React, {FC} from "react";

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
                className={`flex items-center border-2 border-green-500 rounded-lg  py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium ${contentClass}`}
            >
                <span
                    className={`text-green-500 !leading-none ${priceClass}`}>{new Intl.NumberFormat('en-US').format(price)} تومان </span>
            </div>
        </div>
    );
};

export default Prices;
