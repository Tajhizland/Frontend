"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {useForm} from "react-hook-form";
import {UserResponse} from "@/services/types/user";
import {useQuery} from "react-query";
import {list} from "@/services/api/admin/role";
import FormProgress from "@/shared/Progress/FormProgress";

export type UserFormValues = {
    name: string;
    last_name: string;
    national_code: string;
    username: string;
    email: string;
    gender: string;
    role: string;
    role_id: string;
};

interface Props {
    data?: UserResponse;
    onSubmit: (values: UserFormValues) => Promise<any> | void;
    loading?: boolean;
    resetOnSuccess?: boolean;
}

export default function Form({data, onSubmit, loading, resetOnSuccess}: Props) {
    const {data: roles} = useQuery({
        queryKey: ["all-role"],
        queryFn: () => list(),
        staleTime: 5000,
    });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm<UserFormValues>({
        defaultValues: {
            name: data?.name ?? "",
            last_name: data?.last_name ?? "",
            national_code: data?.national_code ?? "",
            username: data?.username ?? "",
            email: data?.email ?? "",
            gender: data?.gender != null ? String(data.gender) : "1",
            role: data?.role ?? "user",
            role_id: "",
        },
    });

    const role = watch("role");

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
                    <Label>نام کاربر</Label>
                    <Input {...register("name", {required: "نام کاربر الزامی است"})} />
                    {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <Label>نام خانوادگی</Label>
                    <Input className="mt-1.5" {...register("last_name")} />
                </div>
                <div>
                    <Label>کد ملی</Label>
                    <Input className="mt-1.5" {...register("national_code")} />
                </div>
                <div>
                    <Label>نام کاربری</Label>
                    <Input {...register("username")} />
                </div>
                <div>
                    <Label>جنسیت</Label>
                    <Select {...register("gender")}>
                        <option value={1}>مرد</option>
                        <option value={0}>زن</option>
                    </Select>
                </div>
                <div>
                    <Label>ایمیل</Label>
                    <Input {...register("email")} />
                </div>
                <div>
                    <Label>نقش کاربر</Label>
                    <Select {...register("role")}>
                        <option value={"user"}>کاربر</option>
                        <option value={"admin"}>مدیر</option>
                    </Select>
                </div>

                {role == "admin" && (
                    <div>
                        <Label>سطح دسترسی</Label>
                        <Select {...register("role_id")}>
                            {roles?.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                )}
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
