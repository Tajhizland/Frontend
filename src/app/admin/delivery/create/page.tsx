"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/delivery/Form";
import {store} from "@/services/api/admin/delivery";
import toast from "react-hot-toast";

export default function Page()
{
    async function submit(e: FormData) {
        let response=await store(
            {
                name: e.get("title") as string,
                description: e.get("description") as string,
                status: e.get("status") as string,
                logo: e.get("logo") as File,
                price: e.get("price") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "تنظیمات سرویس ارسال",
                href: "delivery"
            },
            {
                title: "افزودن سرویس ارسال",
                href: "delivery/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن سرویس ارسال
            </PageTitle>
            <div>
                <Form submit={submit} />
            </div>
        </Panel>
    </>)
}
