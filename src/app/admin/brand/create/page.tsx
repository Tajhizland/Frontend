"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/brand/Form";
import {store} from "@/services/api/admin/brand";
import toast from "react-hot-toast";

export default function page()
{
    async function submit(e: FormData) {

        let response=await store(
            {
                name: e.get("name") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                image: e.get("image") ,
                 description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "برند",
                href: "brand"
            },
            {
                title: "افزودن برند جدید",
                href: "brand/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد محصول جدید
            </PageTitle>
            <div>
                <Form submit={submit} />
            </div>
        </Panel>
    </>)
}
