"use client"

import Label from "@/shared/Label/Label";
import {useForm} from "react-hook-form";
import Link from "next/link";
import Textarea from "@/shared/Textarea/Textarea";
import 'suneditor/dist/css/suneditor.min.css';
import {useMutation} from "react-query";
import {smsSend} from "@/services/api/admin/sms";
import toast from "react-hot-toast";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";

export default function Page() {
    const types = [
        {
            key: "کاربرانی که سفارش داشتند",
            value: "has_order"
        },
        {
            key: "کاربرانی که سفارشی ثبت نکرده اند",
            value: "has_not_order"
        },
        {
            key: "کاربرانی که سبد خرید فعال دارن",
            value: "has_active_cart"
        },
    ]
    const mutation = useMutation({
        mutationKey: [`send-sms`],
        mutationFn: async (formData: any) => {
            return smsSend({
                ...formData,
            });
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message as string);
                mutation.reset();
            }
        },
    });

    const {register, handleSubmit, control, formState: {errors}, setValue, reset} = useForm({
        defaultValues: {
            type: "",
            message: "",
        },
    });


    const onSubmit = async (formData: any) => {
        await mutation.mutateAsync(formData);

    };

    return (
        <>
            <Breadcrump breadcrumb={[
                {
                    title: "پیامک ها",
                    href: "sms"
                },
                {
                    title: "ارسال پیامک",
                    href: "sms/send"
                },
            ]}/>
            <Panel>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-x-5 gap-y-10">
                        <div>
                            <Label>پرسش</Label>
                            <Textarea
                                disabled={mutation.isLoading}  {...register("message", {required: "پرسش الزامی است"})}>
                            </Textarea>
                            {errors.message && <p className="text-error text-xs">{errors.message.message}</p>}
                        </div>
                        <div>
                            <Label>دسته ارسال</Label>
                            <Select {...register("type")}>
                                {types.map((type, index) => (
                                    <option value={type.value} key={index}>
                                        {type.key}
                                    </option>
                                ))}
                            </Select>
                            {errors.type && <p className="text-error text-xs">{errors.type.message}</p>}
                        </div>


                    </div>
                    <div className="flex gap-5 mt-14">
                        <Link href={"/admin/sms"}>
                            <ButtonPrimary>
                                بازگشت
                            </ButtonPrimary>
                        </Link>
                        <ButtonPrimary loading={mutation.isLoading}>
                            ذخیره
                        </ButtonPrimary>

                    </div>


                </form>
            </Panel>
        </>
    );
}
