"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useEffect} from "react";
import Uploader from "@/shared/Uploader/Uploader";
import {SliderResponse} from "@/services/types/slider";
import Image from "next/image";
import {Controller, useForm} from "react-hook-form";

interface Form {
    data?: SliderResponse;
    isLoading:boolean;
    submit: (formData: any) => Promise<any>;
}

export default function Form({data, submit ,isLoading}: Form) {

    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            title: "",
            url: "",
            status: 1,
            type: "desktop",
            image: "",
        },

    });


    useEffect(() => {
        if (data) {
            setValue("title", data.title);
            setValue("url", data.url);
            setValue("status", data.status);
            setValue("type", data.type);
        }
    }, [data, setValue]);


    return (<>
        <form onSubmit={handleSubmit(submit)}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>عنوان اسلاید</Label>
                    <Input {...register("title")} />
                </div>
                <div>
                    <Label>آدرس </Label>
                    <Input {...register("url")} />
                </div>
                <div>
                    <Label>وضعیت سرویس</Label>
                    <Select {...register("status")}  >
                        <option value={1}>
                            فعال
                        </option>
                        <option value={0}>
                            غیر فعال
                        </option>
                    </Select>
                </div>
                <div>
                    <Label>نمایش برای</Label>
                    <Select {...register("type")} >
                        <option value={"desktop"}>
                            دسکتاپ
                        </option>
                        <option value={"mobile"}>
                            موبایل
                        </option>
                    </Select>
                </div>
            </div>
            <hr className={"my-5"}/>
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>تصویر</Label>
                    <Controller
                        name="image"
                        control={control}
                        render={({field, fieldState}) => (
                            <>
                                <Uploader
                                    name="image"
                                    onChange={field.onChange}
                                />
                            </>
                        )}
                    />
                </div>
                {data?.image ? <div>
                    <div
                        className={`mt-0  nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden w-full  aspect-w-16 aspect-h-7 md:aspect-h-4  `}
                    >
                        <div className=" w-full h-full">
                            <Image
                                fill
                                className="w-full h-full object-cover"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/slider/${data?.image}`}
                                alt={`show`}
                                priority
                            />

                        </div>
                    </div>
                </div> : ""}
            </div>
            <hr className={"my-5"}/>
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"} loading={isLoading}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
