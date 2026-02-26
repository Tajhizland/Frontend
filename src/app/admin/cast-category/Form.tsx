"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useEffect, useState} from "react";
import {VlogResponse} from "@/services/types/vlog";
import {Controller, useForm} from "react-hook-form";
import {useQuery} from "react-query";
import {get} from "@/services/api/admin/castCategory";
import {CastCategoryResponse} from "@/services/types/castCategory";
import Uploader from "@/shared/Uploader/Uploader";

interface Form {
    data?: CastCategoryResponse;
    loading?: boolean;
    submit: (formData: any) => Promise<any>;
}

export default function Form({data, submit, loading = false}: Form) {
    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            name: "",
            icon: "",
            status: "1",

        },

    });

    useEffect(() => {
        if (data) {
            setValue("name", data.name);
            setValue("status", data.status.toString());
        }
    }, [data, setValue]);

    return (<>
        <form onSubmit={handleSubmit(submit)}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام </Label>
                    <Input  {...register("name")} />
                </div>
                <div>
                    <Label>وضعیت </Label>
                    <Select  {...register("status")} >
                        <option value={1}>
                            فعال
                        </option>
                        <option value={0}>
                            غیر فعال
                        </option>
                    </Select>
                </div>

                <div className={"md:col-span-2"}>
                    <Label>تصویر </Label>
                    <Controller
                        name="icon"
                        control={control}
                        render={({field, fieldState}) => (
                            <>
                                <Uploader
                                    name="image"
                                    onChange={field.onChange}
                                />
                                {fieldState.error && (
                                    <p className="text-error text-xs">{fieldState.error.message}</p>
                                )}
                            </>
                        )}
                    />
                </div>
            </div>

            <hr className={"my-5"}/>

            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"} loading={loading}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
