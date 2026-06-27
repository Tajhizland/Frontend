"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {GuarantyFormValues} from "@/app/admin/guaranty/Form";
import {store} from "@/services/api/admin/guaranty";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-guaranty"],
        mutationFn: async (values: GuarantyFormValues) => {
            return store({
                name: values.name,
                url: values.url,
                status: values.status,
                free: Number(values.free),
                description: values.description,
                icon: values.icon ?? undefined,
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
                    {title: "گارانتی", href: "guaranty"},
                    {title: "افزودن گارانتی", href: "guaranty/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن گارانتی جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
