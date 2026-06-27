"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import {
groupChangeDigipayPercent ,
    groupChangeDigipay,
    groupChangeSnappay,
    groupChangePrice,
    groupChangeStatus,
    groupChangeStock,
    searchProductList
} from "@/services/api/admin/product";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {QueryClient, useMutation, useQuery} from "react-query";
import {categoryList} from "@/services/api/admin/category";
import {brandList} from "@/services/api/admin/brand";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {ProductResponse} from "@/services/types/product";
import Prices from "@/components/Price/Prices";
import Image from "next/image";
import Input from "@/shared/Input/Input";
import Label from "@/shared/Label/Label";
import toast from "react-hot-toast";
import MultiSelect from "@/shared/Select/MultiSelect";
import SearchableSelect from "@/shared/Select/SearchableSelect";

export default function Page() {
    const queryClient = new QueryClient();
    const [category, setCategory] = useState<number>();
    const [brand, setBrand] = useState<number>();
    const [action, setAction] = useState<string>("inc");
    const [stock, setStock] = useState<number>();
    const [status, setStatus] = useState<number>(1);
    const [percent, setPercent] = useState<number>(0);
    const [digipay, setDigipay] = useState<number>(1);
    const [snappay, setSnappay] = useState<number>(1);
    const [response, setResponse] = useState<ProductResponse[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Record<number, boolean>>({});
    const [searchName, setSearchName] = useState<string>("");

    const router = useRouter();

    // Mutation برای جستجو
    const searchMutation = useMutation({
        mutationKey: [`search-product-list`],
        mutationFn: async () => {
            return searchProductList({
                searchQuery:searchName ,
                brandId: Number(brand),
                categoryId: Number(category)
            });
        },
        onSuccess: (res) => {
            setResponse(res);
            // ✅ وقتی داده‌ها لود شدن، همه رو تیک بزن
            const initialSelection: Record<number, boolean> = {};
            res.forEach((item: ProductResponse) => {
                initialSelection[item.id] = true;
            });
            setSelectedProducts(initialSelection);
        },
    });
    // Mutation برای جستجو
    const actionStatusMutation = useMutation({
        mutationKey: [`product-group-status`],
        mutationFn: async () => {
            const ids = Object.keys(selectedProducts)
                .filter((id) => selectedProducts[Number(id)])
                .map((id) => Number(id));
            return groupChangeStatus({
                ids: ids,
                status: Number(status)
            });
        },
        onSuccess: async (res) => {
            await searchMutation.mutateAsync();
            toast.success(res.message as string);
        },
    });
    const actionDigipayMutation = useMutation({
        mutationKey: [`product-group-digipay`],
        mutationFn: async () => {
            const ids = Object.keys(selectedProducts)
                .filter((id) => selectedProducts[Number(id)])
                .map((id) => Number(id));
            return groupChangeDigipay({
                ids: ids,
                digipay: Number(digipay)
            });
        },
        onSuccess: async (res) => {
            await searchMutation.mutateAsync();
            toast.success(res.message as string);
        },
    });
    const actionSnappayMutation = useMutation({
        mutationKey: [`product-group-snappay`],
        mutationFn: async () => {
            const ids = Object.keys(selectedProducts)
                .filter((id) => selectedProducts[Number(id)])
                .map((id) => Number(id));
            return groupChangeSnappay({
                ids: ids,
                snappay: Number(snappay)
            });
        },
        onSuccess: async (res) => {
            await searchMutation.mutateAsync();
            toast.success(res.message as string);
        },
    });
    const actionStockMutation = useMutation({
        mutationKey: [`product-group-stock`],
        mutationFn: async () => {
            const ids = Object.keys(selectedProducts)
                .filter((id) => selectedProducts[Number(id)])
                .map((id) => Number(id));
            return groupChangeStock({
                ids: ids,
                stock: Number(stock)
            });
        },
        onSuccess: async (res) => {
            await searchMutation.mutateAsync();
            toast.success(res.message as string);
        },
    });

   const actionDigipayExtraPriceMutation = useMutation({
        mutationKey: [`product-group-extra-price`],
        mutationFn: async () => {
            const ids = Object.keys(selectedProducts)
                .filter((id) => selectedProducts[Number(id)])
                .map((id) => Number(id));
            return groupChangeDigipayPercent({
                ids: ids,
                percent: Number(percent)
            });
        },
        onSuccess: async (res) => {
            await searchMutation.mutateAsync();
            toast.success(res.message as string);
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
    const handleCheckboxChange = (id: number) => {
        setSelectedProducts((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const options = categoryLists?.data.map((item) => ({
        value: item.id,
        label: item.name,
    }));


// تابع انتخاب همه محصولات
    const selectAll = () => {
        const newSelection: Record<number, boolean> = {};
        response.forEach((item: ProductResponse) => {
            newSelection[item.id] = true;
        });
        setSelectedProducts(newSelection);
    };

// تابع عدم انتخاب همه محصولات
    const deselectAll = () => {
        const newSelection: Record<number, boolean> = {};
        response.forEach((item: ProductResponse) => {
            newSelection[item.id] = false;
        });
        setSelectedProducts(newSelection);
    };

// تابع معکوس کردن انتخاب‌ها
    const toggleSelectAll = () => {
        const allSelected = response.length > 0 && response.every(item => selectedProducts[item.id]);
        if (allSelected) {
            deselectAll();
        } else {
            selectAll();
        }
    };

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "محصولات", href: "product"},
                    {title: "تغییر گروهی وضعیت", href: "product/group-stock"},
                ]}
            />
            <Panel>
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
                    <Input value={searchName} onChange={(e)=>{setSearchName(e.target.value)}} />

                    <ButtonPrimary loading={searchMutation.isLoading} onClick={searchMutation.mutateAsync}>
                        جستجو
                    </ButtonPrimary>
                </div>
            </Panel>

            <Panel>
                <div className={"flex flex-col gap-5"}>
                    <div>
                        <Label>
                            نوع عملیات
                        </Label>
                        <Select
                            onChange={(e) => {
                                setAction(e.target.value)
                            }}
                        >
                            <option value={""}>انتخاب کنید</option>
                            <option value={"stock"}>ویرایش موجودی</option>
                            <option value={"status"}>ویرایش وضعیت</option>
                            <option value={"digipay"}>ویرایش دیجی پی</option>
                            <option value={"snappay"}>ویرایش اسنپ پی</option>
                            <option value={"digipay-percent"}>درصد هزینه دیجی پی</option>

                        </Select>
                    </div>
                    <hr/>
                    {
                        action == "stock"
                        &&
                        <div className={"flex flex-col gap-2"}>
                            <Label>
                                موجودی
                            </Label>
                            <Input
                                value={stock}
                                onChange={(e) => {
                                    setStock(Number(e.target.value))
                                }}
                            />

                            <ButtonPrimary loading={actionStockMutation.isLoading} onClick={actionStockMutation.mutateAsync}>
                                اعمال
                            </ButtonPrimary>
                        </div>
                    } {
                    action == "status"
                    &&
                    <div className={"flex flex-col gap-2"}>
                        <Label>
                            وضعیت
                        </Label>
                        <Select onChange={(e) => {
                            setStatus(Number(e.target.value))
                        }}>
                            <option value={1} selected={status == 1}>فعال</option>
                            <option value={0} selected={status == 0}>غیر فعال</option>
                            <option value={2} selected={status == 2}>محدودیت</option>
                        </Select>

                        <ButtonPrimary loading={actionStatusMutation.isLoading} onClick={actionStatusMutation.mutateAsync}>
                            اعمال
                        </ButtonPrimary>
                    </div>
                }{
                    action == "digipay"
                    &&
                    <div className={"flex flex-col gap-2"}>
                        <Label>
                           پرداخت دیجی پی
                        </Label>
                        <Select onChange={(e) => {
                            setDigipay(Number(e.target.value))
                        }}>
                            <option value={1} selected={digipay == 1}>فعال</option>
                            <option value={0} selected={digipay == 0}>غیر فعال</option>
                        </Select>

                        <ButtonPrimary loading={actionDigipayMutation.isLoading} onClick={actionDigipayMutation.mutateAsync}>
                            اعمال
                        </ButtonPrimary>
                    </div>
                }{
                    action == "snappay"
                    &&
                    <div className={"flex flex-col gap-2"}>
                        <Label>
                           پرداخت اسنپ پی
                        </Label>
                        <Select onChange={(e) => {
                            setSnappay(Number(e.target.value))
                        }}>
                            <option value={1} selected={snappay == 1}>فعال</option>
                            <option value={0} selected={snappay == 0}>غیر فعال</option>
                        </Select>

                        <ButtonPrimary loading={actionSnappayMutation.isLoading} onClick={actionSnappayMutation.mutateAsync}>
                            اعمال
                        </ButtonPrimary>
                    </div>
                }
{
                    action == "digipay-percent"
                    &&
                    <div className={"flex flex-col gap-2"}>
                        <Label>
                            دصد هزینه دیجی پی
                        </Label>
                        <Input
                            value={stock}
                            onChange={(e) => {
                                setPercent(Number(e.target.value))
                            }}
                        />
                        <ButtonPrimary loading={actionDigipayExtraPriceMutation.isLoading}
                                       onClick={actionDigipayExtraPriceMutation.mutateAsync}>
                            اعمال
                        </ButtonPrimary>
                    </div>
                }
                </div>
            </Panel>
            <Panel>
                 <div className={"flex flex-col w-full text-sm"}>
                    {/* هدر جدول با دکمه‌های انتخاب */}
                    <div className={"border-b py-5 flex items-center justify-between gap-4 mb-4"}>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={selectAll}
                                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                انتخاب همه
                            </button>
                            <button
                                onClick={deselectAll}
                                className="px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                            >
                                حذف همه
                            </button>
                            <button
                                onClick={toggleSelectAll}
                                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                            >
                                {response.length > 0 && response.every(item => selectedProducts[item.id])
                                    ? 'عدم انتخاب همه'
                                    : 'انتخاب همه'}
                            </button>
                        </div>
                        <div className="text-sm text-gray-600">
                            {Object.values(selectedProducts).filter(v => v).length} از {response.length} انتخاب شده
                        </div>
                    </div>
                </div>

                <div className={"flex flex-col w-full text-sm"}>
                    {response?.map((item) => (
                        <div
                            className={"border-b py-5 flex items-center gap-4"}
                            key={item.id}
                        >
                            {/* ✅ چک‌باکس انتخاب */}
                            <input
                                type="checkbox"
                                checked={!!selectedProducts[item.id]}
                                onChange={() => handleCheckboxChange(item.id)}
                                className="w-5 h-5 accent-blue-600"
                            />

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
                                        className={"flex items-center gap-4"}
                                        key={color.id}
                                    >
                                        {color.color_name}
                                        |
                                        <div className={"flex items-center gap-1"}>
                                            <span>وضعیت</span>
                                            <span>
                                                {color.status==1?"فعال" : color.status==0?"غیر فعال" : color.status==2?"محدود" : "ناشناخته"}
                                            </span>
                                        </div>
                                        |
                                        <div className={"flex items-center gap-1"}>
                                            <span>موجودی</span>
                                            <span>
                                                {color.stock}
                                            </span>
                                        </div>
                                        |
                                        <Prices price={color.price ?? 0}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>
        </>
    );
}
