"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {BannerResponse} from "@/services/types/banner";
import ImageField from "@/shared/Uploader/ImageField";
import FormProgress from "@/shared/Progress/FormProgress";

export type BannerFormValues = {
    url: string;
    type: string;
    image?: File | null;
};

interface Props {
    data?: BannerResponse;
    onSubmit: (values: BannerFormValues) => Promise<any> | void;
    loading?: boolean;
    progress?: number;
    resetOnSuccess?: boolean;
}

const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const types = [
    {title: "هوم پیج تجهیزکست", value: "homepage_cast"},
    {title: "تجهیزکست", value: "cast"},
    {title: "هوم پیج (اصلی)", value: "home_page"},
    {title: "هوم پیج 2", value: "home_page2"},
    {title: "هوم پیج 3", value: "home_page3"},
    {title: "هوم پیج 4", value: "home_page4"},
    {title: "هوم پیج 5", value: "home_page5"},
    {title: "هوم پیج محصولات کار کرده", value: "home_page6"},
    {title: "ولاگ", value: "vlog"},
    {title: "بلاگ", value: "blog"},
    {title: "برند", value: "brand"},
    {title: "محصولات خاص", value: "special"},
    {title: "تخفیفی ها", value: "discount"},
];

export default function Form({data, onSubmit, loading, progress, resetOnSuccess}: Props) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<BannerFormValues>({
        defaultValues: {
            url: data?.url ?? "",
            type: data?.type ?? types[0].value,
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
                    <Label>آدرس</Label>
                    <Input {...register("url", {required: "آدرس الزامی است"})} />
                    {errors.url && <p className="text-rose-500 text-xs mt-1">{errors.url.message}</p>}
                </div>
                <div>
                    <Label>نوع بنر</Label>
                    <Select {...register("type")}>
                        {types.map((item, index) => (
                            <option value={item.value} key={index}>
                                {item.title}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            <hr className={"my-5"} />
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>تصویر</Label>
                    <Controller
                        name="image"
                        control={control}
                        render={({field}) => (
                            <ImageField
                                name="image"
                                previousSrc={data?.image ? `${base}/banner/${data.image}` : undefined}
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
