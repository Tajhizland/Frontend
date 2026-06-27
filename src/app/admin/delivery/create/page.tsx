"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {DeliveryFormValues} from "@/app/admin/delivery/Form";
import {store} from "@/services/api/admin/delivery";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-delivery"],
        mutationFn: async (values: DeliveryFormValues) => {
            return store({
                name: values.name,
                description: values.description,
                status: values.status,
                price: values.price,
                logo: values.logo ?? null,
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
                    {title: "تنظیمات سرویس ارسال", href: "delivery"},
                    {title: "افزودن سرویس ارسال", href: "delivery/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن سرویس ارسال</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
