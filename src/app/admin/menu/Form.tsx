"use client"
 import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import Uploader from "@/shared/Uploader/Uploader";
import {MenuResponse} from "@/services/types/menu";
import {useQuery} from "react-query";
import {deleteBanner, menuList} from "@/services/api/admin/menu";
import {TrashIcon} from "@heroicons/react/24/solid";
import {toast} from "react-hot-toast";
import {categoryList} from "@/services/api/admin/category";
import Label from "@/shared/Label/Label";
import MenuCard from "@/components/Card/MenuCard";

interface Form {
    data?: MenuResponse;
    submit: (e: FormData) => void;
}

export default function Form({data, submit}: Form) {

    const {data: list} = useQuery({
        queryKey: [`menu-list`],
        queryFn: () => menuList(),
        staleTime: 5000,
    });
    const {data: categoryLists} = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });
    const deleteBannerHandle = async () => {
        if (data?.id) {
            let response = await deleteBanner(data.id)
            if (response?.success) {
                toast.success(response?.message as string);
                window.location.reload()
            }
        }
    }
    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>عنوان منو</Label>
                    <Input name={"title"} defaultValue={data?.title}/>
                </div>
                <div>
                    <Label>ادرس منو</Label>
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
                <div>
                    <Label>وضعیت منو</Label>
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
                    <Label>والد</Label>
                    <Select name={"parent_id"}>
                        <option value={0} selected={data?.parent_id == 0}>
                            بدون والد
                        </option>
                        {
                            list && list.map((item, index) => (
                                <option key={index} value={item.id} selected={data?.parent_id == item.id}>
                                    {item.title}
                                </option>))
                        }
                    </Select>
                </div>
                <div>
                    <Label>دسته بندی</Label>
                    <Select name={"category_id"}>
                        <option value={0}>
                            بدون دسته بندی
                        </option>
                        {
                            categoryLists?.data.map((item) => (<>
                                <option value={item.id} selected={item.id == data?.category_id}>
                                    {item.name}
                                </option>
                            </>))
                        }

                    </Select>
                </div>
                <div>
                    <Label>آدرس بنر</Label>
                    <Input name={"banner_link"} defaultValue={data?.banner_link}/>
                </div>
                <div>
                    <Label>تصویر بنر</Label>
                    <Uploader name={"banner_logo"}/>
                </div>
                <div className={'flex items-center'}>
                    {data?.banner_logo && <div className="w-[30%] xl:w-[35%] flex items-center justify-center flex-col">
                        <MenuCard color="bg-orange-100" featuredImage={data.banner_logo}  url={data.banner_link}/>
                        <span>
                            <TrashIcon className={"w-8 h-8 text-red-500"} onClick={() => deleteBannerHandle()}/>
                        </span>
                    </div>}
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
