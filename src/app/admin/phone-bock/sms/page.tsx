"use client";

import Label from "@/shared/Label/Label";
import {useForm} from "react-hook-form";
import Link from "next/link";
import Textarea from "@/shared/Textarea/Textarea";
import "suneditor/dist/css/suneditor.min.css";
import {useMutation, useQuery} from "react-query";
import {smsSendToContact} from "@/services/api/admin/sms";
import toast from "react-hot-toast";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import {getPhoneBockList} from "@/services/api/admin/phoneBock";
import {redirect} from "next/navigation";
import Spinner from "@/shared/Loading/Spinner";

export default function Page() {


    const mutation = useMutation({
        mutationKey: [`send-sms-to-contact`],
        mutationFn: async (formData: any) => smsSendToContact(formData),
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
        formState: {errors},
    } = useForm({
        defaultValues: {
            message: "",
            mobiles: [] as string[],
        },
    });

    const {data: users , isLoading} = useQuery({
        queryKey: [`get-phone-bock`],
        queryFn: () => getPhoneBockList(),
    });


    const onSubmit = async (formData: any) => {
        // فقط زمانی که نوع انتخاب "custom" است، userIds را ارسال کن
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

                        {
                            isLoading && <Spinner />
                        }

                        {/* --- انتخاب کاربران --- */}
                        {users && (
                            <div>
                                <Label>انتخاب مخاطبین</Label>
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-[400px] overflow-y-auto border p-3 rounded-lg">
                                    {users?.map((user: any) => (
                                        <label
                                            key={user.id}
                                            className="flex items-center gap-2 border p-2 rounded hover:bg-gray-50 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                value={user.mobile}
                                                {...register("mobiles")}
                                                className="checkbox checkbox-primary"
                                            />
                                            <span>{user.mobile} - {user.name}</span>
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
