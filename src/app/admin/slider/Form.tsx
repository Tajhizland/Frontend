"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import Uploader from "@/shared/Uploader/Uploader";
import {SliderResponse} from "@/services/types/slider";
import Image from "next/image";

interface Form {
    data?: SliderResponse;
    submit: (e: FormData) => void;
}

export default function Form({ data, submit  }: Form) {

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>عنوان اسلاید</Label>
                    <Input name={"title"} defaultValue={data?.title}/>
                </div>
                <div>
                    <Label>آدرس  </Label>
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
                <div>
                    <Label>وضعیت سرویس</Label>
                    <Select name={"status"}>
                        <option value={1} selected={data?.status == 1}>
                            فعال
                        </option>
                        <option value={0} selected={data?.status == 0}>
                            غیر فعال
                        </option>
                    </Select>
                </div>
                <div>
                    <Label>نمایش برای</Label>
                    <Select name={"type"}>
                        <option value={"desktop"} selected={data?.type == "desktop"}>
                           دسکتاپ
                        </option>
                        <option value={"mobile"} selected={data?.type == "mobile"}>
                           موبایل
                        </option>
                    </Select>
                </div>
            </div>
            <hr className={"my-5"}/>
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>تصویر</Label>
                    <Uploader  name={"image"} />
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
                </div>:""}
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
