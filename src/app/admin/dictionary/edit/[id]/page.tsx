"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {DictionaryFormValues} from "@/app/admin/dictionary/Form";
import {update, findById} from "@/services/api/admin/dictionary";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";

export default function Page() {
    const {id} = useParams();

    const {data, isLoading} = useQuery({
        queryKey: [`dictionary-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-dictionary", Number(id)],
        mutationFn: async (values: DictionaryFormValues) => {
            return update({
                id: Number(id),
                original_word: values.original_word,
                mean: values.mean,
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
                    {title: "تنظیمات دیکشنری", href: "dictionary"},
                    {title: "ویرایش دیکشنری", href: "dictionary/update/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش دیکشنری</PageTitle>
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} />
                    )}
                </div>
            </Panel>
        </>
    );
}
