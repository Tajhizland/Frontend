"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {BlogCategoryFormValues} from "@/app/admin/blog_category/Form";
import {store} from "@/services/api/admin/blogCategory";
import toast from "react-hot-toast";
import {useMutation} from "react-query";

export default function Page() {
    const mutation = useMutation({
        mutationKey: ["store-blogCategory"],
        mutationFn: async (values: BlogCategoryFormValues) => {
            return store({
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
                    {title: "افزودن  دسته بندی بلاگ", href: "blog_category/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن  دسته بندی بلاگ</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
