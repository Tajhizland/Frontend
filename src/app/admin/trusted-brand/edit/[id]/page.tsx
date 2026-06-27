"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {TrustedBrandFormValues} from "@/app/admin/trusted-brand/Form";
import {update, findById} from "@/services/api/admin/trustedBrand";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();
    const [progress, setProgress] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: [`trusted-brand-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-trusted-brand", Number(id)],
        mutationFn: async (values: TrustedBrandFormValues) => {
            return update({
                id: Number(id),
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
                    {title: "ویرایش", href: "trusted-brand/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش برند های تجهیز شده</PageTitle>
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} />
                    )}
                </div>
            </Panel>
        </>
    );
}
