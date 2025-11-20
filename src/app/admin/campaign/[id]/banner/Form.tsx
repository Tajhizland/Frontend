"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useEffect} from "react";
import Uploader from "@/shared/Uploader/Uploader";
import Image from "next/image";
import Select from "@/shared/Select/Select";
import {CampaignBannerResponse} from "@/services/types/campaignBanner";
import {Controller, useForm} from "react-hook-form";

interface Form {
    data?: CampaignBannerResponse;
    isLoading: boolean;
    submit: (formData: any) => Promise<any>;
}

export default function Form({data, submit, isLoading}: Form) {
    const types = [
        {
            title: "هوم پیج (اصلی)",
            value: "home_page"
        },
        {
            title: "هوم پیج 2",
            value: "home_page2"
        },

    ]

    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            url: "",
            type: "",
            image: "",
        },

    });

    useEffect(() => {
        if (data) {
            setValue("url", data.url);
            setValue("type", data.type);
        }
    }, [data, setValue]);


    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>آدرس </Label>
                    <Input {...register("url")}/>
                </div>
                <div>
                    <Label>نوع بنر </Label>
                    <Select  {...register("type")} >
                        {
                            types.map((item, index) => (<option value={item.value} key={index}>
                                {item.title}
                            </option>))
                        }
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
                {data?.image ? <div className={"container max-w-lg"}>
                        <div
                            className={`relative w-full aspect-w-16 aspect-h-11 lg:aspect-h-9  rounded-2xl overflow-hidden group border`}
                        >
                            <Image
                                alt=""
                                fill
                                className="w-full h-full object-cover"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banner/${data.image}`}
                            />
                        </div>
                    </div>
                    : ""}

            </div>
            <hr className={"my-5"}/>
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary loading={isLoading} type={"submit"}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
