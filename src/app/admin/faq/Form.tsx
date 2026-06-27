"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React from "react";
import {useForm} from "react-hook-form";
import {FaqResponse} from "@/services/types/faq";
import FormProgress from "@/shared/Progress/FormProgress";

export type FaqFormValues = {
    question: string;
    answer: string;
    status: string;
};

interface Props {
    data?: FaqResponse;
    onSubmit: (values: FaqFormValues) => Promise<any> | void;
    loading?: boolean;
    resetOnSuccess?: boolean;
}

export default function Form({data, onSubmit, loading, resetOnSuccess}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FaqFormValues>({
        defaultValues: {
            question: data?.question ?? "",
            answer: data?.answer ?? "",
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
                    <Label>پرسش</Label>
                    <Input {...register("question", {required: "پرسش الزامی است"})} />
                    {errors.question && <p className="text-rose-500 text-xs mt-1">{errors.question.message}</p>}
                </div>
                <div>
                    <Label>وضعیت پرسش</Label>
                    <Select {...register("status")}>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
                    </Select>
                </div>
            </div>

            <hr className={"my-5"} />
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>پاسخ</Label>
                    <Textarea {...register("answer", {required: "پاسخ الزامی است"})} />
                    {errors.answer && <p className="text-rose-500 text-xs mt-1">{errors.answer.message}</p>}
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
