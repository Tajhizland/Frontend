"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {RunConceptAnswerFormValues} from "@/app/admin/run-concept-answer/Form";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {store} from "@/services/api/admin/runConceptAnswer";

export default function Page() {
    const mutation = useMutation({
        mutationKey: ["store-run-concept-answer"],
        mutationFn: async (values: RunConceptAnswerFormValues) => {
            return store({
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
                    {title: "افزودن پاسخ جدید", href: "run-concept-answer/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن پاسخ جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
