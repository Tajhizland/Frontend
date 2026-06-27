"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {TrustedBrandFormValues} from "@/app/admin/trusted-brand/Form";
import {store} from "@/services/api/admin/trustedBrand";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-trusted-brand"],
        mutationFn: async (values: TrustedBrandFormValues) => {
            return store({
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
                    {title: "برند های تجهیز شده", href: "trusted-brand"},
                    {title: "ایجاد", href: "trusted-brand/edit/"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن برند تجهیز شده</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
