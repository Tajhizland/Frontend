"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import { VlogCategoryResponse } from "@/services/types/vlogCategory";

interface Form {
    data?: VlogCategoryResponse;
    submit: (e: FormData) => void;
}

export default function Form({ data, submit }: Form) {

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام دسته بندی ولاگ</Label>
                    <Input name={"name"} defaultValue={data?.name} />
                </div>

                <div>
                    <Label>وضعیت دسته بندی ولاگ</Label>
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
                    <Label>نام دسته بندی ولاگ</Label>
                    <Input name={"url"} defaultValue={data?.url} />
                </div>


            </div>
            <hr className={"my-5"} />
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
