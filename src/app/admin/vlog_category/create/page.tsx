"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {VlogCategoryFormValues} from "@/app/admin/vlog_category/Form";
import {store} from "@/services/api/admin/vlogCategory";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-vlog_category"],
        mutationFn: async (values: VlogCategoryFormValues) => {
            return store({
                name: values.name,
                url: values.url,
                status: Number(values.status),
                icon: values.icon ?? null,
                setProgress,
            });
        },
        onSuccess: (response) => {
            if (response.success) toast.success(response.message as string);
        },
        onSettled: () => setProgress(0),
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "دسته بندی ولاگ", href: "vlog_category"},
                    {title: "افزودن دسته بندی ولاگ جدید", href: "vlog_category/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن دسته بندی ولاگ جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
