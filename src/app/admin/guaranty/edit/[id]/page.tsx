"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {GuarantyFormValues} from "@/app/admin/guaranty/Form";
import {update, findById} from "@/services/api/admin/guaranty";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();
    const [progress, setProgress] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: [`guaranty-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-guaranty", Number(id)],
        mutationFn: async (values: GuarantyFormValues) => {
            return update({
                id: Number(id),
                name: values.name,
                free: Number(values.free),
                url: values.url,
                status: values.status,
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
                    {title: "ویرایش گارانتی", href: "guaranty/update/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش گارانتی</PageTitle>
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} />
                    )}
                </div>
            </Panel>
        </>
    );
}
