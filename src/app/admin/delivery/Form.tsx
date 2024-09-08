"use client"
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React from "react";
import {DeliveryResponse} from "@/services/types/delivery";
import Uploader from "@/shared/Uploader/Uploader";

interface Form {
    data?: DeliveryResponse;
    submit: (e: FormData) => void;
}

export default function Form({ data, submit  }: Form) {

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام سرویس</Label>
                    <Input name={"name"} defaultValue={data?.name}/>
                </div>
                <div>
                    <Label>هزینه سرویس</Label>
                    <Input name={"price"} defaultValue={data?.price}/>

                </div>
                <div>
                    <Label>وضعیت سرویس</Label>
                    <Select name={"published"}>
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
                    <Label>توضیحات سرویس</Label>
                    <Textarea name={"description"} defaultValue={data?.description}/>
                </div>
                <div>
                    <Label>لوگو سرویس</Label>
                    <Uploader />
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
