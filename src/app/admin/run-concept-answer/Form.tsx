"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {RunConceptAnswerResponse} from "@/services/types/runConceptAnswer";

interface Form {
    data?: RunConceptAnswerResponse;
    submit: (e: FormData) => void;
}

export default function Form({data, submit}: Form) {
    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label> پاسخ</Label>
                    <Input name={"answer"} defaultValue={data?.answer}/>
                </div>
                <div>
                    <Label>قیمت</Label>
                    <Input name={"price"} defaultValue={data?.price}/>
                </div>
                <div>
                    <Label>وضعیت پاسخ</Label>
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
                    <Label>پرسش </Label>
                    <Select name={"run_concept_question_id"}>
                        <option value={1} selected={data?.run_concept_question_id == 1}>
                            فعال
                        </option>
                        <option value={0} selected={data?.run_concept_question_id == 0}>
                            غیر فعال
                        </option>
                    </Select>
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
