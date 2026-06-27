"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {RunConceptQuestionFormValues} from "@/app/admin/run-concept-question/Form";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {store} from "@/services/api/admin/runConceptQuestion";

export default function Page() {
    const mutation = useMutation({
        mutationKey: ["store-run-concept-question"],
        mutationFn: async (values: RunConceptQuestionFormValues) => {
            return store({
                question: values.question,
                status: Number(values.status),
                level: Number(values.level),
                parent_question: Number(values.parent_question),
                parent_answer: Number(values.parent_answer),
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
                    {title: "پرسش", href: "run-concept-question"},
                    {title: "افزودن پرسش جدید", href: "run-concept-question/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن پرسش جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
