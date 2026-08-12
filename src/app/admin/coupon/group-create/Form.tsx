"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Textarea from "@/shared/Textarea/Textarea";
import React, {useEffect, useMemo, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";
import {toMySqlDateTime} from "@/utils/dateFormat";
import {CouponResponse} from "@/services/types/coupon";
import {useMutation, useQuery} from "react-query";
import {getUserByType} from "@/services/api/admin/user";
import ReactSelect from "react-select";
import Select from "@/shared/Select/Select";
import {resetPasswordSendCode} from "@/services/api/auth/resetPassword";
import {generate} from "@/services/api/admin/coupon";
import Badge from "@/shared/Badge/Badge";
import Spinner from "@/shared/Loading/Spinner";
import toast from "react-hot-toast";

interface Form {
    data?: CouponResponse;
    loading?: boolean;
    submit: (formData: any) => Promise<any>;
}

export default function Form({data, submit, loading = false}: Form) {


    const types = [
        {key: "کاربرانی که سفارش داشتند", value: "has_order"},
        {key: "کاربرانی که سفارشی ثبت نکرده اند", value: "has_not_order"},
        {key: "کاربرانی که سبد خرید فعال دارن", value: "has_active_cart"},
        {key: "همه کاربران", value: "all"},
    ];





    const {register, handleSubmit, control,watch, formState: {errors}, setValue} = useForm({
        defaultValues: {
            start_time: "",
            end_time: "",
            status: "1",
            price: "",
            percent: "",
            min_order_value: "",
            max_order_value: "",
            type: "",
            message: "",
            userIds: [] as number[],
        },

    });

    // مشخص می‌کند کدام دکمه فرم را ثبت کرده تا لودینگ روی همان دکمه نمایش داده شود
    const [sendSms, setSendSms] = useState(false);

    const selectType = watch("type");
    const selectedUserIds = watch("userIds");

    const {data: users, isLoading} = useQuery({
        queryKey: [`get-all-user`, selectType],
        enabled: selectType != "",
        queryFn: () => getUserByType({type: selectType}),
    });

    const allSelected = useMemo(() => {
        if (!users || users.length === 0) return false;
        return selectedUserIds?.length === users.length;
    }, [users, selectedUserIds]);

    const handleToggleSelect = () => {
        if (!users) return;
        if (allSelected) {
            setValue("userIds", []);
        } else {
            setValue(
                "userIds",
                //@ts-ignore
                users.map((u: any) => String(u.id))
            );
        }
    };


    // withSms=false : فقط ذخیره | withSms=true : ذخیره + ارسال پیامک کد به هر کاربر
    const handleSave = (withSms: boolean) =>
        handleSubmit((formData) => {
            if (withSms) {
                const count = formData.userIds?.length || 0;
                if (count === 0) {
                    toast.error("حداقل یک کاربر را انتخاب کنید");
                    return;
                }
                if (!window.confirm(`برای ${count} کاربر کد تخفیف جداگانه ساخته و پیامک می‌شود. ادامه می‌دهید؟`))
                    return;
            }
            setSendSms(withSms);
            return submit({...formData, send_sms: withSms});
        });

    return (<>
        <form onSubmit={handleSave(false)}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
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

                <div>
                    <Label>دسته ارسال</Label>
                    <Select {...register("type", {required: "انتخاب نوع الزامی است"})}>
                        <option value="">انتخاب کنید</option>
                        {types.map((type, index) => (
                            <option value={type.value} key={index}>
                                {type.key}
                            </option>
                        ))}
                    </Select>
                    {errors.type && (
                        <p className="text-error text-xs">{errors.type.message}</p>
                    )}
                </div>

                <div className={"col-span-1 sm:col-span-2"}>
                    <Label>متن پیامک (اختیاری)</Label>
                    <Textarea
                        rows={4}
                        placeholder={"در صورت خالی بودن، متن پیش‌فرض ارسال می‌شود."}
                        {...register("message")}
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                        متغیرهای قابل استفاده : {"{name}"} نام کاربر ، {"{code}"} کد تخفیف ، {"{amount}"} مقدار تخفیف ،
                        {" "}{"{percent}"} درصد ، {"{price}"} مبلغ ، {"{end_time}"} تاریخ انقضا
                    </p>
                </div>

                {isLoading && <Spinner/>}

                {/* --- انتخاب کاربران --- */}
                {users && (
                    <div className={"col-span-1 sm:col-span-2"}>
                        <div className="flex items-center justify-between mb-2">
                            <Label>انتخاب کاربران</Label>

                            {/* 🔁 دکمه toggle */}
                            <ButtonPrimary
                                type="button"
                                onClick={handleToggleSelect}
                                sizeClass="px-4 py-1 text-sm"
                                className={`${
                                    allSelected
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                                {allSelected ? "لغو انتخاب همه" : "انتخاب همه"}
                            </ButtonPrimary>
                        </div>

                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-[400px] overflow-y-auto border p-3 rounded-lg"
                        >
                            {users?.map((user: any) => (
                                <label
                                    key={user.id}
                                    className="flex items-center gap-2 border p-2 rounded hover:bg-gray-50 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        value={user.id}
                                        {...register("userIds")}
                                        className="checkbox checkbox-primary"
                                    />
                                    <span>
                                                {user.name} - {user.username}
                                            </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>


            <hr className={"my-5"}/>
            <div className={"flex flex-wrap justify-center gap-3 my-5"}>
                <ButtonSecondary type={"submit"} loading={loading && !sendSms} disabled={loading}>
                    ذخیره
                </ButtonSecondary>
                <ButtonPrimary
                    type={"button"}
                    onClick={handleSave(true)}
                    loading={loading && sendSms}
                    disabled={loading}
                >
                    ذخیره و ارسال پیامک
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
