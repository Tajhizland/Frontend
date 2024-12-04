"use client"
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React, { useState } from "react";
import { categoryList } from "@/services/api/admin/category"
import { useQuery } from "react-query";
import { brandList } from "@/services/api/admin/brand";
import FormComponent from "@/components/Form/Product/ColorForm";
import { ProductResponse } from "@/services/types/product";
import Uploader from "@/shared/Uploader/Uploader";
import {CategoryResponse} from "@/services/types/category";
import TinyEditor from "@/shared/Editor/TinyEditor";

interface productForm {
    data?: CategoryResponse;
    submit: (e: FormData) => void;
}

export default function Form({ data, submit}: productForm) {

    const { data: categoryLists } = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });


    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام دسته‌بندی</Label>
                    <Input name={"name"} defaultValue={data?.name} />
                </div>
                <div>
                    <Label>وضعیت دسته‌بندی</Label>
                    <Select name={"status"}>
                        <option value={1} selected={data?.status == "1"}>
                            فعال
                        </option>
                        <option value={0} selected={data?.status == "0"}>
                            غیر فعال
                        </option>
                    </Select>
                </div>
                <div>
                    <Label>ادرس دسته‌بندی</Label>
                    <Input name={"url"} defaultValue={data?.url} />
                </div>
                <div>
                    <Label>والد</Label>
                    <Select name={"parent_id"}>
                        <option value={0}>
                            بدون والد
                        </option>
                        {
                            categoryLists?.data.map((item) => (<>
                                <option value={item.id} selected={item.id==data?.parent_id} >
                                    {item.name}
                                </option>
                            </>))
                        }

                    </Select>
                </div>

            </div>

            <div className={"grid grid-cols-1 gap-5 mt-5"}>
                <div>
                    <Label>توضیحات</Label>
                    <TinyEditor name={"description"} value={data?.description} />
                </div>
                <div>
                    <Label>تصویر دسته‌بندی</Label>
                    <Uploader  name={"image"} />
                </div>
            </div>

            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
