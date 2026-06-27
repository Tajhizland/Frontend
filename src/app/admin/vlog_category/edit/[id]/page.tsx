"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {VlogCategoryFormValues} from "@/app/admin/vlog_category/Form";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {findById, update} from "@/services/api/admin/vlogCategory";
import {useMutation, useQuery} from "react-query";
import PageTab from "@/components/Tabs/PageTab";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();
    const [progress, setProgress] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: [`vlog_category-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-vlog_category", Number(id)],
        mutationFn: async (values: VlogCategoryFormValues) => {
            return update({
                id: Number(id),
                name: values.name,
                url: values.url,
                status: Number(values.status),
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
                    {title: "دسته بندی ولاگ", href: "vlog_category"},
                    {title: "ویرایش دسته بندی ولاگ", href: "vlog_category/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش دسته بندی ولاگ</PageTitle>
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
