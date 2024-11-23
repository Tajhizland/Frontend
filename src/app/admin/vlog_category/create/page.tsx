"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/vlog_category/Form";
import {store} from "@/services/api/admin/vlogCategory";
import toast from "react-hot-toast";

export default function Page() {
    async function submit(e: FormData) {
        let response = await store(
            {
                name: e.get("name") as string,
                status: Number(e.get("status")) ,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته بندی ولاگ",
                href: "vlog_category"
            },
            {
                title: "افزودن دسته بندی ولاگ جدید",
                href: "vlog_category/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن دسته بندی ولاگ جدید
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
