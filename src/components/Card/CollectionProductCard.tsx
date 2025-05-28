import {StarIcon} from "@heroicons/react/24/solid";
import React, {FC} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Link from "next/link";
import {ProductImageResponse} from "@/services/types/productImage";
import {Route} from "next";
import Prices from "@/components/Price/Prices";
import {ColorResponse} from "@/services/types/color";
import {ProductResponse} from "@/services/types/product";
import Badge from "@/shared/Badge/Badge";

export interface CollectionCard2Props {
    className?: string;
    imgs?: ProductImageResponse[] | undefined;
    product?: ProductResponse;
     name?: string;
    price?: number;
    description?: string;
    url?: string;
    rating?: number;
    review?: number;
}

const CollectionProductCard: FC<CollectionCard2Props> = ({
                                                             className,
                                                             imgs,
                                                             name = "Product Name",
                                                             description = "Product Description",
                                                             price,
                                                             product,
                                                             url,
                                                         }) => {

    const checkStock = (product: ProductResponse) => {
        let hasStock = false;
        product.colors.data.map((item) => {
            if (item.stock > 0 && item.status == 1) {
                hasStock = true;
                return hasStock;
            }
        })
        return hasStock;
    }


    const renderMinPrice = (product: ProductResponse) => {
        let minPrice = product?.colors?.data[0]?.price;
        let minDiscountedPrice = product?.colors?.data[0]?.discountedPrice;
        product.colors.data.map((item) => {
            if (item.price < minPrice && item.status == 1 && item.price > 0) {
                minPrice = item.price;
                minDiscountedPrice = item.discountedPrice;
            }
        })

        if (checkStock(product)) {
            if (minDiscountedPrice == minPrice)
                return <div className={"flex items-center gap-2 w-full justify-end flex-1"}>
                    <Prices price={minPrice}/>
                </div>
            else
                return <div className={"flex flex-col-reverse items-center gap-2 w-full justify-end flex-1"}>
                    <del className={"text-xs text-red-500"}>
                        {
                            new Intl.NumberFormat('fa').format(minPrice)
                        }
                    </del>
                    <Prices price={minDiscountedPrice}/>
                </div>

        }
        return <Badge color={"red"} name={"ناموجود"}/>;
    }

    return (
        <div className={`group relative   ${className}`}>
            <div className="relative flex flex-col">
                <NcImage
                    containerClassName="aspect-w-8 aspect-h-5 bg-white border rounded-2xl overflow-hidden"
                    className="object-contain w-full h-full rounded-2xl"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${imgs && imgs[0] && imgs[0].url}`}
                    width={720}
                    height={450}
                    alt=""
                    sizes="400px"
                />
                <div className="grid grid-cols-3 gap-2.5 mt-2.5">
                    <NcImage
                        containerClassName="w-full h-24 sm:h-28 border rounded-2xl"
                        className="object-cover w-full h-full rounded-2xl"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${imgs ? imgs[1].url ?? imgs[0].url : ""}`}
                        alt=""
                        sizes="150px"
                        width={720}
                        height={450}
                    />
                    <NcImage
                        containerClassName="w-full h-24 sm:h-28 border rounded-2xl"
                        className="object-cover w-full h-full rounded-2xl"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${imgs ? imgs[2]?.url ?? imgs[0]?.url : ""}`}
                        alt=""
                        width={720}
                        height={450}
                        sizes="150px"
                    />
                    <NcImage
                        containerClassName="w-full h-24 sm:h-28 border rounded-2xl"
                        className="object-cover w-full h-full rounded-2xl"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${imgs ? imgs[3]?.url ?? imgs[1]?.url ?? imgs[0]?.url : ""}`}
                        alt=""
                        sizes="150px"
                        width={720}
                        height={450}
                    />
                </div>
            </div>

            <div className="relative mt-5 flex items-center sm:items-start sm:flex-row gap-y-2 ">
                {/* TITLE */}
                <div className="flex-1 sm:flex-[2]">
                    <h2 className="font-semibold text-xs  sm:text-sm lg:text-lg text-right dark:text-white">{name}</h2>

                </div>
                 {product && renderMinPrice(product)}

            </div>
            <Link href={"/product/" + url as Route} className="absolute inset-0 " aria-label={"product"}></Link>
        </div>
    );
};

export default CollectionProductCard;
