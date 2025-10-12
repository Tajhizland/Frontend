"use client"
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useEffect} from "react";
import Label from "@/shared/Label/Label";
import {useForm} from "react-hook-form";
import {PhoneBockResponse} from "@/services/types/phoneBock";

interface FormProps {
    data?: PhoneBockResponse;
    submit: (formData: any) => Promise<any>;
}

export default function Form({data, submit}: FormProps) {

    const {register, handleSubmit, setValue} = useForm({
        defaultValues: {
            name: "",
            mobile: "",
        },
    });

    useEffect(() => {
        if (data) {
            setValue("name", data.name);
            setValue("mobile", data.mobile);

        }
    }, [data, setValue]);


    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <Label> نام (اختیاری) </Label>
                    <Input
                        {...register("name")}
                    />
                </div>
                <div>
                    <Label>شماره</Label>*
                    <Input
                        {...register("mobile", {required: "انتخاب مقدار دسترسی الزامیست"})}
                    />
                </div>
            </div>

            <hr className="my-5"/>
            <div className="flex justify-center my-5">
                <ButtonPrimary type="submit">ذخیره</ButtonPrimary>
            </div>
        </form>
    );
}
