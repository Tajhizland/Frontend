"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Input from "@/shared/Input/Input";
import Label from "@/components/Label/Label";
import Button from "@/shared/Button/Button";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonThird from "@/shared/Button/ButtonThird";
import Select from "@/shared/Select/Select";
import {Options} from "sucrase/dist/types/Options-gen-types";
import toast from "react-hot-toast";
import {useState} from "react";
import {set} from "immutable";

export default function page() {
     function clickHandle(){
        toast.success("محصول با موفقیت ایجاد شد" )
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "افزودن محصول جدید",
                href: "product/create"
            }
        ]}/>
        <Panel >
            <PageTitle>
               ایجاد محصول جدید
            </PageTitle>
            <div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام محصول</Label>
                    <Input/>
                </div>
                <div>
                    <Label>وضعیت محصول</Label>
                    <Select>
                        <option>
                            فعال
                        </option>
                        <option>
                            غیر فعال
                        </option>
                    </Select>
                </div>
                <div>
                    <Label>نام محصول</Label>
                    <Input/>
                </div>
                <div>
                    <Label>نام محصول</Label>
                    <Input/>
                </div>
                <div>
                    <Label>نام محصول</Label>
                    <Input/>
                </div>
                <div>
                    <Label>نام محصول</Label>
                    <Input/>
                </div>
            </div>
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary onClick={clickHandle}>
                    ذخیره
                </ButtonPrimary>
            </div>
            </div>
        </Panel>

    </>)
}
