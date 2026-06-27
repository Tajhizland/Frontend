"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {RunConceptQuestionFormValues} from "@/app/admin/run-concept-question/Form";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {find, update} from "@/services/api/admin/runConceptQuestion";

export default function Page() {
    const {id} = useParams();

    const {data, isLoading} = useQuery({
        queryKey: [`run-concept-question-info`, Number(id)],
        queryFn: () => find(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-run-concept-question", Number(id)],
        mutationFn: async (values: RunConceptQuestionFormValues) => {
            return update({
                id: Number(id),
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
                    {title: "ویرایش پرسش", href: "run-concept-question/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش پرسش</PageTitle>
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} />
                    )}
                </div>
            </Panel>
        </>
    );
}
