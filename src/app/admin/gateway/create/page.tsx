"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/gateway/Form";
import {store} from "@/services/api/admin/gateway";
import toast from "react-hot-toast";

export default function Page()
{
    async function submit(e: FormData) {
        let response=await store(
            {
                name: e.get("name") as string,
                description: e.get("description") as string,
                status: e.get("status") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "تنظیمات درگاه پرداخت",
                href: "gateway"
            },
            {
                title: "افزودن درگاه پرداخت",
                href: "gateway/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن درگاه پرداخت
            </PageTitle>
            <div>
                <Form submit={submit} />
            </div>
        </Panel>
    </>)
}
