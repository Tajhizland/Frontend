"use client"
import Label from "@/shared/Label/Label";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import Uploader from "@/shared/Uploader/Uploader";
import Image from "next/image";
import {TrustedBrandResponse} from "@/services/types/trustedBrand";

interface Form {
    data?: TrustedBrandResponse;
    submit: (e: FormData) => void;
}

export default function Form({data, submit}: Form) {

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>تصویر</Label>
                    <Uploader name={"logo"}/>
                </div>
                {data?.logo ? <div className={"container max-w-lg"}>
                        <div
                            className={`relative w-full aspect-w-16 aspect-h-11 lg:aspect-h-9  rounded-2xl overflow-hidden group border`}
                        >
                            <Image
                                alt=""
                                fill
                                className="w-full h-full object-cover"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/trusted-brand/${data.logo}`}
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
