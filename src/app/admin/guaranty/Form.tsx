"use client"
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React from "react";
import {GuarantyResponse} from "@/services/types/guaranty";
import Uploader from "@/shared/Uploader/Uploader";

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
                    <Textarea name={"description"} defaultValue={data?.description}/>
                </div>

            </div>
            <hr className={"my-5"}/>
            <div className={"grid grid-cols-1 gap-5"}>

                <div>
                    <Label>آیکن</Label>
                    <Uploader name={"icon"}  />
                </div>

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
