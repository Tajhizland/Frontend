"use client"
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import Uploader from "@/shared/Uploader/Uploader";
import {NewsResponse} from "@/services/types/news";
import TinyEditor from "@/shared/Editor/TinyEditor";
import {useQuery} from "react-query";
import {getList} from "@/services/api/admin/blogCategory";

interface Form {
    data?: NewsResponse;
    submit: (e: FormData) => void;
}

export default function Form({ data, submit  }: Form) {

    const {data: categoryList} = useQuery({
        queryKey: [`news_category-list`],
        queryFn: () => getList(),
        staleTime: 5000,
    });
    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>عنوان بلاگ</Label>
                    <Input name={"title"} defaultValue={data?.title}/>
                </div>
                <div>
                    <Label>ادرس بلاگ</Label>
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
                <div>
                    <Label>وضعیت بلاگ</Label>
                    <Select name={"published"}>
                        <option value={1} selected={data?.published == 1}>
                            فعال
                        </option>
                        <option value={0} selected={data?.published == 0}>
                            غیر فعال
                        </option>
                    </Select>
                </div>
                <div>
                    <Label>دسته بندی</Label>
                    <Select name={"categoryId"}>
                        {
                            categoryList && categoryList.map((item,index)=>(<>
                                <option key={index}  value={item.id} selected={data?.category_id == item.id}>
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
                    <Label>محتوا بلاگ</Label>
                    <TinyEditor name={"content"} value={data?.content} />
                </div>

            </div>
            <div>
                <Label>تصویر بلاگ</Label>
                <Uploader  name={"image"}/>
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
