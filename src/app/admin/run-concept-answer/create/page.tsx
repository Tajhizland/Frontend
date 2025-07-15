"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/run-concept-answer/Form";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {store} from "@/services/api/admin/runConceptAnswer";

export default function Page() {
    const router = useRouter();

    async function submit(e: FormData) {
        let response = await store(
            {
                answer: e.get("answer") as string,
                status: Number(e.get("status")),
                price: Number(e.get("price")),
                run_concept_question_id: Number(e.get("run_concept_question_id")),
            }
        )
        toast.success(response?.message as string)
        router.push("/admin/run-concept-answer");

    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پاسخ",
                href: "run-concept-answer"
            },
            {
                title: "افزودن پاسخ جدید",
                href: "run-concept-answer/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن پاسخ جدید
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
