"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {OptionResponse} from "@/services/types/option";
import {useQuery} from "react-query";
import {categoryList} from "@/services/api/admin/category";

interface Form {
    data?: OptionResponse;
    submit: (e: FormData) => void;
}

export default function Form({ data, submit  }: Form) {
    const { data: categoryLists } = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });
    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام ویژگی</Label>
                    <Input name={"name"} defaultValue={data?.title}/>
                </div>
                <div>
                    <Label>دسته بندی  </Label>
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
                    <Label>وضعیت ویژگی</Label>
                    <Select name={"status"}>
                        <option value={1} selected={data?.status == 1}>
                            فعال
                        </option>
                        <option value={0} selected={data?.status == 0}>
                            غیر فعال
                        </option>
                    </Select>
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
