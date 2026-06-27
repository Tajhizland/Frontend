"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {MenuFormValues} from "@/app/admin/menu/Form";
import {store} from "@/services/api/admin/menu";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-menu"],
        mutationFn: async (values: MenuFormValues) => {
            return store({
                title: values.title,
                url: values.url,
                status: values.status,
                banner_logo: values.banner_logo ?? null,
                category_id: Number(values.category_id),
                banner_link: values.banner_link,
                parent_id: values.parent_id,
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
                    {title: "منو", href: "menu"},
                    {title: "افزودن منو جدید", href: "menu/create"},
                ]}
            />
            <Panel>
                <PageTitle>ایجاد منو جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
