"use client"
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {categoryList, deleteImage} from "@/services/api/admin/category"
import {useQuery} from "react-query";
import Uploader from "@/shared/Uploader/Uploader";
import {CategoryResponse} from "@/services/types/category";
import TinyEditor from "@/shared/Editor/TinyEditor";
import MenuCard from "@/components/MenuCard/MenuCard";
import {TrashIcon} from "@heroicons/react/24/solid";
import {toast} from "react-hot-toast";
import Image from "next/image";

interface productForm {
    data?: CategoryResponse;
    submit: (e: FormData) => void;
}

export default function Form({data, submit}: productForm) {

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
        }
    }

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام دسته‌بندی</Label>
                    <Input name={"name"} defaultValue={data?.name}/>
                </div>
                <div>
                    <Label>نوع نمایش دسته‌بندی</Label>
                    <Select name={"type"}>
                        <option value={"listing"} selected={data?.type == "listing"}>
                            لیست محصولات
                        </option>
                        <option value={"landing"} selected={data?.type == "landing"}>
                           لندینگ
                        </option>
                    </Select>
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
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
                <div>
                    <Label>والد</Label>
                    <Select name={"parent_id"}>
                        <option value={0}>
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
                    <TinyEditor name={"description"} value={data?.description}/>
                </div>
                <div>
                    <Label>تصویر دسته‌بندی</Label>
                    <Uploader name={"image"}/>
                </div>
                     {data?.image && <div className="flex items-center justify-center flex-col  ">
                        <div className="w-[100px] h-[100px]">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${data.image}`}
                                alt={"image"} width={100} height={100}/>
                        </div>
                        <span>
                            <TrashIcon className={"w-8 h-8 text-red-500 cursor-pointer"} onClick={() => deleteImageHandle()}/>
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
