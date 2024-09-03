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

export default   function Form({submit}:{submit: (e:FormData) => void}) {
    const [formCount, setFormCount] = useState(1); // ابتدا با یک فرم شروع می‌کنیم

    const handleAddForm = () => {
        setFormCount((prevCount) => prevCount + 1); // افزایش تعداد فرم‌ها
    };
    const { data:categoryLists } = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });
    const { data:brandLists } = useQuery({
        queryKey: [`brand-list`],
        queryFn: () => brandList(),
        staleTime: 5000,
    });

    return (<>
        <form action={submit}>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
            <div>
                <Label>نام محصول</Label>
                <Input name={"name"}/>
            </div>
            <div>
                <Label>وضعیت محصول</Label>
                <Select name={"status"}>
                    <option value={1}>
                        فعال
                    </option>
                    <option value={0}>
                        غیر فعال
                    </option>
                </Select>
            </div>
            <div>
                <Label>ادرس محصول</Label>
                <Input name={"url"}/>
            </div>
            <div>
                <Label>دسته بندی محصول</Label>
                <Select name={"category_id"}>
                    {
                        categoryLists?.data.map((item) => (<>
                            <option value={item.id}>
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

        <hr className={"my-5"}/>
        <div className={"grid grid-cols-1 gap-5"}>
            <div>
                <Label>بررسی اجمالی</Label>
                <Textarea name={"study"}/>
            </div>
            <div>
                <Label>توضیحات محصول</Label>
                <Textarea name={"description"}/>
            </div>
            <div>
                <Label>عنوان سئو</Label>
                <Textarea name={"study"}/>
            </div>
            <div>
                <Label>توضیحات سئو</Label>
                <Textarea name={"description"}/>
            </div>

        </div>
        <hr className={"my-5"}/>
            <div className={"flex-col flex gap-y-10 "}>
                <ButtonPrimary className={"w-48"} onClick={handleAddForm}>
                    افزودن رنگ جدید
                </ButtonPrimary>

                {Array.from({length: formCount}).map((_, index) => (
                    <>
                        <FormComponent key={index} index={index}/>
                        <hr className={"my-5"}/>
                    </>
                ))}
            </div>
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
