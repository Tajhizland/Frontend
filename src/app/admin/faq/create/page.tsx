"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/faq/Form";
import {store} from "@/services/api/admin/faq";
import toast from "react-hot-toast";

export default function Page()
{
    async function submit(e: FormData) {
        let response=await store(
            {
                question: e.get("question") as string,
                answer: e.get("answer") as string,
                status: e.get("status") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "پرسش های متداول",
                href: "faq"
            },
            {
                title: "افزودن پرسش های متداول",
                href: "faq/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن پرسش جدید
            </PageTitle>
            <div>
                <Form submit={submit} />
            </div>
        </Panel>
    </>)
}
