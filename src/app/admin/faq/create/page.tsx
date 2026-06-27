"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {FaqFormValues} from "@/app/admin/faq/Form";
import {store} from "@/services/api/admin/faq";
import toast from "react-hot-toast";
import {useMutation} from "react-query";

export default function Page() {
    const mutation = useMutation({
        mutationKey: ["store-faq"],
        mutationFn: async (values: FaqFormValues) => {
            return store({
                question: values.question,
                answer: values.answer,
                status: values.status,
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
                    {title: "پرسش های متداول", href: "faq"},
                    {title: "افزودن پرسش های متداول", href: "faq/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن پرسش جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
