"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {useForm} from "react-hook-form";
import {OptionResponse} from "@/services/types/option";
import {useQuery} from "react-query";
import {categoryList} from "@/services/api/admin/category";
import FormProgress from "@/shared/Progress/FormProgress";

export type OptionFormValues = {
    title: string;
    category_id: string;
    status: string;
};

interface Props {
    data?: OptionResponse;
    onSubmit: (values: OptionFormValues) => Promise<any> | void;
    loading?: boolean;
    resetOnSuccess?: boolean;
}

export default function Form({data, onSubmit, loading, resetOnSuccess}: Props) {
    const {data: categoryLists} = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<OptionFormValues>({
        defaultValues: {
            title: data?.title ?? "",
            category_id: data?.category_id != null ? String(data.category_id) : "",
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
                    <Label>نام ویژگی</Label>
                    <Input {...register("title", {required: "نام ویژگی الزامی است"})} />
                    {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <Label>دسته بندی</Label>
                    <Select {...register("category_id")}>
                        {categoryLists?.data.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Label>وضعیت ویژگی</Label>
                    <Select {...register("status")}>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
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
