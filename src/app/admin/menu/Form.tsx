"use client";

import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {MenuResponse} from "@/services/types/menu";
import {useQuery} from "react-query";
import {deleteBanner, menuList} from "@/services/api/admin/menu";
import {TrashIcon} from "@heroicons/react/24/solid";
import {toast} from "react-hot-toast";
import {categoryList} from "@/services/api/admin/category";
import Label from "@/shared/Label/Label";
import ImageField from "@/shared/Uploader/ImageField";
import FormProgress from "@/shared/Progress/FormProgress";

export type MenuFormValues = {
    title: string;
    url: string;
    status: string;
    parent_id: string;
    category_id: string;
    banner_link: string;
    banner_logo?: File | null;
};

interface Props {
    data?: MenuResponse;
    onSubmit: (values: MenuFormValues) => Promise<any> | void;
    loading?: boolean;
    progress?: number;
    resetOnSuccess?: boolean;
}

const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function Form({data, onSubmit, loading, progress, resetOnSuccess}: Props) {
    const {data: list} = useQuery({
        queryKey: [`menu-list`],
        queryFn: () => menuList(),
        staleTime: 5000,
    });
    const {data: categoryLists} = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<MenuFormValues>({
        defaultValues: {
            title: data?.title ?? "",
            url: data?.url ?? "",
            status: data?.status != null ? String(data.status) : "1",
            parent_id: data?.parent_id != null ? String(data.parent_id) : "0",
            category_id: data?.category_id != null ? String(data.category_id) : "0",
            banner_link: data?.banner_link ?? "",
            banner_logo: null,
        },
    });

    const deleteBannerHandle = async () => {
        if (data?.id) {
            let response = await deleteBanner(data.id);
            if (response?.success) {
                toast.success(response?.message as string);
                window.location.reload();
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(async (values) => {
                try {
                    await onSubmit(values);
                    if (resetOnSuccess) reset();
                } catch {
                    /* خطا توسط interceptor نمایش داده می‌شود */
                }
            })}
        >
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>عنوان منو</Label>
                    <Input {...register("title", {required: "عنوان منو الزامی است"})} />
                    {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <Label>ادرس منو</Label>
                    <Input {...register("url")} />
                </div>
                <div>
                    <Label>وضعیت منو</Label>
                    <Select {...register("status")}>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
                    </Select>
                </div>
                <div>
                    <Label>والد</Label>
                    <Select {...register("parent_id")}>
                        <option value={0}>بدون والد</option>
                        {list &&
                            list.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.title}
                                </option>
                            ))}
                    </Select>
                </div>
                <div>
                    <Label>دسته بندی</Label>
                    <Select {...register("category_id")}>
                        <option value={0}>بدون دسته بندی</option>
                        {categoryLists?.data.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Label>آدرس بنر</Label>
                    <Input {...register("banner_link")} />
                </div>
                <div>
                    <Label>تصویر بنر</Label>
                    <Controller
                        name="banner_logo"
                        control={control}
                        render={({field}) => (
                            <ImageField
                                name="banner_logo"
                                previousSrc={data?.banner_logo ? `${base}/menu/${data.banner_logo}` : undefined}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                    {data?.banner_logo && (
                        <button
                            type="button"
                            onClick={() => deleteBannerHandle()}
                            className="mt-2 inline-flex items-center gap-1 text-xs text-rose-600 hover:underline"
                        >
                            <TrashIcon className={"w-4 h-4 text-red-500"} />
                            حذف بنر فعلی
                        </button>
                    )}
                </div>
            </div>

            <hr className={"my-5"} />
            <FormProgress loading={loading} progress={progress} />
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"} loading={loading} disabled={loading}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    );
}
