"use client"
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import Uploader from "@/shared/Uploader/Uploader";
import TinyEditor from "@/shared/Editor/TinyEditor";
import {VlogResponse} from "@/services/types/vlog";
import {useQuery} from "react-query";
import {findById, getList} from "@/services/api/admin/vlogCategory";
import NcImage from "@/shared/NcImage/NcImage";

interface Form {
    data?: VlogResponse;
    submit: (e: FormData) => void;
}

export default function Form({ data, submit  }: Form) {

    const {data: categoryList} = useQuery({
        queryKey: [`vlog_category-list`],
        queryFn: () => getList(),
        staleTime: 5000,
    });

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>عنوان ولاگ</Label>
                    <Input name={"title"} defaultValue={data?.title}/>
                </div>
                <div>
                    <Label>ادرس ولاگ</Label>
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
                <div>
                    <Label>وضعیت ولاگ</Label>
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
                    <Label>دسته ولاگ</Label>
                    <Select name={"categoryId"}>
                        {
                            categoryList && categoryList.map((item,index)=>(<>
                                <option key={index}  value={item.id} selected={data?.status == 1}>
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
                    <Label>توضیحات ولاگ</Label>
                    <TinyEditor name={"description"} value={data?.description} />
                </div>

            <div>
                <Label>ویدیو  </Label>
                <Uploader  name={"video"}/>
            </div>
            <div>
                <Label>پوستر  </Label>
                <Uploader  name={"poster"}/>
            </div>
            {data?.poster ? <div className={"max-w-lg flex justify-center"}>

                    <NcImage
                        containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data.poster}`}
                        className="object-cover w-full h-full drop-shadow-xl"
                        fill
                        alt="vlog"
                    />
            </div> :""}

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
