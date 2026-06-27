"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {BrandFormValues} from "@/app/admin/brand/Form";
import {findById, update} from "@/services/api/admin/brand";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import BrandTab from "@/components/Tabs/BrandTab";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();
    const [progress, setProgress] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: [`brand_info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-brand", Number(id)],
        mutationFn: async (values: BrandFormValues) => {
            return update({
                id: Number(id),
                name: values.name,
                url: values.url,
                status: values.status,
                image: values.image ?? null,
                banner: values.banner ?? null,
                description: values.description,
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
                    {title: "برند", href: "brand"},
                    {title: "ویرایش برند", href: "brand/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش برند</PageTitle>
                <BrandTab id={id + ""} />
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} />
                    )}
                </div>
            </Panel>
        </>
    );
}
