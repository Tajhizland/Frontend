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
import TinyEditor from "@/shared/Editor/TinyEditor";
import Uploader from "@/shared/Uploader/Uploader";

interface productForm {
    data?: ProductResponse;
    submit: (e: FormData) => void;
    setColorCount: (e: number) => void;
    colorCount: number
}

export default function Form({ data, submit, setColorCount, colorCount }: productForm) {

    const handleAddForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setColorCount(colorCount + 1);
    };
    const { data: categoryLists } = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });
    const { data: brandLists } = useQuery({
        queryKey: [`brand-list`],
        queryFn: () => brandList(),
        staleTime: 5000,
    });


    return (<>

        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
            <Input type="hidden" name={"id"} value={data?.id} />

                <div>
                    <Label>نام محصول</Label>
                    <Input name={"name"} defaultValue={data?.name} />
                </div>
                <div>
                    <Label>وضعیت محصول</Label>
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
                    <Label>ادرس محصول</Label>
                    <Input name={"url"} defaultValue={data?.url} />
                </div>
                <div>
                    <Label>دسته بندی محصول</Label>
                    <Select name={"category_id"}>
                        {
                            categoryLists?.data.map((item) => (<>
                                <option value={item.id} selected={item.id==data?.category_id}>
                                    {item.name}
                                </option>
                            </>))
                        }

                    </Select>
                </div>
                <div>
                    <Label>برند محصول</Label>
                    <Select name={"brand_id"}>
                        {
                            brandLists?.data.map((item) => (<>
                                <option value={item.id}>
                                    {item.name}
                                </option>
                            </>))
                        }
                    </Select>
                </div>
            </div>

            <hr className={"my-5"} />
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>بررسی اجمالی</Label>
                    <TinyEditor name={"study"} value={data?.study} />

                </div>
                <div>
                    <Label>توضیحات محصول</Label>
                    <TinyEditor name={"description"} value={data?.description} />
                </div>
                <div>
                    <Label>عنوان سئو</Label>
                    <Textarea name={"seo_title"} defaultValue={data?.meta_title} />
                </div>
                <div>
                    <Label>توضیحات سئو</Label>
                    <TinyEditor name={"description"} value={data?.meta_description} />

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
