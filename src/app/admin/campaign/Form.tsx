"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useEffect, useState} from "react";
import Uploader from "@/shared/Uploader/Uploader";
import NcImage from "@/shared/NcImage/NcImage";
import {Controller, useForm} from "react-hook-form";
import {CampaignResponse} from "@/services/types/campaign";
import PersianDatePicker from "@/shared/DatePicker/PersianDatePicker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";
import {toMySqlDateTime} from "@/utils/dateFormat";

interface Form {
    data?: CampaignResponse;
    loading?: boolean;
    submit: (formData: any) => Promise<any>;
}

export default function Form({data, submit, loading = false}: Form) {
    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            title: "",
            color: "#000",
            status: "1",
            start_date: "",
            end_date: "",
            banner: "",
            logo: "",
        },

    });

    useEffect(() => {
        if (data) {
            setValue("title", data.title);
            setValue("color", data.color);
            setValue("status", data.status.toString());
            setValue("start_date", data.start_date);
            setValue("end_date", data.end_date);
            setValue("banner", data.banner);
            setValue("logo", data.logo);
        }
    }, [data, setValue]);

    return (<>
        <form onSubmit={handleSubmit(submit)}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام </Label>
                    <Input  {...register("title")} />
                </div>
                <div>
                    <Label>رنگ </Label>
                    <Input type={"color"} {...register("color")} />
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
                    <Label>زمان شروع</Label>
                    <Controller
                        control={control}
                        name="start_date"
                        render={({field: {onChange, value, name}, fieldState: {error}}) => (
                            <div>
                                <DatePicker
                                    inputClass={"block w-full border-neutral-200 focus:border-rose-600 focus:ring-0 focus:ring-rose-600 focus:ring-opacity-50 bg-white disabled:bg-neutral-200  h-11 px-4 py-3 text-sm font-normal rounded-2xl"}
                                    className="custom-date-picker flex-shrink-0 w-full"
                                    calendar={persian}        // تقویم شمسی (Jalali)
                                    locale={persian_fa}      // متن/اعداد فارسی
                                    value={data?.start_date_fa || ""}
                                    format="YYYY/MM/DD HH:mm" // فرمت نمایش در input
                                    onChange={(d) => {
                                        if (!d?.isValid) return onChange("");

                                        const mysqlFormatted = toMySqlDateTime(d);
                                        onChange(mysqlFormatted); // مقدار درست برای بک‌اند
                                    }}
                                    plugins={[<TimePicker key={0} position="bottom" hideSeconds/>]}
                                />
                            </div>
                        )}
                    />
                </div>
                <div>
                    <Label>زمان پایان</Label>

                    <Controller
                        control={control}
                        name="end_date"
                        render={({field: {onChange, value, name}, fieldState: {error}}) => (
                            <div>
                                <DatePicker
                                    inputClass={"block w-full border-neutral-200 focus:border-rose-600 focus:ring-0 focus:ring-rose-600 focus:ring-opacity-50 bg-white disabled:bg-neutral-200  h-11 px-4 py-3 text-sm font-normal rounded-2xl"}
                                    className="custom-date-picker flex-shrink-0 w-full"
                                    calendar={persian}        // تقویم شمسی (Jalali)
                                    locale={persian_fa}      // متن/اعداد فارسی
                                    value={data?.end_date_fa || ""}
                                    format="YYYY/MM/DD HH:mm" // فرمت نمایش در input
                                    onChange={(d) => {
                                        if (!d?.isValid) return onChange("");

                                        const mysqlFormatted = toMySqlDateTime(d);
                                        onChange(mysqlFormatted); // مقدار درست برای بک‌اند
                                    }}
                                    plugins={[<TimePicker key={0} position="bottom" hideSeconds/>]}
                                />
                             </div>
                        )}
                    />
                </div>
            </div>

            <div>
                <Label> لوگو</Label>
                <Controller
                    name="logo"
                    control={control}
                    render={({field, fieldState}) => (
                        <>
                            <Uploader
                                name="logo"
                                onChange={field.onChange}
                            />
                            {fieldState.error && (
                                <p className="text-error text-xs">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
            </div>
            {data?.logo ? <div className={"max-w-lg flex justify-center mx-auto"}>
                <div className="flex justify-center items-center">
                    <NcImage
                        alt=""
                        containerClassName="w-full h-fit flex justify-center"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/campaign/${data.logo}`}
                        className="object-contain rounded-2xl w-full h-full"
                        width={250}
                        height={250}
                    />
                </div>
            </div> : ""}


            <div>
                <Label>بنر </Label>
                <Controller
                    name="banner"
                    control={control}
                    render={({field, fieldState}) => (
                        <>
                            <Uploader
                                name="banner"
                                onChange={field.onChange}
                            />
                            {fieldState.error && (
                                <p className="text-error text-xs">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
            </div>
            {data?.banner ? <div className={"max-w-lg flex justify-center mx-auto"}>
                <div className="flex justify-center items-center">
                    <NcImage
                        alt=""
                        containerClassName="w-full h-fit flex justify-center"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/campaign/${data.banner}`}
                        className="object-contain rounded-2xl w-full h-full"
                        width={250}
                        height={250}
                    />
                </div>
            </div> : ""}

            <hr className={"my-5"}/>
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"} loading={loading}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
