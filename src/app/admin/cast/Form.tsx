"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useEffect, useState} from "react";
import Uploader from "@/shared/Uploader/Uploader";
import NcImage from "@/shared/NcImage/NcImage";
import SunEditors from "@/shared/Editor/SunEditors";
import {CastResponse} from "@/services/types/cast";
import {SearchPickerItem, SearchPickerModal} from "@/shared/SearchPicker";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import {search} from "@/services/api/admin/vlog";
import {VlogResponse} from "@/services/types/vlog";
import {Controller, useForm} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {findActive} from "@/services/api/shop/address";
import {get} from "@/services/api/admin/castCategory";

interface Form {
    data?: CastResponse;
    loading?: boolean;
    submit: (formData: any) => Promise<any>;
}

export default function Form({data, submit, loading = false}: Form) {
    const [showModal, setShowModal] = useState(false);
    const [vlogId, setVlogId] = useState<Number>(data?.vlog_id ?? 0);
    const [vlog, setVlog] = useState(data?.vlog);

    const {data: categorys} = useQuery({
        queryKey: ['tajhizcast-category-get'],
        queryFn: () => get(),
        staleTime: 5000,
    });

    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            title: "",
            url: "",
            status: "1",
            vlog_id: "",
            category_id: "",
            audio: "",
            image: "",
            description: "",
        },

    });

    useEffect(() => {
        if (data) {
            setValue("title", data.title);
            setValue("url", data.url);
            setValue("category_id", data.category_id?.toString());
            setValue("status", data.status.toString());
            setValue("vlog_id", data.vlog_id.toString());
            setValue("description", data.description);
            setVlog(data?.vlog);
        }
    }, [data, setValue]);

    return (<>
        <SearchPickerModal<VlogResponse>
            open={showModal}
            onClose={() => setShowModal(false)}
            queryKey={["cast-vlog-search"]}
            placeholder="جستجوی نام ویدیو"
            closeOnPick
            searchFn={(query) => search(query)}
            itemKey={(item) => item.id}
            onPick={async (item) => {
                setVlogId(item.id);
                setValue("vlog_id", item.id.toString());
                setVlog(item);
            }}
            renderItem={(item) => <SearchPickerItem src={`vlog/${item.poster}`} title={item.title} />}
        />
        <form onSubmit={handleSubmit(submit)}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام </Label>
                    <Input  {...register("title")} />
                </div>
                <div>
                    <Label>ادرس </Label>
                    <Input {...register("url")} />
                </div>
                <div>
                    <Label>وضعیت </Label>
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
                    <Label>دسته بندی </Label>
                    <Select  {...register("category_id")} >
                        {categorys?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </div>

            </div>

            <hr className={"my-5"}/>
            <div className={"grid grid-cols-1 gap-5"}>

                <div>
                    <Label>توضیحات برند</Label>
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

            </div>
            <div>
                <Label>فایل صوتی</Label>
                <Controller
                    name="audio"
                    control={control}
                    render={({field, fieldState}) => (
                        <>
                            <Uploader
                                name="audio"
                                onChange={field.onChange}
                            />
                            {fieldState.error && (
                                <p className="text-error text-xs">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
            </div>
            {data?.audio ? <div className={"max-w-lg flex justify-center mx-auto"}>
                <div className="flex justify-center items-center">
                    <audio src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/cast/audio/${data.audio}`} controls/>
                </div>
            </div> : ""}


            <div>
                <Label>تصویر </Label>
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
            {data?.image ? <div className={"max-w-lg flex justify-center mx-auto"}>
                <div className="flex justify-center items-center">
                    <NcImage
                        alt=""
                        containerClassName="w-full h-fit flex justify-center"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/cast/image/${data.image}`}
                        className="object-contain rounded-2xl w-full h-full"
                        width={250}
                        height={250}
                    />
                </div>
            </div> : ""}

            <div className="mt-5">
                <ButtonSecondary onClick={() => {
                    setShowModal(true)
                }}>
                    انتخاب ولاگ
                </ButtonSecondary>
                {
                    vlog?.title
                }
                <Input type={"hidden"} {...register("vlog_id")} />

            </div>
            <hr className={"my-5"}/>
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"} loading={loading}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
