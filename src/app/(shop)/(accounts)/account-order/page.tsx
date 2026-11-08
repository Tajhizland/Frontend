"use client"
import {OrderStatus} from "@/app/admin/order/orderStatus";
import {myOrders} from "@/services/api/shop/order";
import {OrderResponse} from "@/services/types/order";
import {OrderItemResponse} from "@/services/types/orderItem";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import Image from "next/image";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {GuarantyPrice} from "@/hooks/GuarantyPrice";
import Prices from "@/components/Price/Prices";

const AccountOrder = () => {
    const [page, setPage] = useState(1);

    const {data: order} = useQuery({
        queryKey: ['my-order', page],
        queryFn: () => myOrders(page),
        staleTime: 5000,
    });

    function changePageHandle(page: number) {
        setPage(page);
    }

    const renderProductItem = (orderItem: OrderItemResponse, index: number) => {
        return (
            <div key={index} className="flex gap-3 py-4 sm:gap-4 sm:py-7 last:pb-0 first:pt-0">
                <div className="relative h-20 w-16 sm:h-24 sm:w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        fill
                        sizes="100px"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${orderItem.product.images[0].url}`}
                        alt={orderItem.product.name}
                        className="h-full w-full object-contain object-center"
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div>
                        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:justify-between">
                            <div>
                                <h3 className="line-clamp-2 break-words text-sm font-medium leading-6 sm:text-base">{orderItem.product.name}</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span>{orderItem.productColor.color_name}</span>
                                    <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                </p>
                            </div>
                            <Prices className="mt-0.5 shrink-0" price={orderItem.price}/>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {orderItem.guaranty?.name}
                                        </span>
                        {
                            orderItem.guaranty ?
                                orderItem.guaranty?.free ?
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                    گارانتی (رایگان)
                              </span>
                                    :
                                    <Prices priceClass="text-xs text-slate-500 dark:text-slate-400"
                                            price={GuarantyPrice(orderItem.price)}/>
                                :
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                          </span>
                        }
                    </div>
                    <div className="flex flex-1 items-end justify-between text-xs sm:text-sm">
                        <p className="text-gray-500 dark:text-slate-400 flex items-center">
                            <span className="hidden sm:inline-block">تعداد</span>
                            <span className="inline-block sm:hidden">x</span>
                            <span className="mr-2">{orderItem.count}</span>
                        </p>

                    </div>
                </div>
            </div>
        );
    };

    const renderOrder = (item: OrderResponse) => {
        return (
            <div key={item.id} className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden z-0">
                <div
                    className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                    <div>
                        <p className="text-sm font-semibold sm:text-lg">شماره سفارش : {item.id}</p>
                        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-6 text-slate-500 dark:text-slate-400 sm:text-sm">
                            <span>{item.order_date}</span>
                            <span className="mx-2">·</span>
                            <span className="text-primary-500">{OrderStatus[Number(item.status)]}</span>

                        </p>
                    </div>
                    <ButtonPrimary className="w-full shrink-0 sm:w-auto" sizeClass="px-5 py-3" fontSize="text-sm" href={"/factor/" + item.id}>
                        دریافت فاکتور
                    </ButtonPrimary>

                </div>
                <div
                    className="border-t border-slate-200 dark:border-slate-700 p-4 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                    {
                        item.orderItems?.map(renderProductItem)
                    }
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-10 sm:space-y-12  dark:text-white">
            {/* HEADING */} 
            {order?.data?.map(renderOrder)}

            <div className="flex !mt-20 justify-center items-center">
                <AdminPagination currentPage={order?.meta?.current_page ?? 1}
                                 totalPages={order?.meta?.last_page ?? 1} onPageChange={(p) => changePageHandle(p)}/>
            </div>
        </div>
    );
};

export default AccountOrder;
