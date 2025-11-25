"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import React from "react";
import {useParams, useRouter} from "next/navigation";
import {useQuery} from "react-query";
import Prices from "@/components/Price/Prices";
import Image from "next/image";
import {getItem} from "@/services/api/admin/discount";

export default function Page() {
    const {id} = useParams();

    const {data: discountList} = useQuery({
        queryKey: [`discount-list`],
        queryFn: () => getItem(Number(id)),
        staleTime: 5000,
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "تخفیفات", href: "discount"},
                    {title: "مشاهده تخفیفات", href: "discount/item/" + id+"view"},
                ]}
            />
            <Panel>
                <div className={"flex flex-col w-full text-sm"}>
                    {discountList?.map((item) => (
                        <div
                            className={"border-b py-5 flex items-center gap-4"}
                            key={item.id}
                        >


                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                                <Image
                                    fill
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.productColor?.product?.images?.data?.[0]?.url}`}
                                    alt={item.productColor?.product?.name ?? ""}
                                    sizes="300px"
                                    className="h-full w-full object-contain object-center"
                                />
                            </div>

                            <div className={"py-5 flex flex-col gap-2"}>
                                <div className="font-medium">{item.productColor?.product?.name}</div>
                                <div
                                    className={"flex items-center gap-4 w-full"}
                                    key={item.productColor?.id}
                                >
                                    {item.productColor?.color_name}
                                    <del className={"text-red-600"}>
                                        {item.productColor?.price}
                                    </del>
                                    <Prices price={item.discount ?? 0}/>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </Panel>
        </>
    );
}
