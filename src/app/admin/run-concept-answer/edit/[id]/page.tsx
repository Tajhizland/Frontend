"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {RunConceptAnswerFormValues} from "@/app/admin/run-concept-answer/Form";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {find, update} from "@/services/api/admin/runConceptAnswer";

export default function Page() {
    const {id} = useParams();

    const {data, isLoading} = useQuery({
        queryKey: [`run-concept-answer-info`, Number(id)],
        queryFn: () => find(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-run-concept-answer", Number(id)],
        mutationFn: async (values: RunConceptAnswerFormValues) => {
            return update({
                id: Number(id),
                answer: values.answer,
                status: Number(values.status),
                price: Number(values.price),
                run_concept_question_id: Number(values.run_concept_question_id),
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
                    {title: "پاسخ", href: "run-concept-answer"},
                    {title: "ویرایش پاسخ", href: "run-concept-answer/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش پاسخ</PageTitle>
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} />
                    )}
                </div>
            </Panel>
        </>
    );
}
