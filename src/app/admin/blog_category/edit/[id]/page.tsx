"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {BlogCategoryFormValues} from "@/app/admin/blog_category/Form";
import {update, findById} from "@/services/api/admin/blogCategory";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";

export default function Page() {
    const {id} = useParams();

    const {data, isLoading} = useQuery({
        queryKey: [`blogCategory-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-blogCategory", Number(id)],
        mutationFn: async (values: BlogCategoryFormValues) => {
            return update({
                id: Number(id),
                name: values.name,
                url: values.url,
                status: Number(values.status),
            });
        },
        onSuccess: (response) => {
            if (response.success) toast.success(response.message as string);
        },
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "مدیریت دسته بندی بلاگ", href: "blog_category"},
                    {title: "ویرایش دسته بندی بلاگ", href: "blog_category/update/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش دسته بندی بلاگ</PageTitle>
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} />
                    )}
                </div>
            </Panel>
        </>
    );
}
