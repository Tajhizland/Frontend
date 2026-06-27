"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {OptionFormValues} from "@/app/admin/option/Form";
import {update, findById} from "@/services/api/admin/option";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";

export default function Page() {
    const {id} = useParams();

    const {data, isLoading} = useQuery({
        queryKey: [`option-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-option", Number(id)],
        mutationFn: async (values: OptionFormValues) => {
            return update({
                id: Number(id),
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
                    {title: "ویرایش ویژگی", href: "option/update/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش ویژگی</PageTitle>
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} />
                    )}
                </div>
            </Panel>
        </>
    );
}
