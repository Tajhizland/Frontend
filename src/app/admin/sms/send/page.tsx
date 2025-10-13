"use client";

import Label from "@/shared/Label/Label";
import {useForm} from "react-hook-form";
import Link from "next/link";
import Textarea from "@/shared/Textarea/Textarea";
import "suneditor/dist/css/suneditor.min.css";
import {useMutation, useQuery} from "react-query";
import {smsSend} from "@/services/api/admin/sms";
import toast from "react-hot-toast";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import {getUserByType} from "@/services/api/admin/user";
import {redirect} from "next/navigation";
import Spinner from "@/shared/Loading/Spinner";
import {useMemo} from "react";

export default function Page() {
    const types = [
        {key: "کاربرانی که سفارش داشتند", value: "has_order"},
        {key: "کاربرانی که سفارشی ثبت نکرده اند", value: "has_not_order"},
        {key: "کاربرانی که سبد خرید فعال دارن", value: "has_active_cart"},
        {key: "همه کاربران", value: "all"},
    ];

    const mutation = useMutation({
        mutationKey: [`send-sms`],
        mutationFn: async (formData: any) => smsSend(formData),
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message as string);
                mutation.reset();
                redirect("/admin/sms");
            }
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
    } = useForm({
        defaultValues: {
            type: "",
            message: "",
            userIds: [] as number[],
        },
    });

    const selectType = watch("type");
    const selectedUserIds = watch("userIds");

    const {data: users, isLoading} = useQuery({
        queryKey: [`get-all-user`, selectType],
        enabled: selectType != "",
        queryFn: () => getUserByType({type: selectType}),
    });

    // ✅ بررسی آیا همه انتخاب شده‌اند یا نه
    const allSelected = useMemo(() => {
        if (!users || users.length === 0) return false;
        return selectedUserIds?.length === users.length;
    }, [users, selectedUserIds]);

    // 🔁 toggle بین انتخاب همه و لغو انتخاب همه
    const handleToggleSelect = () => {
        if (!users) return;
        if (allSelected) {
            setValue("userIds", []);
        } else {
            setValue(
                "userIds",
                users.map((u: any) => String(u.id)) // باید string باشه چون input checkbox value رشته‌ست
            );
        }
    };

    const onSubmit = async (formData: any) => {
        if (formData.type === "custom" && (!formData.userIds || formData.userIds.length === 0)) {
            toast.error("حداقل یک کاربر را انتخاب کنید");
            return;
        }

        await mutation.mutateAsync(formData);
    };

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "پیامک ها", href: "sms"},
                    {title: "ارسال پیامک", href: "sms/send"},
                ]}
            />

            <Panel>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-x-5 gap-y-10">
                        {/* --- متن پیامک --- */}
                        <div>
                            <Label>متن پیامک</Label>
                            <Textarea
                                disabled={mutation.isLoading}
                                {...register("message", {required: "متن پیامک الزامی است"})}
                            />
                            {errors.message && (
                                <p className="text-error text-xs">{errors.message.message}</p>
                            )}
                        </div>

                        {/* --- نوع ارسال --- */}
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

                        {isLoading && <Spinner />}

                        {/* --- انتخاب کاربران --- */}
                        {users && (
                            <div>
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

                    {/* --- دکمه‌ها --- */}
                    <div className="flex gap-5 mt-14">
                        <Link href={"/admin/sms"}>
                            <ButtonPrimary type="button">بازگشت</ButtonPrimary>
                        </Link>
                        <ButtonPrimary loading={mutation.isLoading}>ارسال</ButtonPrimary>
                    </div>
                </form>
            </Panel>
        </>
    );
}
