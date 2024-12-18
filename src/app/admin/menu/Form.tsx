"use client"
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import React from "react";
import Uploader from "@/shared/Uploader/Uploader";
import {BrandResponse} from "@/services/types/brand";
import TinyEditor from "@/shared/Editor/TinyEditor";
import {MenuResponse} from "@/services/types/menu";
import {useQuery} from "react-query";
import {findById} from "@/services/api/admin/faq";
import {deleteBanner, menuList} from "@/services/api/admin/menu";
import Image from "next/image";
import MenuCard from "@/components/MenuCard/MenuCard";
import {TrashIcon} from "@heroicons/react/24/solid";
import {toast} from "react-hot-toast";

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
                    <Label>عنوان بنر</Label>
                    <Input name={"banner_title"} defaultValue={data?.banner_title}/>
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
                        <MenuCard color="bg-orange-100" featuredImage={data.banner_logo}
                                  name={data.banner_title as string} url={data.banner_link}/>
                        <span>
                                    <TrashIcon className={"w-8 h-8 text-red-500"}
                                               onClick={() => deleteBannerHandle()}/>
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
