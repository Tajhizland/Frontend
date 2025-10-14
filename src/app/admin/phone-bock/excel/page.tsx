"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Uploader from "@/shared/Uploader/Uploader";
import Label from "@/shared/Label/Label";
import {Controller, useForm} from "react-hook-form";
import React from "react";
import {useMutation} from "react-query";
import {toast} from "react-hot-toast";
import {phoneBockUploadExcel} from "@/services/api/admin/phoneBock";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function Page() {
    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            file: "",
        },
    });

    const uploadMutation = useMutation({
        mutationKey: [`phone-bock-upload-excel-file`],
        mutationFn: async (formData: any) => {
            console.log("file",formData)
            return phoneBockUploadExcel({
                ...formData,
            });
        },
        onSuccess: (response) => {
            if (!response)
                return;
            toast.success(response?.message as string);
        },
    });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دفترچه تلفن",
                href: "phone-bock"
            },
            {
                title: " افزودن گروهی مخاطب",
                href: "phone-bock/excel"
            },

        ]}/>
        <Panel>
            <PageTitle>
                افزودن گروهی مخاطب
            </PageTitle>
            <div>

                <form
                    //@ts-ignore
                    onSubmit={handleSubmit(uploadMutation.mutateAsync)}>
                <Label> فایل اکسل را انتخاب کنید </Label>
                <Controller
                    name="file"
                    control={control}
                    render={({field, fieldState}) => (
                        <>
                            <Uploader
                                name="file"
                                onChange={field.onChange}
                            />
                            {fieldState.error && (
                                <p className="text-error text-xs">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
                    <ButtonPrimary>
                        افزودن
                    </ButtonPrimary>
                </form>
            </div>
        </Panel>
    </>)
}
