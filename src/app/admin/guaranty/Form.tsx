"use client"
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React from "react";
import {GuarantyResponse} from "@/services/types/guaranty";
import Uploader from "@/shared/Uploader/Uploader";
import TinyEditor from "@/shared/Editor/TinyEditor";
import NcImage from "@/shared/NcImage/NcImage";
import SunEditors from "@/shared/Editor/SunEditors";

interface Form {
    data?: GuarantyResponse;
    submit: (e: FormData) => void;
}

export default function Form({ data, submit  }: Form) {

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام</Label>
                    <Input name={"name"} defaultValue={data?.name}/>
                </div>

                <div>
                    <Label>آدرس</Label>
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
                <div>
                    <Label>رایگان</Label>
                    <Select name={"free"}>
                        <option value={1} selected={data?.status == 1}>
                           بله
                        </option>
                        <option value={0} selected={data?.status == 0}>
                            خیر
                        </option>
                    </Select>
                </div>

                <div>
                    <Label>وضعیت  </Label>
                    <Select name={"status"}>
                        <option value={1} selected={data?.status == 1}>
                            فعال
                        </option>
                        <option value={0} selected={data?.status == 0}>
                            غیر فعال
                        </option>
                    </Select>
                </div>

            </div>

            <hr className={"my-5"}/>
            <div className={"grid grid-cols-1 gap-5"}>

                <div>
                    <Label>توضیحات</Label>
                    <SunEditors name={"description"} value={data?.description} />
                </div>

            </div>
            <hr className={"my-5"}/>
            <div className={"grid grid-cols-1 gap-5"}>

                <div>
                    <Label>آیکن</Label>
                    <Uploader name={"icon"}  />
                </div>
                {data?.icon?<div className={"flex justify-center items-center"}>
                    <div
                        className={"w-32"}
                    ><NcImage
                        containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/guaranty/${data?.icon}`}
                        className="object-cover w-full h-full drop-shadow-xl"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        alt="guaranty"
                    /></div>
                </div>:""
                }
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
