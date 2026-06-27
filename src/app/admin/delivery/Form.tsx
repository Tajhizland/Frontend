"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {DeliveryResponse} from "@/services/types/delivery";
import ImageField from "@/shared/Uploader/ImageField";
import FormProgress from "@/shared/Progress/FormProgress";

export type DeliveryFormValues = {
    name: string;
    price: string;
    status: string;
    description: string;
    logo?: File | null;
};

interface Props {
    data?: DeliveryResponse;
    onSubmit: (values: DeliveryFormValues) => Promise<any> | void;
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
    } = useForm<DeliveryFormValues>({
        defaultValues: {
            name: data?.name ?? "",
            price: data?.price != null ? String(data.price) : "",
            status: data?.status != null ? String(data.status) : "1",
            description: data?.description ?? "",
            logo: null,
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
                    <Label>نام سرویس</Label>
                    <Input {...register("name", {required: "نام سرویس الزامی است"})} />
                    {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <Label>هزینه سرویس</Label>
                    <Input {...register("price", {required: "هزینه سرویس الزامی است"})} />
                    {errors.price && <p className="text-rose-500 text-xs mt-1">{errors.price.message}</p>}
                </div>
                <div>
                    <Label>وضعیت سرویس</Label>
                    <Select {...register("status")}>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
                    </Select>
                </div>
            </div>

            <hr className={"my-5"} />
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>توضیحات سرویس</Label>
                    <Textarea {...register("description")} />
                </div>
                <div>
                    <Label>لوگو سرویس</Label>
                    <Controller
                        name="logo"
                        control={control}
                        render={({field}) => (
                            <ImageField
                                name="logo"
                                previousSrc={data?.logo ? `${base}/delivery/${data.logo}` : undefined}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
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
