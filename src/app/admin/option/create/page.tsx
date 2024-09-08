"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/option/Form";
import {store} from "@/services/api/admin/option";
import toast from "react-hot-toast";

export default function Page()
{
    async function submit(e: FormData) {
        let response=await store(
            {
                title: e.get("title") as string,
                category_id: e.get("category_id") as string,
                status: e.get("status") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "ویژگی ها",
                href: "option"
            },
            {
                title: "افزودن ویژگی",
                href: "option/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن ویژگی
            </PageTitle>
            <div>
                <Form submit={submit} />
            </div>
        </Panel>
    </>)
}
