"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {BrandResponse} from "@/services/types/brand";
import SunEditors from "@/shared/Editor/SunEditors";
import ImageField from "@/shared/Uploader/ImageField";
import FormProgress from "@/shared/Progress/FormProgress";

export type BrandFormValues = {
    name: string;
    url: string;
    status: string;
    description: string;
    image?: File | null;
    banner?: File | null;
};

interface Props {
    data?: BrandResponse;
    onSubmit: (values: BrandFormValues) => Promise<any> | void;
    loading?: boolean;
    /** درصد آپلود تصویر */
    progress?: number;
    /** بعد از ثبت موفق، فرم ریست شود تا مورد جدید ساخته شود (مناسب صفحات ایجاد) */
    resetOnSuccess?: boolean;
}

const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function Form({data, onSubmit, loading, progress, resetOnSuccess}: Props) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<BrandFormValues>({
        defaultValues: {
            name: data?.name ?? "",
            url: data?.url ?? "",
            status: data?.status ?? "1",
            description: data?.description ?? "",
            image: null,
            banner: null,
        },
    });

    return (
        <form
            onSubmit={handleSubmit(async (values) => {
                try {
                    await onSubmit(values);
                    if (resetOnSuccess) reset();
                } catch {
                    /* خطا توسط interceptor/تست نمایش داده می‌شود */
                }
            })}
        >
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام برند</Label>
                    <Input {...register("name", {required: "نام برند الزامی است"})} />
                    {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <Label>ادرس برند</Label>
                    <Input {...register("url", {required: "آدرس برند الزامی است"})} />
                    {errors.url && <p className="text-rose-500 text-xs mt-1">{errors.url.message}</p>}
                </div>
                <div>
                    <Label>وضعیت برند</Label>
                    <Select {...register("status")}>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
                    </Select>
                </div>
            </div>

            <hr className={"my-5"} />
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>توضیحات برند</Label>
                    <Controller
                        name="description"
                        control={control}
                        render={({field}) => (
                            <SunEditors
                                name="description"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="mt-5">
                <Label>تصویر بنر</Label>
                <Controller
                    name="banner"
                    control={control}
                    render={({field}) => (
                        <ImageField
                            name="banner"
                            previousSrc={data?.banner ? `${base}/brand-banner/${data.banner}` : undefined}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                    )}
                />
            </div>

            <div className="mt-5">
                <Label>تصویر برند</Label>
                <Controller
                    name="image"
                    control={control}
                    render={({field}) => (
                        <ImageField
                            name="image"
                            previousSrc={data?.image ? `${base}/brand/${data.image}` : undefined}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                    )}
                />
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
