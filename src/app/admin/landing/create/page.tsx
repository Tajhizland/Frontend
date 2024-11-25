"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/landing/Form";
import {storeLanding} from "@/services/api/admin/landing";
import toast from "react-hot-toast";

export default function Page() {
    async function submit(e: FormData) {
        let response = await storeLanding(
            {
                title: e.get("title") as string,
                status: e.get("status") as string,
                url: e.get("url") as string,
                description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "لندینگ",
                href: "landing"
            },
            {
                title: "افزودن لندینگ جدید",
                href: "landing/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد لندینگ جدید
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
