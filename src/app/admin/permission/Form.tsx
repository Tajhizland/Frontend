"use client"
import Input from "@/shared/Input/Input";
import FormActions from "@/shared/Form/FormActions";
import React, {useEffect} from "react";
import Label from "@/shared/Label/Label";
import {useForm} from "react-hook-form";
import {PermissionResponse} from "@/services/types/permission";

interface FormProps {
    data?: PermissionResponse;
    submit: (formData: any) => Promise<any>;
}

export default function Form({data, submit}: FormProps) {

    const {register, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: "",
            value: "",
        },
    });

    // وقتی دیتا اومد مقدار اولیه ست کن
    useEffect(() => {
        if (data) {
            setValue("name", data.name);
            setValue("value", data.value);

        }
    }, [data, setValue]);


    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <Label>نام دسترسی </Label>
                    <Input
                        {...register("name", {required: "انتخاب نام دسترسی الزامیست"})}
                    />
                </div>
                <div>
                    <Label>آدرس دسترسی </Label>
                    <Input
                        {...register("value", {required: "انتخاب مقدار دسترسی الزامیست"})}
                    />
                </div>
            </div>

            <hr className="my-5" />
            <FormActions />
        </form>
    );
}
