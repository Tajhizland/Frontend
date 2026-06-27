"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React from "react";
import {useForm} from "react-hook-form";
import {GatewayResponse} from "@/services/types/gateway";
import FormProgress from "@/shared/Progress/FormProgress";

export type GatewayFormValues = {
    name: string;
    status: string;
    description: string;
};

interface Props {
    data?: GatewayResponse;
    onSubmit: (values: GatewayFormValues) => Promise<any> | void;
    loading?: boolean;
    resetOnSuccess?: boolean;
}

export default function Form({data, onSubmit, loading, resetOnSuccess}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<GatewayFormValues>({
        defaultValues: {
            name: data?.name ?? "",
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
                    <Label>نام درگاه</Label>
                    <Input {...register("name", {required: "نام درگاه الزامی است"})} />
                    {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <Label>وضعیت درگاه</Label>
                    <Select {...register("status")}>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
                    </Select>
                </div>
            </div>

            <hr className={"my-5"} />
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>توضیحات درگاه</Label>
                    <Textarea {...register("description")} />
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
