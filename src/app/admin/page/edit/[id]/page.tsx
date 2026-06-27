"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {PageFormValues} from "@/app/admin/page/Form";
import {update, findById} from "@/services/api/admin/page";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import PageTab from "@/components/Tabs/PageTab";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();
    const [progress, setProgress] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: [`page-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-page", Number(id)],
        mutationFn: async (values: PageFormValues) => {
            return update({
                id: Number(id),
                title: values.title,
                url: values.url,
                status: values.status,
                content: values.content,
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
                    {title: "صفحه", href: "page"},
                    {title: "ویرایش صفحه", href: "page/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش صفحه</PageTitle>
                <PageTab id={id + ""} />
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} />
                    )}
                </div>
            </Panel>
        </>
    );
}
