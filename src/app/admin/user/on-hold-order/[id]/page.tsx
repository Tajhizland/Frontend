"use client"
import {OrderItemResponse} from "@/services/types/orderItem";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import Image from "next/image";
import React, {useState} from "react";
import {useQuery} from "react-query";
import {OnHoldOrderResponse} from "@/services/types/onHoldOrder";
import Counter2 from "@/components/Counter/Counter2";
import Badge from "@/shared/Badge/Badge";
import Prices from "@/components/Price/Prices";
import MySwitch from "@/shared/Switch/MySwitch";
import {useUser} from "@/services/globalState/GlobalState";
import {getOnHoldOrder} from "@/services/api/admin/user";
import {useParams} from "next/navigation";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Panel from "@/shared/Panel/Panel";
import UserTab from "@/components/Tabs/UserTab";

const AccountOrder = () => {
    const {id} = useParams();
    const [page, setPage] = useState(1);
    const [useWallet, setUseWallet] = useState(false);
    const [user] = useUser();

    const OnHoldOrderStatus = ["در انتظار تایید", "تایید شده", "رد شده"];
    const {data: data} = useQuery({
        queryKey: ['my-on-hold-order', page],
        queryFn: () => getOnHoldOrder(Number(id), page),
        staleTime: 5000,
    });

    function changePageHandle(page: number) {
        setPage(page);
    }

    const calculateDifference = (targetDateTime: number) => {
        const now = Date.now();
        const diffInMilliseconds = targetDateTime * 1000 - now;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

        return (diffInSeconds);
    };
    const renderProductItem = (orderItem: OrderItemResponse, index: number) => {
        return (
            <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
                <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        fill
                        sizes="100px"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${orderItem.product.images.data[0].url}`}
                        alt={orderItem.product.name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <div className="mr-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="text-base font-medium line-clamp-1">{orderItem.product.name}</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span>{orderItem.productColor.color_name}</span>
                                    <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                </p>
                            </div>
                            <Prices className="mt-0.5 ml-2" price={orderItem.price}/>
                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
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


    const renderOrder = (item: OnHoldOrderResponse) => {
        return (
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
                <div
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                    <div>
                        <p className="text-lg font-semibold">{item.order_id}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                            <span>{item.created_at}</span>
                            <span className="mx-2">·</span>
                            <Badge color={"blue"} name={OnHoldOrderStatus[Number(item.status)]}/>
                            {
                                (item.status == 1 && item?.order && item?.order?.status < 3 && item.expire_date_time * 1000 < Date.now()) ?
                                    <Badge color={"red"} name={"زمان پرداخت منقضی شده"}/> : ""
                            }
                            {
                                (item.status == 1 && item?.order && item?.order?.status > 5 && item.expire_date_time * 1000 < Date.now()) ?
                                    <Badge color={"green"} name={"پرداخت شده"}/> : ""
                            }

                        </p>
                    </div>

                    {
                        (item.status == 1 && item.expire_date_time * 1000 > Date.now()) ?
                            <div className={"flex flex-col gap-y-2"}>
                                <div
                                    className="flex flex-col items-center font-semibold text-slate-900 dark:text-slate-200 text-xs  ">
                                    <div className={"flex items-center gap-1 text-xs"}>
                                        استفاده از موجودی کیف پول
                                    </div>
                                    <span>
                                    {(user?.wallet ?? 0).toLocaleString()} تومان
                                </span>
                                    <span>
                                      <MySwitch
                                          label=" "
                                          desc=" "
                                          enabled={!useWallet}
                                          onChange={() => {
                                              setUseWallet(!useWallet)
                                          }}
                                      />
                                </span>
                                </div>

                                <span className={"rounded-full bg-red-500 text-white p-2 text-xs text-center"}>
                                    <Counter2 initialSeconds={calculateDifference(item.expire_date_time)}/>
                                </span>
                            </div> : ""
                    }

                </div>
                <div
                    className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                    {
                        item?.order?.orderItems?.data.map((orderItem, index) => (<>
                            {renderProductItem(orderItem, index)}
                        </>))
                    }
                </div>
            </div>
        );
    };

    return (
        <>
            <Breadcrump breadcrumb={[
                {
                    title: "کاربران",
                    href: "user"
                },
                {
                    title: "ویرایش کاربر",
                    href: "user/update/" + id
                }
            ]}/>
            <Panel>
                <PageTitle>
                    سفارشات معلق کاربر
                </PageTitle>
                <UserTab id={id + ""}/>

                <div className="space-y-10 sm:space-y-12  dark:text-white">
                    {/* HEADING */}
                    {data?.data?.map((item) => (<>
                        {renderOrder(item)
                        }      </>))}
                    <div className="flex !mt-20 justify-center items-center">
                        <AdminPagination currentPage={data?.meta?.current_page ?? 1}
                                         totalPages={data?.meta?.last_page ?? 1}
                                         onPageChange={(p) => changePageHandle(p)}/>
                    </div>
                </div>
            </Panel>
        </>
    );
};

export default AccountOrder;
