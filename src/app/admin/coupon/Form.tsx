"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";
import {toMySqlDateTime} from "@/utils/dateFormat";
import {DiscountResponse} from "@/services/types/discount";
import {CouponResponse} from "@/services/types/coupon";

interface Form {
    data?: CouponResponse;
    loading?: boolean;
    submit: (formData: any) => Promise<any>;
}

export default function Form({data, submit, loading = false}: Form) {
    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            code: "",
            start_time: "",
            end_time: "",
            status: "1",
            price: "",
            percent: "",
            min_order_value: "",
            max_order_value: "",
            user_id: "",
        },

    });

    useEffect(() => {
        if (data) {
            setValue("code", data.code);
            setValue("start_time", data.start_time);
            setValue("end_time", data.end_time);
            setValue("status", data.status.toString());
            setValue("price", data.price.toString());
            setValue("percent", data.percent.toString());
            setValue("min_order_value", data.min_order_value.toString());
            setValue("max_order_value", data.max_order_value.toString());
            setValue("user_id", data.user_id.toString());

        }
    }, [data, setValue]);

    return (<>
        <form onSubmit={handleSubmit(submit)}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام </Label>
                    <Input  {...register("code")} />
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
                    <Label>قیمت </Label>
                    <Input  {...register("price")} />
                </div>
                <div>
                    <Label>درصد </Label>
                    <Input  {...register("percent")} />
                </div>
                <div>
                    <Label>حداقل قیمت خرید برای تخفیف </Label>
                    <Input  {...register("min_order_value")} />
                </div>
                <div>
                    <Label>حداکثر قیمت خرید برای تخفیف </Label>
                    <Input  {...register("max_order_value")} />
                </div>
                <div>
                    <Label>کاربر </Label>
                    <Select  {...register("user_id")} >
                        <option value={""}>
                            همه
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
                        name="start_time"
                        render={({field: {onChange, value, name}, fieldState: {error}}) => (
                            <div>
                                <DatePicker
                                    inputClass={"block w-full border-neutral-200 focus:border-rose-600 focus:ring-0 focus:ring-rose-600 focus:ring-opacity-50 bg-white disabled:bg-neutral-200  h-11 px-4 py-3 text-sm font-normal rounded-2xl"}
                                    className="custom-date-picker flex-shrink-0 w-full"
                                    calendar={persian}        // تقویم شمسی (Jalali)
                                    locale={persian_fa}      // متن/اعداد فارسی
                                    value={data?.start_time_fa || ""}
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
                        name="end_time"
                        render={({field: {onChange, value, name}, fieldState: {error}}) => (
                            <div>
                                <DatePicker
                                    inputClass={"block w-full border-neutral-200 focus:border-rose-600 focus:ring-0 focus:ring-rose-600 focus:ring-opacity-50 bg-white disabled:bg-neutral-200  h-11 px-4 py-3 text-sm font-normal rounded-2xl"}
                                    className="custom-date-picker flex-shrink-0 w-full"
                                    calendar={persian}        // تقویم شمسی (Jalali)
                                    locale={persian_fa}      // متن/اعداد فارسی
                                    value={data?.end_time_fa || ""}
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


            <hr className={"my-5"}/>
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"} loading={loading}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
