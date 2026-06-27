"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {useForm, useWatch} from "react-hook-form";
import {DictionaryResponse} from "@/services/types/dictionary";
import FormProgress from "@/shared/Progress/FormProgress";

export type DictionaryFormValues = {
    original_word: string;
    mean: string;
};

interface Props {
    data?: DictionaryResponse;
    onSubmit: (values: DictionaryFormValues) => Promise<any> | void;
    loading?: boolean;
    resetOnSuccess?: boolean;
}

export default function Form({data, onSubmit, loading, resetOnSuccess}: Props) {
    const isEdit = !!data;

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<DictionaryFormValues>({
        defaultValues: {
            original_word: data?.original_word ?? "",
            mean: data?.mean ?? "",
        },
    });

    const watchedWord = useWatch({control, name: "original_word"}) ?? "";
    const previewWords = isEdit
        ? []
        : watchedWord
              .split(",")
              .map((w) => w.trim())
              .filter((w) => w.length > 0);

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
                    <Label>کلمات اصلی {isEdit ? "" : "(با , جدا کن)"}</Label>
                    <Input
                        {...register("original_word", {required: "کلمه اصلی الزامی است"})}
                        placeholder={isEdit ? "کلمه اصلی" : "مثلاً: اسپرسو, اسپر سو, اسسپرسوو"}
                    />
                    {errors.original_word && (
                        <p className="text-rose-500 text-xs mt-1">{errors.original_word.message}</p>
                    )}
                    {!isEdit && previewWords.length > 0 && (
                        <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                            {previewWords.map((word, index) => (
                                <li key={index}>{word}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <Label>معنی</Label>
                    <Input {...register("mean", {required: "معنی الزامی است"})} />
                    {errors.mean && <p className="text-rose-500 text-xs mt-1">{errors.mean.message}</p>}
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
