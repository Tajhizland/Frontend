"use client"
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React, {useState} from "react";
import {categoryList} from "@/services/api/admin/category"
import {useQuery} from "react-query";
import {brandList} from "@/services/api/admin/brand";
import FormComponent from "@/components/Form/Product/ColorForm";
import {ProductResponse} from "@/services/types/product";
import TinyEditor from "@/shared/Editor/TinyEditor";
import Uploader from "@/shared/Uploader/Uploader";
import {guarantyLists} from "@/services/api/admin/guaranty";
import MultiSelect from "@/shared/Select/MultiSelect";

interface productForm {
    data?: ProductResponse;
    submit: (e: FormData) => void;
    setColorCount: (e: number) => void;
    colorCount: number
}

type optionType = {
    value: number ;
    label: string;
};
export default function Form({data, submit, setColorCount, colorCount}: productForm) {


    const handleAddForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setColorCount(colorCount + 1);
    };
    const {data: categoryLists} = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });
    const {data: brandLists} = useQuery({
        queryKey: [`brand-list`],
        queryFn: () => brandList(),
        staleTime: 5000,

    });
    const {data: guarantyList} = useQuery({
        queryKey: [`guaranty-list`],
        queryFn: () => guarantyLists(),
        staleTime: 5000,
    });
    const options = categoryLists?.data.map((item) => ({
        value: item.id,
        label: item.name,
    }));


    const guarantyOptions: optionType[] = [
        ...(guarantyList?.map((item) => ({
            value: item.id,
            label: item.name,
        })) || []),
    ];

    const defaultValue = options?.filter((option) => data?.category_ids.includes(option.value));
    const guarantyDefaultValue = guarantyOptions?.filter((option) => data?.category_ids.includes(option.value));

    return (<>

        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <Input type="hidden" name={"id"} value={data?.id}/>

                <div>
                    <Label>نام محصول</Label>
                    <Input name={"name"} defaultValue={data?.name}/>
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
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
                <div>
                    <Label>دسته بندی محصول</Label>

                    {options &&
                        <MultiSelect name={"category_id"} options={options} defaultValue={defaultValue}/>}

                </div>
                <div>
                    <Label>گارانتی</Label>
                    {guarantyOptions &&
                        <MultiSelect name={"guaranty_id"} options={guarantyOptions} defaultValue={guarantyDefaultValue}/>}

                </div>
                <div>
                    <Label>مدت زمان گارانتی</Label>
                    <Input name={"guaranty_time"} defaultValue={data?.guaranty_time}/>
                </div>
                <div>
                    <Label>برند محصول</Label>
                    <Select name={"brand_id"}>
                        <option value={undefined} selected={data?.guaranty_id == null}>
                            بدون برند
                        </option>
                        {
                            brandLists?.data.map((item) => (<>
                                <option value={item.id} selected={item.id == data?.brand_id}>
                                    {item.name}
                                </option>
                            </>))
                        }
                    </Select>
                </div>
            </div>

            <hr className={"my-5"}/>
            <div className={"grid grid-cols-1 gap-5 z-0 relative"}>

                <div>
                    <Label>توضیحات محصول</Label>
                    <TinyEditor name={"description"} value={data?.description}/>
                </div>
                <div>
                    <Label>عنوان سئو</Label>
                    <Textarea name={"seo_title"} defaultValue={data?.meta_title}/>
                </div>
                <div>
                    <Label>توضیحات سئو</Label>
                    <Textarea name={"description"}>{data?.meta_description}</Textarea>

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
