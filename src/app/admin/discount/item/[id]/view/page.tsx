"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import React, {useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {QueryClient, useMutation, useQuery} from "react-query";
import Prices from "@/components/Price/Prices";
import Image from "next/image";
import {getItem, setItem} from "@/services/api/admin/discount";
import Input from "@/shared/Input/Input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {toMySqlDateTime} from "@/utils/dateFormat";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import toast from "react-hot-toast";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {DiscountItemResponse} from "@/services/types/discountItem";

export default function Page() {
    const queryClient = new QueryClient();
    const {id} = useParams();
    const [response, setResponse] = useState<DiscountItemResponse[]>([]);
    const [discountValues, setDiscountValues] = useState<Record<number, number>>({});
    const [expireDates, setExpireDates] = useState<Record<number, string>>({});
    const [top, setTop] = useState<Record<number, number>>({});
    const [expireDatesFa, setExpireDatesFa] = useState<Record<number, string>>({});

    const {data: discountList} = useQuery({
        queryKey: [`discount-list`],
        queryFn: () => getItem(Number(id)),
        staleTime: 5000,
        onSuccess: (res) => {
            setResponse(res);

            const initialDiscounts: Record<number, number> = {};
            const initialDates: Record<number, string> = {};
            const initialDatesFa: Record<number, string> = {};
            const initialTop: Record<number, number> = {};
            res.forEach((item) => {
                initialDiscounts[item.product_color_id] = item?.discount_price ?? 0;
                initialDates[item.product_color_id] = item?.discount_expire_time ?? "";
                initialDatesFa[item.product_color_id] = item?.discount_expire_time_fa ?? "";
                initialTop[item.product_color_id] = item?.top ?? 0;
            });

            setDiscountValues(initialDiscounts);
            setExpireDates(initialDates);
            setExpireDatesFa(initialDatesFa);
            setTop(initialTop);
        },
    });

    const actionMutation = useMutation({
        mutationKey: [`product-group-action`],
        mutationFn: async () => {
            let discount: {
                product_color_id: number;
                discount_price: number,
                top: number,
                expire_date?: string;
            }[] = [];

            response.forEach((item) => {
                discount.push({
                    product_color_id: item.product_color_id,
                    discount_price: discountValues[item.product_color_id],
                    top: top[item.product_color_id],
                    ...(expireDates[item.product_color_id] && {discount_expire_time: expireDates[item.product_color_id]}),
                });
            });

            return setItem({
                discount_id: Number(id),
                discount
            });
        },
        onSuccess: (res) => {
            toast.success(res.message as string);
            queryClient.invalidateQueries([`discount-list`]);
        },
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "تخفیفات", href: "discount"},
                    {title: "مشاهده تخفیفات", href: "discount/item/" + id + "view"},
                ]}
            />
            <Panel>
                <div className={"flex flex-col w-full text-sm"}>
                    {discountList?.map((item) => (
                        <div
                            className={" flex flex-col gap-2"}
                            key={item.id}
                        >

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
                                        <Prices price={item.discount_price ?? 0}/>

                                    </div>
                                </div>
                            </div>

                            <div
                                className={"border-b py-5 flex items-center gap-4"}
                            >

                                <Input
                                    type="number"
                                    value={discountValues[item.product_color_id] ?? ""}
                                    onChange={(e) =>
                                        setDiscountValues((prev) => ({
                                            ...prev,
                                            [item.product_color_id]: Number(e.target.value),
                                        }))
                                    }
                                />


                                <DatePicker
                                    inputClass={"block w-full border-neutral-200 focus:border-rose-600 focus:ring-0 focus:ring-rose-600 focus:ring-opacity-50 bg-white disabled:bg-neutral-200  h-11 px-4 py-3 text-sm font-normal rounded-2xl"}
                                    className="custom-date-picker flex-shrink-0 w-full"
                                    calendar={persian}        // تقویم شمسی (Jalali)
                                    locale={persian_fa}      // متن/اعداد فارسی
                                    value={expireDatesFa[item.product_color_id] || ""}
                                    format="YYYY/MM/DD HH:mm" // فرمت نمایش در input
                                    onChange={(d) => {
                                        if (!d?.isValid)
                                            return;
                                        const mysqlFormatted = toMySqlDateTime(d);
                                        setExpireDates((prev) => ({
                                            ...prev,
                                            [item.product_color_id]: mysqlFormatted,
                                        }))
                                    }}
                                    plugins={[<TimePicker key={0} position="bottom" hideSeconds/>]}
                                />
                                <span className={"text-red-600 cursor-pointer text-xs whitespace-nowrap"}
                                      onClick={() => {
                                          setExpireDates((prev) => ({
                                              ...prev,
                                              [item.product_color_id]: "",
                                          }))
                                          setExpireDatesFa((prev) => ({
                                              ...prev,
                                              [item.product_color_id]: "",
                                          }))
                                      }}>
                                            حذف تاریخ
                                        </span>

                                <div className={"flex items-center gap-1 whitespace-nowrap"}>
                                    <input type={"checkbox"} checked={top[item.product_color_id] ? true : false}
                                           onChange={(e) => {
                                               setTop((prev) => ({
                                                   ...prev,
                                                   [item.product_color_id]: Number(e.target.checked),
                                               }))

                                           }}/>
                                    <label className={"whitespace-nowrap"}>نمایش در اسلایدر تخفیف</label>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <ButtonPrimary
                    loading={actionMutation.isLoading}
                    onClick={() => actionMutation.mutateAsync()}
                >
                    ذخیره تخفیفات
                </ButtonPrimary>

            </Panel>
        </>
    );
}
