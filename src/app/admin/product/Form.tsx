"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React, {useEffect, useMemo} from "react";
import {categoryList} from "@/services/api/admin/category"
import {useQuery} from "react-query";
import {brandList} from "@/services/api/admin/brand";
import {ProductResponse} from "@/services/types/product";
import TinyEditor from "@/shared/Editor/TinyEditor";
import {guarantyLists} from "@/services/api/admin/guaranty";
import MultiSelect from "@/shared/Select/MultiSelect";
import SunEditors from "@/shared/Editor/SunEditors";
import {Controller, useForm} from "react-hook-form";

interface productForm {
    data?: ProductResponse;
    submit: (formData: any) => Promise<any>;
    setColorCount: (e: number) => void;
    colorCount: number
}

type optionType = {
    value: number;
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


    const renderCategoryDefaultValue = () => {
        if (options)
            return options?.filter((option) => data?.category_ids.includes(option.value))
        return [];
    }
    const renderGuarantyDefaultValue = () => {
        if (guarantyOptions)
            return guarantyOptions?.filter((option) => data?.guaranty_ids.includes(option.value))
        return []
    }
    const categoryDefaultValue = useMemo(() => renderCategoryDefaultValue(), [data]);
    const guarantyDefaultValue = useMemo(() => renderGuarantyDefaultValue(), [data]);

    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            name: "",
            status: "1",
            type: "product",
            url: "",
            categoryId: "",
            guaranty_id: "",
            guaranty_time: "",
            brand_id: "",
            description: "",
            review: "",
            meta_title: "",
            meta_description: "",
            is_stock:0
        },
    });

    useEffect(() => {
        if (data) {
            setValue("name", data.name);
            setValue("status", data.status?.toString());
            setValue("type", data.type);
            setValue("url", data.url);
            setValue("categoryId", JSON.stringify(categoryDefaultValue?.map(opt => opt.value) ?? []));
            setValue("guaranty_id", JSON.stringify(guarantyDefaultValue?.map(opt => opt.value) ?? []));
            setValue("guaranty_time", data.guaranty_time?.toString());
            setValue("brand_id", data.brand_id?.toString());
            setValue("description", data.description);
            setValue("review", data.review);
            setValue("meta_title", data.meta_title);
            setValue("is_stock", data.is_stock);
            setValue("meta_description", data.meta_description);
        }
    }, [data, setValue]);
    return (<>

        <form onSubmit={handleSubmit(submit)}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <Input type="hidden" name={"id"} value={data?.id}/>

                <div>
                    <Label>نام محصول</Label>
                    <Input {...register("name")} />
                </div>
                <div>
                    <Label>وضعیت محصول</Label>
                    <Select {...register("status")}>
                        <option value={1}>
                            فعال
                        </option>
                        <option value={0}>
                            غیر فعال
                        </option>
                    </Select>
                </div>
                <div>
                    <Label>نوع محصول</Label>
                    <Select {...register("type")} >
                        <option value={"product"}>
                            محصول عادی
                        </option>
                        <option value={"group"}>
                            محصول گروهی
                        </option>
                    </Select>
                </div>
                <div>
                    <Label>کالای دست دوم </Label>
                    <Select {...register("is_stock")} >
                        <option value={1}>
                            بله
                        </option>
                        <option value={0}>
                            خیر
                        </option>
                    </Select>
                </div>
                <div>
                    <Label>ادرس محصول</Label>
                    <Input  {...register("url")} />
                </div>
                <div>
                    <Label>دسته بندی محصول</Label>

                    {options && categoryDefaultValue &&
                        <MultiSelect
                            inputProps={register("categoryId")}
                            name={"categoryId"} options={options}
                            defaultValue={categoryDefaultValue}
                        />
                    }

                </div>
                <div>
                    <Label>گارانتی</Label>
                    {guarantyOptions && guarantyDefaultValue != undefined &&
                        <MultiSelect
                            inputProps={register("guaranty_id")}
                            name={"guaranty_id"} options={guarantyOptions}
                            defaultValue={guarantyDefaultValue}/>}

                </div>
                <div>
                    <Label>مدت زمان گارانتی</Label>
                    <Input  {...register("guaranty_time")}  />
                </div>
                <div>
                    <Label>برند محصول</Label>
                    <Select  {...register("brand_id")}  >
                        <option value={""}>
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
                    <Controller
                        name="description"
                        control={control}
                        render={({field}) => (
                            <SunEditors
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    {/*<TinyEditor name={"description"} value={data?.description}/>*/}
                </div>
                <div>
                    <Label>بررسی تخصصی</Label>
                    <Controller
                        name="review"
                        control={control}
                        render={({field}) => (
                            <SunEditors
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />

                </div>
                <div>
                    <Label>عنوان سئو</Label>
                    <Textarea  {...register("meta_title")}  />
                </div>
                <div>
                    <Label>توضیحات سئو</Label>
                    <Textarea  {...register("meta_description")}  />
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
