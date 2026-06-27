"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {NewsFormValues} from "@/app/admin/news/Form";
import {update, findById} from "@/services/api/admin/news";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import NewsTab from "@/components/Tabs/NewsTab";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();
    const [progress, setProgress] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: [`news-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-news", Number(id)],
        mutationFn: async (values: NewsFormValues) => {
            return update({
                id: Number(id),
                title: values.title,
                url: values.url,
                categoryId: Number(values.categoryId),
                published: values.published,
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
                    {title: "بلاگ", href: "news"},
                    {title: "ویرایش بلاگ", href: "news/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش بلاگ</PageTitle>
                <NewsTab id={id + ""} />
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} />
                    )}
                </div>
            </Panel>
        </>
    );
}
