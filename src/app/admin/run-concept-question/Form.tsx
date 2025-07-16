"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import Uploader from "@/shared/Uploader/Uploader";
import {NewsResponse} from "@/services/types/news";
import TinyEditor from "@/shared/Editor/TinyEditor";
import {useMutation, useQuery} from "react-query";
import {getList} from "@/services/api/admin/blogCategory";
import SunEditors from "@/shared/Editor/SunEditors";
import {RunConceptQuestionResponse} from "@/services/types/runConceptQuestion";
import {categoryList} from "@/services/api/admin/category";
import {list} from "@/services/api/admin/runConceptQuestion";
import {getCity} from "@/services/api/shop/city";
import {getByQuestionId} from "@/services/api/admin/runConceptAnswer";

interface Form {
    data?: RunConceptQuestionResponse;
    submit: (e: FormData) => void;
}

export default function Form({data, submit}: Form) {

    const {data: questionLists} = useQuery({
        queryKey: [`question-list`],
        queryFn: () => list(),
        staleTime: 5000,
    });

    const {
        data: answers,
        mutateAsync: changeQuestion,
    } = useMutation({
        mutationKey: [`answer-list`],
        mutationFn: (id: number) =>
            getByQuestionId(id),
    });

    return (<>
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label> پرسش</Label>
                    <Input name={"question"} defaultValue={data?.question}/>
                </div>
                <div>
                    <Label>لول پرسش</Label>
                    <Input name={"level"} defaultValue={data?.level}/>
                </div>
                <div>
                    <Label>وضعیت پرسش</Label>
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
                    <Label>پرسش وابسته</Label>
                    <Select name={"parent_question"}>
                        <option value={1} selected={data?.parent_question == null}>
                            ندارد
                        </option>
                        {
                            questionLists && questionLists.map((item) => (<option key={item.id} value={item.id}>
                                {item.question}
                            </option>))
                        }
                    </Select>
                </div>
                <div>
                    <Label>پاسخ وابسته</Label>
                    <Select name={"parent_answer"}>
                        <option value={1} selected={data?.parent_question == null}>
                            ندارد
                        </option>
                        answers && answers.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.answer}
                        </option>
                        ))
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
