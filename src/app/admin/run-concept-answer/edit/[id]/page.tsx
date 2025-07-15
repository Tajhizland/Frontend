"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/run-concept-answer/Form";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import {find, update} from "@/services/api/admin/runConceptAnswer";

export default function Page() {
    const {id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`run-concept-answer-info`],
        queryFn: () => find(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        let response = await update(
            {
                id: Number(id),
                answer: e.get("answer") as string,
                status: Number(e.get("status")),
                price: Number(e.get("price")),
                run_concept_question_id: Number(e.get("run_concept_question_id")),
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پاسخ",
                href: "run-concept-answer"
            },
            {
                title: "ویرایش پاسخ  ",
                href: "run-concept-answer/edit/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش بلاگ
            </PageTitle>
            <div>
                <Form data={data} submit={submit}/>
            </div>
        </Panel>

    </>)
}
