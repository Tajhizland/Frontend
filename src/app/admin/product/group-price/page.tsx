"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import {groupChangePrice, searchProductList} from "@/services/api/admin/product";
import {useState} from "react";
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

export default function Page() {
    const queryClient = new QueryClient();
    const [category, setCategory] = useState<number>();
    const [brand, setBrand] = useState<number>();
    const [action, setAction] = useState<string>("inc");
    const [percent, setPercent] = useState<number>();
    const [response, setResponse] = useState<ProductResponse[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Record<number, boolean>>({});

    const router = useRouter();

    // Mutation برای جستجو
    const searchMutation = useMutation({
        mutationKey: [`search-product-list`],
        mutationFn: async () => {
            return searchProductList({
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
    const actionMutation = useMutation({
        mutationKey: [`product-group-action`],
        mutationFn: async () => {
            const ids = Object.keys(selectedProducts)
                .filter((id) => selectedProducts[Number(id)])
                .map((id) => Number(id));

            return groupChangePrice({
                ids: ids,
                action: action,
                percent: Number(percent)
            });
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries([`search-product-list`]);
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

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "محصولات", href: "product"},
                    {title: "تغییر گروهی قیمت", href: "product/create"},
                ]}
            />
            <Panel>
                <div className={"flex flex-col w-full gap-5"}>
                    <Select
                        onChange={(e) => setCategory(Number(e.target.value))}
                        name={"category"}
                        className={"text-black"}
                    >
                        <option>انتخاب کنید</option>
                        {categoryLists?.data?.map((item) => (
                            <option className={"text-black"} value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                    <Select
                        onChange={(e) => setBrand(Number(e.target.value))}
                        name={"brand"}
                        className={"text-black"}
                    >
                        <option>انتخاب کنید</option>
                        {brandLists?.data?.map((item) => (
                            <option className={"text-black"} value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
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
                            <option value={"inc"}>افزایش قیمت</option>
                            <option value={"dec"}>کاهش قیمت</option>
                        </Select>
                    </div>

                    <div>
                        <Label>
                            درصد تغییر
                        </Label>
                        <Input
                            value={percent}
                            onChange={(e) => {
                                setPercent(Number(e.target.value))
                            }}
                        />
                    </div>
                    <ButtonPrimary loading={actionMutation.isLoading} onClick={actionMutation.mutateAsync}>
                        اعمال
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
