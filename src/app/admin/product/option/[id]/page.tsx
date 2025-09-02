"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Label from "@/shared/Label/Label";
import ProductTab from "@/components/Tabs/ProductTab";
import {findByProductId} from "@/services/api/admin/option";
import Spinner from "@/shared/Loading/Spinner";
import Panel from "@/shared/Panel/Panel";
import {useParams} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {toast} from "react-hot-toast";
import {useQuery, useMutation, useQueryClient} from "react-query";
import {findById as productFindById} from "@/services/api/admin/product";
import ProductOptionForm from "@/app/admin/product/option/ProductOptionForm";
import {useForm, FormProvider} from "react-hook-form";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {updateProductOption} from "@/services/api/admin/option";

export default function Page() {
    const {id} = useParams();
    const [searchQuery, setSearchQuery] = useState("");
    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery({
        queryKey: [`option-info`, Number(id)],
        queryFn: () => findByProductId(Number(id)),
        staleTime: 5000,
    });

    const {data: productInfo} = useQuery({
        queryKey: [`product-info`],
        queryFn: () => productFindById(Number(id)),
        staleTime: 5000,
    });

    const methods = useForm({
        defaultValues: { options: [] as any[] },
    });

    // مقداردهی اولیه فرم فقط وقتی دیتا میاد (یا تغییر می‌کند)
    useEffect(() => {
        if (!data) return;
        const mapped = data.map((option: any) => ({
            productId: Number(id),
            id: option.productOption?.id ?? null,
            option_item_id: option.id,
            value: option.productOption?.value ?? "",
            _label: option.title, // فقط برای نمایش (اختیاری)
        }));
        // اگر حین تایپ، دیتا رفرش شد، مقادیر تغییر داده شده کاربر را نگه می‌دارد
        methods.reset({ options: mapped }, { keepDirtyValues: true });
    }, [data, id, methods]);

    const mutation = useMutation({
        mutationFn: async (formData: any) => updateProductOption(formData), // { options: [...] }
        onSuccess: (res) => {
            if (res.success) {
                toast.success(res.message ?? "ذخیره شد");
                queryClient.invalidateQueries([`option-info`]);
            }
        },
    });

    const filteredOptions = useMemo(() => {
        if (!data) return [];
        if (!searchQuery.trim()) return data;
        return data.filter((option: any) =>
            (option?.title ?? "").toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    // نقشه id -> index برای استفاده از اندیس واقعی داخل آرایه اصلی
    const indexMap = useMemo(() => {
        const m = new Map<number, number>();
        (data ?? []).forEach((opt: any, i: number) => m.set(opt.id, i));
        return m;
    }, [data]);

    return (
        <>
            <Breadcrump breadcrumb={[
                {title: "محصولات", href: "product"},
                {title: "ویرایش محصول" + " ( " + productInfo?.name + " )", href: "product/edit/" + id},
                {title: "ویرایش آپشن محصول", href: "product/option/" + id}
            ]}/>
            <Panel>
                <ProductTab id={id + ""} url={productInfo?.url ?? ""}/>
                {isLoading ? <Spinner/> : (
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit((formData) => mutation.mutateAsync(formData))}
                            className="flex flex-col gap-5"
                        >
                            <div className="mb-5">
                                <Label>جستجو بر اساس عنوان ویژگی</Label>
                                <input
                                    type="text"
                                    className="border p-2 w-full"
                                    placeholder="جستجو..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option: any) => (
                                    <ProductOptionForm
                                        key={option.id}
                                        index={indexMap.get(option.id)!} // اندیس واقعی در آرایه اصلی
                                        option={option}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">هیچ ویژگی‌ای یافت نشد</p>
                            )}

                            {filteredOptions.length > 0 && (
                                <div className="mt-5">
                                    <ButtonPrimary type="submit">
                                        ذخیره همه
                                    </ButtonPrimary>
                                </div>
                            )}
                        </form>
                    </FormProvider>
                )}
            </Panel>
        </>
    );
}
