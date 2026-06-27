"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {BannerFormValues} from "@/app/admin/banner/Form";
import {store} from "@/services/api/admin/banner";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-banner"],
        mutationFn: async (values: BannerFormValues) => {
            return store({
                url: values.url,
                type: values.type,
                image: values.image ?? undefined,
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
                    {title: "بنر", href: "banner"},
                    {title: "افزودن بنر", href: "banner/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن بنر</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
