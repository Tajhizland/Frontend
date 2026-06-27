"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {useForm} from "react-hook-form";
import {RunConceptAnswerResponse} from "@/services/types/runConceptAnswer";
import {useQuery} from "react-query";
import {list} from "@/services/api/admin/runConceptQuestion";
import FormProgress from "@/shared/Progress/FormProgress";

export type RunConceptAnswerFormValues = {
    answer: string;
    price: string;
    status: string;
    run_concept_question_id: string;
};

interface Props {
    data?: RunConceptAnswerResponse;
    onSubmit: (values: RunConceptAnswerFormValues) => Promise<any> | void;
    loading?: boolean;
    resetOnSuccess?: boolean;
}

export default function Form({data, onSubmit, loading, resetOnSuccess}: Props) {
    const {data: questionLists} = useQuery({
        queryKey: [`question-list`],
        queryFn: () => list(),
        staleTime: 5000,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<RunConceptAnswerFormValues>({
        defaultValues: {
            answer: data?.answer ?? "",
            price: data?.price != null ? String(data.price) : "",
            status: data?.status != null ? String(data.status) : "1",
            run_concept_question_id:
                data?.run_concept_question_id != null ? String(data.run_concept_question_id) : "",
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
                    <Label>پاسخ</Label>
                    <Input {...register("answer", {required: "پاسخ الزامی است"})} />
                    {errors.answer && <p className="text-rose-500 text-xs mt-1">{errors.answer.message}</p>}
                </div>
                <div>
                    <Label>قیمت</Label>
                    <Input {...register("price")} />
                </div>
                <div>
                    <Label>وضعیت پاسخ</Label>
                    <Select {...register("status")}>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
                    </Select>
                </div>
                <div>
                    <Label>پرسش</Label>
                    <Select {...register("run_concept_question_id")}>
                        {questionLists &&
                            questionLists.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.question}
                                </option>
                            ))}
                    </Select>
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
