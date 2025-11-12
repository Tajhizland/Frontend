"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import Uploader from "@/shared/Uploader/Uploader";
import {BannerResponse} from "@/services/types/banner";
import Image from "next/image";
import Link from "next/link";
import {Route} from "next";
import Select from "@/shared/Select/Select";

interface Form {
    data?: BannerResponse;
    submit: (e: FormData) => void;
}

export default function Form({data, submit}: Form) {
    const types=[
        {
            title:"هوم پیج (اصلی)",
            value:"home_page"
        },
        {
            title:"هوم پیج 2",
            value:"home_page2"
        },
        {
            title:"هوم پیج 3",
            value:"home_page3"
        },
        {
            title:"هوم پیج 4",
            value:"home_page4"
        },
        {
            title:"هوم پیج 5",
            value:"home_page5"
        },
        {
            title:"هوم پیج محصولات کار کرده",
            value:"home_page6"
        },
        {
            title:"ولاگ",
            value:"vlog"
        },  {
            title:"بلاگ",
            value:"blog"
        }, {
            title:"برند",
            value:"brand"
        },  {
            title:"محصولات خاص",
            value:"special"
        }, {
            title:"تخفیفی ها",
            value:"discount"
        },
    ]
    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>آدرس </Label>
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
                <div>
                    <Label>نوع بنر </Label>
                    <Select name={"type"} >
                        {
                            types.map((item,index)=>(<option value={item.value} key={index} selected={data?.type==item.value}>
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
