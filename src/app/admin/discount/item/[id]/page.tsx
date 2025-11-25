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

export default function Page() {
    const {id} = useParams();
    const queryClient = new QueryClient();
    const [category, setCategory] = useState<number>();
    const [brand, setBrand] = useState<number>();
    const [response, setResponse] = useState<ProductResponse[]>([]);
    const [discountValues, setDiscountValues] = useState<Record<number, number>>({});
    const router = useRouter();

    // Mutation برای جستجو
    const searchMutation = useMutation({
        mutationKey: [`search-product-list`],
        mutationFn: async () => {
            return searchProductList({
                brandId: Number(brand),
                categoryId: Number(category),
                discountId: Number(id)
            });
        },
        onSuccess: (res) => {
            setResponse(res);
            // مقداردهی اولیه تخفیف‌ها
            const initialDiscounts: Record<number, number> = {};
            res.forEach((product) => {
                product.colors.data.forEach((color) => {
                    initialDiscounts[color.id] = color?.discountItem?.data?.[0]?.discount ?? 0;
                });
            });

            setDiscountValues(initialDiscounts);
        },
    });
    // Mutation برای جستجو
    const actionMutation = useMutation({
        mutationKey: [`product-group-action`],
        mutationFn: async () => {
            let discount: { product_color_id: number; discount_price: number }[] = [];

            response.forEach((product) => {
                product.colors.data.forEach((color) => {
                    discount.push({
                        product_color_id: color.id,
                        discount_price: discountValues[color.id],
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
                <Link href={"/discount/item/" + id + "view"}>
                    <ButtonPrimary className={"w-fit !bg-[#fcb415]"}>
                        مشاهده همه محصولات تخفیف خورده
                    </ButtonPrimary>
                </Link>
                <div className={"flex flex-col w-full gap-5"}>
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
                                        className={"flex items-center gap-4 w-full"}
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
