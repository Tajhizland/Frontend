"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {PageFormValues} from "@/app/admin/page/Form";
import {store} from "@/services/api/admin/page";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-page"],
        mutationFn: async (values: PageFormValues) => {
            return store({
                title: values.title,
                url: values.url,
                status: values.status,
                content: values.content,
                image: values.image ?? null,
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
                    {title: "صفحه", href: "page"},
                    {title: "افزودن صفحه جدید", href: "page/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن صفحه جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
