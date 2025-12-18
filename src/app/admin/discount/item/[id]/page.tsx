"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import {searchProductList} from "@/services/api/admin/product";
import React, {useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {QueryClient, useMutation, useQuery} from "react-query";
import {categoryList} from "@/services/api/admin/category";
import {brandList} from "@/services/api/admin/brand";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {ProductResponse} from "@/services/types/product";
import Prices from "@/components/Price/Prices";
import Image from "next/image";
import Input from "@/shared/Input/Input";
import toast from "react-hot-toast";
import SearchableSelect from "@/shared/Select/SearchableSelect";
import {setItem} from "@/services/api/admin/discount";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Link from "next/link";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {toMySqlDateTime} from "@/utils/dateFormat";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

export default function Page() {
    const {id} = useParams();
    const queryClient = new QueryClient();
    const [category, setCategory] = useState<number>();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [brand, setBrand] = useState<number>();
    const [response, setResponse] = useState<ProductResponse[]>([]);
    const [discountValues, setDiscountValues] = useState<Record<number, number>>({});
    const [expireDates, setExpireDates] = useState<Record<number, string>>({});
    const [top, setTop] = useState<Record<number, number>>({});
    const [expireDatesFa, setExpireDatesFa] = useState<Record<number, string>>({});
    const router = useRouter();

    // Mutation برای جستجو
    const searchMutation = useMutation({
        mutationKey: [`search-product-list`],
        mutationFn: async () => {
            return searchProductList({
                brandId: Number(brand),
                categoryId: Number(category),
                searchQuery: searchQuery,
                discountId: Number(id)
            });
        },
        onSuccess: (res) => {
            setResponse(res);
            // مقداردهی اولیه تخفیف‌ها
            const initialDiscounts: Record<number, number> = {};
            const initialDates: Record<number, string> = {};
            const initialDatesFa: Record<number, string> = {};
            const initialTop: Record<number, number> = {};
            res.forEach((product) => {
                product.colors.data.forEach((color) => {
                    initialDiscounts[color.id] = color?.discountItem?.data?.[0]?.discount_price ?? 0;
                    initialDates[color.id] = color?.discountItem?.data?.[0]?.discount_expire_time ?? "";
                    initialDatesFa[color.id] = color?.discountItem?.data?.[0]?.discount_expire_time_fa ?? "";
                    initialTop[color.id] = color?.discountItem?.data?.[0]?.top ?? 0;
                });
            });

            setDiscountValues(initialDiscounts);
            setExpireDates(initialDates);
            setExpireDatesFa(initialDatesFa);
            setTop(initialTop);
        },
    });
    // Mutation برای جستجو
    const actionMutation = useMutation({
        mutationKey: [`product-group-action`],
        mutationFn: async () => {
            let discount: {
                product_color_id: number;
                discount_price: number,
                top: number,
                expire_date?: string;
            }[] = [];

            response.forEach((product) => {
                product.colors.data.forEach((color) => {
                    discount.push({
                        product_color_id: color.id,
                        discount_price: discountValues[color.id],
                        top: top[color.id],
                        ...(expireDates[color.id] && {discount_expire_time: expireDates[color.id]}),
                    });
                });
            });

            return setItem({
                discount_id: Number(id),
                discount
            });
        },
        onSuccess: (res) => {
            toast.success(res.message as string);
            queryClient.invalidateQueries([`search-product-list`]);
        },
    });


    // لیست دسته‌ها
    const {data: categoryLists} = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });

    // لیست برندها
    const {data: brandLists} = useQuery({
        queryKey: [`brand-list`],
        queryFn: () => brandList(),
        staleTime: 5000,
    });

    // ✅ تابع تغییر وضعیت چک‌باکس

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "تخفیفات", href: "discount"},
                    {title: "ویرایش تخفیفات", href: "discount/item/" + id},
                ]}
            />
            <Panel>
                <Link href={"/admin/discount/item/" + id + "/view"}>
                    <ButtonPrimary className={"w-fit !bg-[#fcb415]"}>
                        مشاهده همه محصولات تخفیف خورده
                    </ButtonPrimary>
                </Link>
                <Link href={"/admin/discount/item/" + id + "/sort"}>
                    <ButtonPrimary className={"w-fit !bg-rose-500"}>
                        سورت کردن تخفیف های برتر
                    </ButtonPrimary>
                </Link>
                <div className={"flex flex-col w-full gap-5"}>
                    <Input
                        placeholder={"جستجو"}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                        }}
                    />
                    <SearchableSelect
                        options={[
                            {
                                label: 'همه',
                                value: ''
                            },
                            ...(categoryLists?.data?.map((item) => ({
                                label: item.name,
                                value: item.id.toString(),
                            })) ?? []),
                        ]}
                        //@ts-ignore
                        value={category}
                        onChange={(e) => setCategory(Number(e))}
                    />
                    <SearchableSelect
                        options={[
                            {
                                label: 'همه',
                                value: ''
                            },
                            ...(brandLists?.data?.map((item) => ({
                                label: item.name,
                                value: item.id.toString(),
                            })) ?? []),
                        ]}
                        //@ts-ignore
                        value={brand}
                        onChange={(e) => setBrand(Number(e))}
                    />

                    <ButtonPrimary loading={searchMutation.isLoading} onClick={searchMutation.mutateAsync}>
                        جستجو
                    </ButtonPrimary>
                </div>
            </Panel>
            <Panel>
                <div className={"flex flex-col w-full text-sm"}>
                    {response?.map((item) => (
                        <div
                            className={"border-b py-5 flex items-center gap-4"}
                            key={item.id}
                        >


                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                                <Image
                                    fill
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item?.images?.data?.[0]?.url}`}
                                    alt={item.name}
                                    sizes="300px"
                                    className="h-full w-full object-contain object-center"
                                />
                            </div>

                            <div className={"py-5 flex flex-col gap-2"}>
                                <div className="font-medium">{item.name}</div>
                                {item.colors.data.map((color) => (
                                    <div
                                        className={"flex items-center gap-4 w-full flex-col sm:flex-row"}
                                        key={color.id}
                                    >
                                        {color.color_name}

                                        <Prices price={color.price ?? 0}/>

                                        <Input
                                            type="number"
                                            value={discountValues[color.id] ?? ""}
                                            onChange={(e) =>
                                                setDiscountValues((prev) => ({
                                                    ...prev,
                                                    [color.id]: Number(e.target.value),
                                                }))
                                            }
                                        />


                                        <DatePicker
                                            inputClass={"block w-full border-neutral-200 focus:border-rose-600 focus:ring-0 focus:ring-rose-600 focus:ring-opacity-50 bg-white disabled:bg-neutral-200  h-11 px-4 py-3 text-sm font-normal rounded-2xl"}
                                            className="custom-date-picker flex-shrink-0 w-full"
                                            calendar={persian}        // تقویم شمسی (Jalali)
                                            locale={persian_fa}      // متن/اعداد فارسی
                                            value={expireDatesFa[color.id] || ""}
                                            format="YYYY/MM/DD HH:mm" // فرمت نمایش در input
                                            onChange={(d) => {
                                                if (!d?.isValid)
                                                    return;
                                                const mysqlFormatted = toMySqlDateTime(d);
                                                setExpireDates((prev) => ({
                                                    ...prev,
                                                    [color.id]: mysqlFormatted,
                                                }))
                                            }}
                                            plugins={[<TimePicker key={0} position="bottom" hideSeconds/>]}
                                        />
                                        <span className={"text-red-600 cursor-pointer text-xs whitespace-nowrap"}
                                              onClick={() => {
                                                  setExpireDates((prev) => ({
                                                      ...prev,
                                                      [color.id]: "",
                                                  }))
                                                  setExpireDatesFa((prev) => ({
                                                      ...prev,
                                                      [color.id]: "",
                                                  }))
                                              }}>
                                            حذف تاریخ
                                        </span>

                                        <div className={"flex items-center gap-1 whitespace-nowrap"}>
                                            <input type={"checkbox"} checked={top[color.id] ? true : false}
                                                   onChange={(e) => {
                                                       setTop((prev) => ({
                                                           ...prev,
                                                           [color.id]: Number(e.target.checked),
                                                       }))

                                                   }}/>
                                            <label className={"whitespace-nowrap"}>نمایش در اسلایدر تخفیف</label>

                                        </div>


                                    </div>
                                ))}
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
