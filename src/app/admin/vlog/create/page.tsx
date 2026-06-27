"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {VlogFormValues} from "@/app/admin/vlog/Form";
import {store} from "@/services/api/admin/vlog";
import toast from "react-hot-toast";
import React, {useState} from "react";
import {useMutation} from "react-query";

export default function Page() {
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-vlog"],
        mutationFn: async (values: VlogFormValues) => {
            return store({
                title: values.title,
                url: values.url,
                categoryId: values.categoryId,
                status: values.status,
                video: values.video ?? null,
                poster: values.poster ?? null,
                description: values.description,
                setProgress: setProgress,
            });
        },
        onSuccess: (response) => {
            if (response.success) toast.success(response.message as string);
            setProgress(0);
        },
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "ولاگ", href: "vlog"},
                    {title: "افزودن ولاگ جدید", href: "vlog/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن ولاگ جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} resetOnSuccess />
                </div>
                {progress > 0 && (
                    <div className="w-full bg-gray-200 rounded-md mt-4">
                        <div
                            className="bg-[#fcb415] text-xs font-medium text-white text-center p-1 leading-none rounded-md"
                            style={{width: `${progress}%`}}
                        >
                            {progress}%
                        </div>
                    </div>
                )}
            </Panel>
        </>
    );
}
