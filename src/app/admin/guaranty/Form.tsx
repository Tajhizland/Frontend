"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {GuarantyResponse} from "@/services/types/guaranty";
import SunEditors from "@/shared/Editor/SunEditors";
import ImageField from "@/shared/Uploader/ImageField";
import FormProgress from "@/shared/Progress/FormProgress";

export type GuarantyFormValues = {
    name: string;
    url: string;
    free: string;
    status: string;
    description: string;
    icon?: File | null;
};

interface Props {
    data?: GuarantyResponse;
    onSubmit: (values: GuarantyFormValues) => Promise<any> | void;
    loading?: boolean;
    progress?: number;
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
    } = useForm<GuarantyFormValues>({
        defaultValues: {
            name: data?.name ?? "",
            url: data?.url ?? "",
            free: data?.free != null ? String(data.free) : "1",
            status: data?.status != null ? String(data.status) : "1",
            description: data?.description ?? "",
            icon: null,
        },
    });

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
                    <Label>نام</Label>
                    <Input {...register("name", {required: "نام الزامی است"})} />
                    {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <Label>آدرس</Label>
                    <Input {...register("url", {required: "آدرس الزامی است"})} />
                    {errors.url && <p className="text-rose-500 text-xs mt-1">{errors.url.message}</p>}
                </div>
                <div>
                    <Label>رایگان</Label>
                    <Select {...register("free")}>
                        <option value={1}>بله</option>
                        <option value={0}>خیر</option>
                    </Select>
                </div>
                <div>
                    <Label>وضعیت</Label>
                    <Select {...register("status")}>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
                    </Select>
                </div>
            </div>

            <hr className={"my-5"} />
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>توضیحات</Label>
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

            <hr className={"my-5"} />
            <div className="mt-5">
                <Label>آیکن</Label>
                <Controller
                    name="icon"
                    control={control}
                    render={({field}) => (
                        <ImageField
                            name="icon"
                            previousSrc={data?.icon ? `${base}/guaranty/${data.icon}` : undefined}
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
