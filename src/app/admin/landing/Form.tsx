"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {LandingResponse} from "@/services/types/landing";
import SunEditors from "@/shared/Editor/SunEditors";
import FormProgress from "@/shared/Progress/FormProgress";

export type LandingFormValues = {
    title: string;
    url: string;
    status: string;
    description: string;
};

interface Props {
    data?: LandingResponse;
    onSubmit: (values: LandingFormValues) => Promise<any> | void;
    loading?: boolean;
    resetOnSuccess?: boolean;
}

export default function Form({data, onSubmit, loading, resetOnSuccess}: Props) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<LandingFormValues>({
        defaultValues: {
            title: data?.title ?? "",
            url: data?.url ?? "",
            status: data?.status != null ? String(data.status) : "1",
            description: data?.description ?? "",
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
                    <Label>عنوان</Label>
                    <Input {...register("title", {required: "عنوان الزامی است"})} />
                    {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <Label>آدرس</Label>
                    <Input {...register("url", {required: "آدرس الزامی است"})} />
                    {errors.url && <p className="text-rose-500 text-xs mt-1">{errors.url.message}</p>}
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
            <FormProgress loading={loading} />
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"} loading={loading} disabled={loading}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    );
}
