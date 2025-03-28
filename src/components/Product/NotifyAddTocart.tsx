import React, {FC} from "react";
import {Transition} from "@headlessui/react";
import Image, {StaticImageData} from "next/image";
import Prices from "@/components/Price/Prices";

interface Props {
    show: boolean;
    productImage: string | StaticImageData;
    color: string;
    name: string;
    price: number;
    qualitySelected: number;
}

const NotifyAddTocart: FC<Props> = ({
                                        show,
                                        productImage,
                                        color,
                                        name,
                                        price,
                                        qualitySelected,
                                    }) => {

    const renderProductCartOnNotify = () => {
        return (
            <div className="flex ">
                <div className="h-20 w-20 relative flex-shrink-0 overflow-hidden rounded-xl  ">
                    <Image
                        src={productImage}
                        alt={name}
                        fill
                        sizes="100px"
                        className="h-full w-full object-contain object-center"
                    />
                </div>
                <div className="mr-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between pl-2">
                            <div>
                                <h3 className="text-sm sm:text-base font-medium ">{name}</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span>
                                        {color}
                                    </span>
                                    <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                </p>
                            </div>
                            <Prices price={price} className="mt-0.5"/>
                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-xs sm:text-sm">
                        <p className="text-gray-500 dark:text-slate-400">{` ${qualitySelected} عدد `}</p>
                        <div className="flex">
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Transition
            appear
            as={"div"}
            show={show}
            className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
            enter="transition-all duration-150"
            enterFrom="opacity-0 translate-x-20"
            enterTo="opacity-100 translate-x-0"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-20"
        >
            <p className="block text-base font-semibold leading-none">
                به سبد خرید اضافه شد
            </p>
            <hr className=" border-slate-200 dark:border-slate-700 my-4"/>
            {renderProductCartOnNotify()}
        </Transition>
    );
};

export default NotifyAddTocart;
