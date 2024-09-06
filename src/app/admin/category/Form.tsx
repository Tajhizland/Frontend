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

interface productForm {
    productData?: ProductResponse;
    submit: (e: FormData) => void;
    setColorCount: (e: number) => void;
    colorCount: number
}

export default function Form({ productData, submit, setColorCount, colorCount }: productForm) {
    const [formCount, setFormCount] = useState(1);  

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

    console.log("PROD", productData?.name);

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام دسته‌بندی</Label>
                    <Input name={"name"} defaultValue={productData?.name} />
                </div>
                <div>
                    <Label>وضعیت دسته‌بندی</Label>
                    <Select name={"status"}>
                        <option value={1} selected={productData?.status == "1"}>
                            فعال
                        </option>
                        <option value={0} selected={productData?.status == "0"}>
                            غیر فعال
                        </option>
                    </Select>
                </div>
                <div>
                    <Label>ادرس دسته‌بندی</Label>
                    <Input name={"url"} defaultValue={productData?.url} />
                </div>
                <div>
                    <Label>والد</Label>
                    <Select name={"category_id"}>
                        {
                            categoryLists?.data.map((item) => (<>
                                <option value={item.id} >
                                    {item.name}
                                </option>
                            </>))
                        }

                    </Select>
                </div>
               
            </div>
 
            <div className={"grid grid-cols-1 gap-5 mt-5"}>
                <div>
                    <Label>بررسی اجمالی</Label>
                    <Textarea name={"study"} defaultValue={productData?.study} />
                </div>
                <div>
                    <Label>تصویر دسته‌بندی</Label>
                    <Uploader />
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
