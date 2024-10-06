"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/menu/Form";
import {store} from "@/services/api/admin/menu";
import toast from "react-hot-toast";

export default function Page() {
    async function submit(e: FormData) {

        let response = await store(
            {
                title: e.get("title") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                banner_logo: e.get("banner_logo") as File,
                banner_title: e.get("banner_title") as string,
                banner_link: e.get("banner_link") as string,
                parent_id: e.get("parent_id") as string
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "منو",
                href: "menu"
            },
            {
                title: "افزودن منو جدید",
                href: "menu/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد منو جدید
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
