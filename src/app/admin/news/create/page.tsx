"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {NewsFormValues} from "@/app/admin/news/Form";
import {store} from "@/services/api/admin/news";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-news"],
        mutationFn: async (values: NewsFormValues) => {
            return store({
                title: values.title,
                url: values.url,
                categoryId: Number(values.categoryId),
                published: values.published,
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
                    {title: "بلاگ", href: "news"},
                    {title: "افزودن بلاگ جدید", href: "news/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن بلاگ جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
