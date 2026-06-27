"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {GatewayFormValues} from "@/app/admin/gateway/Form";
import {store} from "@/services/api/admin/gateway";
import toast from "react-hot-toast";
import {useMutation} from "react-query";

export default function Page() {
    const mutation = useMutation({
        mutationKey: ["store-gateway"],
        mutationFn: async (values: GatewayFormValues) => {
            return store({
                name: values.name,
                status: values.status,
                description: values.description,
            });
        },
        onSuccess: (response) => {
            if (response.success) toast.success(response.message as string);
        },
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "تنظیمات درگاه پرداخت", href: "gateway"},
                    {title: "افزودن درگاه پرداخت", href: "gateway/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن درگاه پرداخت</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
