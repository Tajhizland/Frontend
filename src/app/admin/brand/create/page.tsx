"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {BrandFormValues} from "@/app/admin/brand/Form";
import {store} from "@/services/api/admin/brand";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-brand"],
        mutationFn: async (values: BrandFormValues) => {
            return store({
                name: values.name,
                url: values.url,
                status: values.status,
                image: values.image ?? null,
                banner: values.banner ?? null,
                description: values.description,
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
                    {title: "برند", href: "brand"},
                    {title: "افزودن برند جدید", href: "brand/create"},
                ]}
            />
            <Panel>
                <PageTitle>ایجاد برند جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
