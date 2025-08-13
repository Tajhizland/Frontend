"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useEffect} from "react";
import {categoryList, deleteImage} from "@/services/api/admin/category"
import {useQuery, useQueryClient} from "react-query";
import Uploader from "@/shared/Uploader/Uploader";
import {CategoryResponse} from "@/services/types/category";
import {TrashIcon} from "@heroicons/react/24/solid";
import {toast} from "react-hot-toast";
import Image from "next/image";
import SunEditors from "@/shared/Editor/SunEditors";
import {Controller, useForm} from "react-hook-form";

interface productForm {
    data?: CategoryResponse;
    submit: (formData: any) => Promise<any>;
}

export default function Form({data, submit}: productForm) {
    const queryClient = useQueryClient();

    const {data: categoryLists} = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });

    async function deleteImageHandle() {
        if (!data)
            return;
        let response = await deleteImage(data?.id)
        if (response?.success) {
            toast.success(response.message as string);
            queryClient.invalidateQueries([`category-info`, Number(data?.id)]);
        }
    }

    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            name: "",
            type: "listing",
            status: "1",
            url: "",
            parent_id: "0",
            description: "",
            image: "",
        },
    });


    useEffect(() => {
        if (data) {
            setValue("name", data.name);
            setValue("type", data.type);
            setValue("status", data.status);
            setValue("url", data.url);
            setValue("parent_id", data.parent_id.toString());
            setValue("description", data.description);
        }
    }, [data, setValue]);
    return (<>
        <form onSubmit={handleSubmit(submit)}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام دسته‌بندی</Label>
                    <Input {...register("name")} />
                </div>
                <div>
                    <Label>نوع نمایش دسته‌بندی</Label>
                    <Select {...register("type")} >
                        <option value={"listing"}>
                            لیست محصولات
                        </option>
                        <option value={"landing"}>
                            لندینگ
                        </option>
                    </Select>
                </div>
                <div>
                    <Label>وضعیت دسته‌بندی</Label>
                    <Select  {...register("status")} >
                        <option value={1}>
                            فعال
                        </option>
                        <option value={0}>
                            غیر فعال
                        </option>
                    </Select>
                </div>
                <div>
                    <Label>ادرس دسته‌بندی</Label>
                    <Input {...register("url")} />
                </div>
                <div>
                    <Label>والد</Label>
                    <Select  {...register("parent_id")} >
                        <option value={"0"}>
                            بدون والد
                        </option>
                        {
                            categoryLists?.data.map((item) => (<>
                                <option value={item.id} selected={item.id == data?.parent_id}>
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
                </div>
                <div>
                    <Label>تصویر دسته‌بندی</Label>
                    <Controller
                        name="image"
                        control={control}
                        render={({field, fieldState}) => (
                            <>
                                <Uploader
                                    name="image"
                                    onChange={field.onChange}
                                />
                                {fieldState.error && (
                                    <p className="text-error text-xs">{fieldState.error.message}</p>
                                )}
                            </>
                        )}
                    />
                </div>
                {data?.image && <div className="flex items-center justify-center flex-col  ">
                    <div className="w-[100px] h-[100px]">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${data.image}`}
                            alt={"image"} width={100} height={100}/>
                    </div>
                    <span>
                            <TrashIcon className={"w-8 h-8 text-red-500 cursor-pointer"}
                                       onClick={() => deleteImageHandle()}/>
                        </span>
                </div>}
            </div>

            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
