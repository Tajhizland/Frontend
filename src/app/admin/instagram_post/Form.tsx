"use client";

import Label from "@/shared/Label/Label";
import FormActions from "@/shared/Form/FormActions";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import React from "react";
import {useForm} from "react-hook-form";
import {InstagramPostResponse} from "@/services/types/instagramPost";

export type InstagramPostFormValues = {
    caption: string;
    url: string;
    status: string;
};

interface Props {
    data?: InstagramPostResponse;
    onSubmit: (values: InstagramPostFormValues) => Promise<unknown> | void;
    loading?: boolean;
    resetOnSuccess?: boolean;
    /** محتوای اضافه‌ای که بین فیلدها و دکمه‌ی ثبت رندر می‌شود (انتخاب فایل‌ها) */
    children?: React.ReactNode;
    saveText?: string;
}

export default function Form({data, onSubmit, loading, resetOnSuccess, children, saveText}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<InstagramPostFormValues>({
        defaultValues: {
            caption: data?.caption ?? "",
            url: data?.url ?? "",
            status: data?.status != null ? String(data.status) : "1",
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
                    <Label>آدرس پست</Label>
                    <Input placeholder="my-instagram-post" {...register("url", {required: "آدرس پست الزامی است"})} />
                    <p className="text-xs text-slate-400 mt-1">
                        نشانی یکتای پست؛ لینکی که دکمه‌ی اشتراک‌گذاری کپی می‌کند از همین ساخته می‌شود.
                    </p>
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

            <hr className={"my-5"}/>

            <div>
                <Label>کپشن</Label>
                <Textarea rows={6} {...register("caption")} />
            </div>

            {children && (
                <>
                    <hr className={"my-5"}/>
                    {children}
                </>
            )}

            <hr className={"my-5"}/>
            <FormActions loading={loading} saveText={saveText}/>
        </form>
    );
}
