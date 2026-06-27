"use client";

import Label from "@/shared/Label/Label";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {TrustedBrandResponse} from "@/services/types/trustedBrand";
import ImageField from "@/shared/Uploader/ImageField";
import FormProgress from "@/shared/Progress/FormProgress";

export type TrustedBrandFormValues = {
    logo?: File | null;
};

interface Props {
    data?: TrustedBrandResponse;
    onSubmit: (values: TrustedBrandFormValues) => Promise<any> | void;
    loading?: boolean;
    progress?: number;
    resetOnSuccess?: boolean;
}

const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function Form({data, onSubmit, loading, progress, resetOnSuccess}: Props) {
    const {handleSubmit, control, reset} = useForm<TrustedBrandFormValues>({
        defaultValues: {
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
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>تصویر</Label>
                    <Controller
                        name="logo"
                        control={control}
                        render={({field}) => (
                            <ImageField
                                name="logo"
                                previousSrc={data?.logo ? `${base}/trusted-brand/${data.logo}` : undefined}
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
