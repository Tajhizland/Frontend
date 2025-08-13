"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/run-concept-question/Form";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import {find, update} from "@/services/api/admin/runConceptQuestion";

export default function Page() {
    const {id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`run-concept-question-info`, Number(id)],
        queryFn: () => find(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        let response = await update(
            {
                id: Number(id),
                question: e.get("question") as string,
                status: Number(e.get("status")),
                level: Number(e.get("level")),
                parent_question: Number(e.get("parent_question")),
                parent_answer: Number(e.get("parent_answer")),
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پاسخ",
                href: "run-concept-question"
            },
            {
                title: "ویرایش پاسخ  ",
                href: "run-concept-question/edit/"+id
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
