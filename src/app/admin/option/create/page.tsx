"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {OptionFormValues} from "@/app/admin/option/Form";
import {store} from "@/services/api/admin/option";
import toast from "react-hot-toast";
import {useMutation} from "react-query";

export default function Page() {
    const mutation = useMutation({
        mutationKey: ["store-option"],
        mutationFn: async (values: OptionFormValues) => {
            return store({
                title: values.title,
                category_id: values.category_id,
                status: values.status,
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
                    {title: "ویژگی ها", href: "option"},
                    {title: "افزودن ویژگی", href: "option/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن ویژگی</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
