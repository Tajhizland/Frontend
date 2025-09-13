"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {DictionaryResponse} from "@/services/types/dictionary";

interface Form {
    data?: DictionaryResponse;
    submit: (e: FormData) => void;
}

export default function Form({ data, submit  }: Form) {

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>کلمه اصلی</Label>
                    <Input name={"original_word"} defaultValue={data?.original_word}/>
                </div>
                <div>
                    <Label>معنی</Label>
                    <Input name={"mean"} defaultValue={data?.mean}/>
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
