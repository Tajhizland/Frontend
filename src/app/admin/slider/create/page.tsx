"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {SliderFormValues} from "@/app/admin/slider/Form";
import {store} from "@/services/api/admin/slider";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-slider"],
        mutationFn: async (values: SliderFormValues) => {
            return store({
                title: values.title,
                url: values.url,
                status: values.status,
                type: values.type,
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
                    {title: "اسلایدر", href: "slider"},
                    {title: "افزودن اسلایدر", href: "slider/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن اسلایدر</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
