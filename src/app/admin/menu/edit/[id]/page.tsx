"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {MenuFormValues} from "@/app/admin/menu/Form";
import {findById, update} from "@/services/api/admin/menu";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();
    const [progress, setProgress] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: [`menu_info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-menu", Number(id)],
        mutationFn: async (values: MenuFormValues) => {
            return update({
                id: Number(id),
                title: values.title,
                url: values.url,
                status: values.status,
                banner_logo: values.banner_logo ?? null,
                category_id: Number(values.category_id),
                banner_link: values.banner_link,
                parent_id: values.parent_id,
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
                    {title: "منو", href: "menu"},
                    {title: "ویرایش منو", href: "menu/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش منو</PageTitle>
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} />
                    )}
                </div>
            </Panel>
        </>
    );
}
