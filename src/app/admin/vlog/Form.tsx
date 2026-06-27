"use client";

import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {VlogResponse} from "@/services/types/vlog";
import {useQuery} from "react-query";
import {getList} from "@/services/api/admin/vlogCategory";
import SunEditors from "@/shared/Editor/SunEditors";
import SimpleUploader from "@/shared/Uploader/SimpleUploader";
import ImageField from "@/shared/Uploader/ImageField";

export type VlogFormValues = {
    title: string;
    url: string;
    status: string;
    categoryId: string;
    description: string;
    poster?: File | null;
    video?: File | null;
};

interface Props {
    data?: VlogResponse;
    onSubmit: (values: VlogFormValues) => Promise<any> | void;
    loading?: boolean;
    resetOnSuccess?: boolean;
}

const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function Form({data, onSubmit, loading, resetOnSuccess}: Props) {
    const {data: categoryList} = useQuery({
        queryKey: [`vlog_category-list`],
        queryFn: () => getList(),
        staleTime: 5000,
    });

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<VlogFormValues>({
        defaultValues: {
            title: data?.title ?? "",
            url: data?.url ?? "",
            status: data?.status != null ? String(data.status) : "1",
            categoryId: data?.categoryId != null ? String(data.categoryId) : "",
            description: data?.description ?? "",
            poster: null,
            video: null,
        },
    });

    return (
        <form
            onSubmit={handleSubmit(async (values) => {
                try {
                    await onSubmit(values);
                    if (resetOnSuccess) reset();
                } catch {
                    /* خطا توسط interceptor نمایش داده می‌شود */
                }
            })}
        >
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>عنوان ولاگ</Label>
                    <Input {...register("title", {required: "عنوان ولاگ الزامی است"})} />
                    {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <Label>ادرس ولاگ</Label>
                    <Input {...register("url")} />
                </div>
                <div>
                    <Label>وضعیت ولاگ</Label>
                    <Select {...register("status")}>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
                    </Select>
                </div>
                <div>
                    <Label>دسته ولاگ</Label>
                    <Select {...register("categoryId")}>
                        {categoryList &&
                            categoryList.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                    </Select>
                </div>
            </div>

            <hr className={"my-5"} />
            <div className={"grid grid-cols-1 gap-5"}>
                <div>
                    <Label>توضیحات ولاگ</Label>
                    <Controller
                        name="description"
                        control={control}
                        render={({field}) => (
                            <SunEditors
                                name="description"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </div>

                <div>
                    <Label>ویدیو</Label>
                    <Controller
                        name="video"
                        control={control}
                        render={({field}) => (
                            <SimpleUploader
                                name="video"
                                accept="video/*"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    field.onChange(e.target.files?.[0] ?? null)
                                }
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                    {data?.video && (
                        <p className="text-xs text-emerald-700 mt-1">ویدیوی فعلی بارگذاری شده است</p>
                    )}
                </div>

                <div>
                    <Label>پوستر</Label>
                    <Controller
                        name="poster"
                        control={control}
                        render={({field}) => (
                            <ImageField
                                name="poster"
                                previousSrc={data?.poster ? `${base}/vlog/${data.poster}` : undefined}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </div>
            </div>

            <hr className={"my-5"} />
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"} loading={loading} disabled={loading}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    );
}
