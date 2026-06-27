"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {ConceptFormValues} from "@/app/admin/concept/Form";
import {findById, update} from "@/services/api/admin/concept";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import ConceptTab from "@/components/Tabs/ConceptTab";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();
    const [progress, setProgress] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: [`concept_info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-concept", Number(id)],
        mutationFn: async (values: ConceptFormValues) => {
            return update({
                id: Number(id),
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
                    {title: "ویرایش concept", href: "concept/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش concept</PageTitle>
                <ConceptTab id={id + ""} />
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} />
                    )}
                </div>
            </Panel>
        </>
    );
}
