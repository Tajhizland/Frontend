"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React from "react";
import Uploader from "@/shared/Uploader/Uploader";
import {BrandResponse} from "@/services/types/brand";
import TinyEditor from "@/shared/Editor/TinyEditor";
import NcImage from "@/shared/NcImage/NcImage";
import SunEditors from "@/shared/Editor/SunEditors";

interface Form {
    data?: BrandResponse;
    submit: (e: FormData) => void;
}

export default function Form({ data, submit  }: Form) {

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام برند</Label>
                    <Input name={"name"} defaultValue={data?.name}/>
                </div>
                <div>
                    <Label>ادرس برند</Label>
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
                <div>
                    <Label>وضعیت برند</Label>
                    <Select name={"status"}>
                        <option value={1} selected={data?.status == "1"}>
                            فعال
                        </option>
                        <option value={0} selected={data?.status == "0"}>
                            غیر فعال
                        </option>
                    </Select>
                </div>

            </div>

            <hr className={"my-5"}/>
            <div className={"grid grid-cols-1 gap-5"}>

                <div>
                    <Label>توضیحات برند</Label>
                    <SunEditors name={"description"} value={data?.description} />

                </div>

            </div>
            <div>
                <Label>تصویر بنر</Label>
                <Uploader name={"banner"}/>
            </div>
            {data?.banner ? <div className={"max-w-lg flex justify-center mx-auto"}>
                <div className="flex justify-center items-center">
                    <NcImage
                        alt=""
                        containerClassName="w-full h-fit flex justify-center"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand-banner/${data.banner}`}
                        className="object-contain rounded-2xl w-full h-full"
                        width={720}
                        height={720}
                    />
                </div>
            </div> : ""}
            <div>
                <Label>تصویر برند</Label>
                <Uploader name={"image"}/>
            </div>
            {data?.image ? <div className={"max-w-lg flex justify-center mx-auto"}>
                <div className="flex justify-center items-center">
                    <NcImage
                        alt=""
                        containerClassName="w-full h-fit flex justify-center"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand/${data.image}`}
                        className="object-contain rounded-2xl w-full h-full"
                        width={720}
                        height={720}
                    />
                </div>
            </div> : ""}
            <hr className={"my-5"}/>
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
