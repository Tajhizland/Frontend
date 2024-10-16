"use client"
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React from "react";
import Uploader from "@/shared/Uploader/Uploader";
import {NewsResponse} from "@/services/types/news";
import TinyEditor from "@/shared/Editor/TinyEditor";
import {PageResponse} from "@/services/types/page";

interface Form {
    data?: PageResponse;
    submit: (e: FormData) => void;
}

export default function Form({ data, submit  }: Form) {

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>عنوان صفحه</Label>
                    <Input name={"title"} defaultValue={data?.title}/>
                </div>
                <div>
                    <Label>ادرس صفحه</Label>
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
                <div>
                    <Label>وضعیت صفحه</Label>
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
                    <Label>محتوا صفحه</Label>
                    <TinyEditor name={"content"} value={data?.content} />
                </div>

            </div>
            <div>
                <Label>تصویر صفحه</Label>
                <Uploader  name={"image"}/>
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
