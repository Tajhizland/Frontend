"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import toast from "react-hot-toast";
import Form from "@/app/admin/category/Form";
import {store, update} from "@/services/api/admin/category";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useMutation} from "react-query";

export default function Page() {
    const router = useRouter();

    const mutation = useMutation({
        mutationKey: [`store-category`],
        mutationFn: async (formData: any) => {
            return store({
                ...formData,
            });
        },
        onSuccess: (data) => {
            toast.success(data?.message ?? "")
            router.push("/admin/category");
        },
    });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته‌بندی",
                href: "category"
            },
            {
                title: "افزودن دسته‌بندی جدید",
                href: "category/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد دسته‌بندی جدید
            </PageTitle>
            <div>
                <Form submit={mutation.mutateAsync}/>
            </div>
        </Panel>

    </>)
}
