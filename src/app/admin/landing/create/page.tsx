"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {LandingFormValues} from "@/app/admin/landing/Form";
import {storeLanding} from "@/services/api/admin/landing";
import toast from "react-hot-toast";
import {useMutation} from "react-query";

export default function Page() {
    const mutation = useMutation({
        mutationKey: ["store-landing"],
        mutationFn: async (values: LandingFormValues) => {
            return storeLanding({
                title: values.title,
                status: values.status,
                url: values.url,
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
                    {title: "لندینگ", href: "landing"},
                    {title: "افزودن لندینگ جدید", href: "landing/create"},
                ]}
            />
            <Panel>
                <PageTitle>ایجاد لندینگ جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
