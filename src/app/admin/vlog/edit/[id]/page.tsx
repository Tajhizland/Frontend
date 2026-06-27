"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {VlogFormValues} from "@/app/admin/vlog/Form";
import {update, findById} from "@/services/api/admin/vlog";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "react-query";
import PageTab from "@/components/Tabs/PageTab";
import React, {useState} from "react";

export default function Page() {
    const [progress, setProgress] = useState(0);
    const queryClient = useQueryClient();
    const {id} = useParams();

    const {data, isLoading} = useQuery({
        queryKey: [`vlog-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-vlog", Number(id)],
        mutationFn: async (values: VlogFormValues) => {
            return update({
                id: Number(id),
                title: values.title,
                categoryId: values.categoryId,
                url: values.url,
                status: values.status,
                video: values.video ?? null,
                poster: values.poster ?? null,
                description: values.description,
                setProgress: setProgress,
            });
        },
        onSuccess: (response) => {
            if (response.success) {
                queryClient.invalidateQueries(["vlog-info", Number(id)]);
                toast.success(response.message as string);
            }
            setProgress(0);
        },
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "ولاگ", href: "vlog"},
                    {title: "ویرایش ولاگ", href: "vlog/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش ولاگ</PageTitle>
                <PageTab id={id + ""} />
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} />
                    )}
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
