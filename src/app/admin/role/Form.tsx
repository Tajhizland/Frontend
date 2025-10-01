"use client"
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useEffect} from "react";
import {useQuery} from "react-query";
import Label from "@/shared/Label/Label";
import {RoleResponse} from "@/services/types/role";
import {list} from "@/services/api/admin/permission";
import {useForm} from "react-hook-form";

interface FormProps {
    data?: RoleResponse;
    submit: (formData: any) => Promise<any>;
}

export default function Form({data, submit}: FormProps) {
    const {data: permissionList} = useQuery({
        queryKey: [`permission-list`],
        queryFn: () => list(),
        staleTime: 5000,
    });

    const {register, handleSubmit, setValue, watch} = useForm({
        defaultValues: {
            name: "",
            permissions: [] as number[], // آرایه پرمیشن‌ها
        },
    });

    // وقتی دیتا اومد مقدار اولیه ست کن
    useEffect(() => {
        if (data) {
            setValue("name", data.name);
            setValue(
                "permissions",
                data.permissions?.map((p: any) => p.id) || []
            );
        }
    }, [data, setValue]);

    // برای مشاهده لحظه‌ای (مثلاً Debug)
    const selectedPermissions = watch("permissions");

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <Label>نام نقش </Label>
                    <Input
                        {...register("name", {required: "انتخاب نام نقش الزامیست"})}
                    />
                </div>
            </div>

            <hr className="my-5" />

            {/* لیست چک‌باکس‌ها */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-5">
                {permissionList?.map((perm: any) => (
                    <label key={perm.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            value={perm.id}
                            {...register("permissions")}
                            defaultChecked={data?.permissions?.some(
                                (p: any) => p.id === perm.id
                            )}
                        />
                        {perm.name}
                    </label>
                ))}
            </div>

            <div className="flex justify-center my-5">
                <ButtonPrimary type="submit">ذخیره</ButtonPrimary>
            </div>
        </form>
    );
}
