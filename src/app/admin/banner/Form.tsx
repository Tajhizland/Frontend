"use client"
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import Uploader from "@/shared/Uploader/Uploader";
import {BannerResponse} from "@/services/types/banner";
import Image from "next/image";
import Link from "next/link";
import {Route} from "next";

interface Form {
    data?: BannerResponse;
    submit: (e: FormData) => void;
}

export default function Form({data, submit}: Form) {

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>آدرس </Label>
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
            </div>

            <hr className={"my-5"}/>
            <div className={"grid grid-cols-1 gap-5"}>

                <div>
                    <Label>تصویر</Label>
                    <Uploader name={"image"}/>
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
                <ButtonPrimary type={"submit"}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
