"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {PageResponse} from "@/services/types/page";
import SunEditors from "@/shared/Editor/SunEditors";
import ImageField from "@/shared/Uploader/ImageField";
import FormProgress from "@/shared/Progress/FormProgress";

export type PageFormValues = {
    title: string;
    url: string;
    status: string;
    content: string;
    image?: File | null;
};

interface Props {
    data?: PageResponse;
    onSubmit: (values: PageFormValues) => Promise<any> | void;
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
    } = useForm<PageFormValues>({
        defaultValues: {
            title: data?.title ?? "",
            url: data?.url ?? "",
            status: data?.status != null ? String(data.status) : "1",
            content: data?.content ?? "",
            image: null,
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
                    <Label>عنوان صفحه</Label>
                    <Input {...register("title", {required: "عنوان صفحه الزامی است"})} />
                    {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <Label>ادرس صفحه</Label>
                    <Input {...register("url", {required: "آدرس صفحه الزامی است"})} />
                    {errors.url && <p className="text-rose-500 text-xs mt-1">{errors.url.message}</p>}
                </div>
                <div>
                    <Label>وضعیت صفحه</Label>
                    <Select {...register("status")}>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
                    </Select>
                </div>
            </div>

            <hr className={"my-5"} />
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>محتوا صفحه</Label>
                    <Controller
                        name="content"
                        control={control}
                        render={({field}) => (
                            <SunEditors
                                name="content"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="mt-5">
                <Label>تصویر صفحه</Label>
                <Controller
                    name="image"
                    control={control}
                    render={({field}) => (
                        <ImageField
                            name="image"
                            previousSrc={data?.image ? `${base}/page/${data.image}` : undefined}
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
