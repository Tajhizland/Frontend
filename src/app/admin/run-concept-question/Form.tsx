"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {useForm} from "react-hook-form";
import {useQuery} from "react-query";
import {RunConceptQuestionResponse} from "@/services/types/runConceptQuestion";
import {list} from "@/services/api/admin/runConceptQuestion";
import {getByQuestionId} from "@/services/api/admin/runConceptAnswer";
import FormProgress from "@/shared/Progress/FormProgress";

export type RunConceptQuestionFormValues = {
    question: string;
    level: string;
    status: string;
    parent_question: string;
    parent_answer: string;
};

interface Props {
    data?: RunConceptQuestionResponse;
    onSubmit: (values: RunConceptQuestionFormValues) => Promise<any> | void;
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
        watch,
        reset,
        formState: {errors},
    } = useForm<RunConceptQuestionFormValues>({
        defaultValues: {
            question: data?.question ?? "",
            level: data?.level != null ? String(data.level) : "",
            status: data?.status != null ? String(data.status) : "1",
            parent_question: data?.parent_question != null ? String(data.parent_question) : "1",
            parent_answer: data?.parent_answer != null ? String(data.parent_answer) : "1",
        },
    });

    const parentQuestion = watch("parent_question");

    const {data: answers} = useQuery({
        queryKey: [`answer-list`, Number(parentQuestion)],
        queryFn: () => getByQuestionId(Number(parentQuestion)),
        enabled: !!parentQuestion && Number(parentQuestion) > 1,
        staleTime: 5000,
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
                    <Label>لول پرسش</Label>
                    <Input {...register("level")} />
                </div>
                <div>
                    <Label>وضعیت پرسش</Label>
                    <Select {...register("status")}>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
                    </Select>
                </div>
                <div>
                    <Label>پرسش وابسته</Label>
                    <Select {...register("parent_question")}>
                        <option value={1}>ندارد</option>
                        {questionLists &&
                            questionLists.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.question}
                                </option>
                            ))}
                    </Select>
                </div>
                <div>
                    <Label>پاسخ وابسته</Label>
                    <Select {...register("parent_answer")}>
                        <option value={1}>ندارد</option>
                        {answers &&
                            answers.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.answer}
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
