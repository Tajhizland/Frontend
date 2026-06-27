"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {ConceptFormValues} from "@/app/admin/concept/Form";
import {store} from "@/services/api/admin/concept";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-concept"],
        mutationFn: async (values: ConceptFormValues) => {
            return store({
                title: values.title,
                status: values.status,
                description: values.description,
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
                    {title: "concept", href: "concept"},
                    {title: "افزودن concept جدید", href: "concept/create"},
                ]}
            />
            <Panel>
                <PageTitle>ایجاد concept جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
