"use client";

import Label from "@/shared/Label/Label";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {PosterResponse} from "@/services/types/poster";
import ImageField from "@/shared/Uploader/ImageField";
import FormProgress from "@/shared/Progress/FormProgress";

export type PosterFormValues = {
    image?: File | null;
};

interface Props {
    data?: PosterResponse;
    onSubmit: (values: PosterFormValues) => Promise<any> | void;
    loading?: boolean;
    progress?: number;
    resetOnSuccess?: boolean;
}

const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function Form({data, onSubmit, loading, progress, resetOnSuccess}: Props) {
    const {
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<PosterFormValues>({
        defaultValues: {
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
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>تصویر</Label>
                    <Controller
                        name="image"
                        control={control}
                        rules={data?.image ? undefined : {required: "تصویر الزامی است"}}
                        render={({field}) => (
                            <ImageField
                                name="image"
                                previousSrc={data?.image ? `${base}/poster/${data.image}` : undefined}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                    {errors.image && <p className="text-rose-500 text-xs mt-1">{errors.image.message}</p>}
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
