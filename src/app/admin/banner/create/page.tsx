"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/banner/Form";
import {store} from "@/services/api/admin/banner";
import toast from "react-hot-toast";

export default function Page()
{
    async function submit(e: FormData) {
        let response=await store(
            {
                url: e.get("url") as string,
                image: e.get("image") as File,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "بنر",
                href: "banner"
            },
            {
                title: "افزودن بنر",
                href: "banner/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن بنر
            </PageTitle>
            <div>
                <Form submit={submit} />
            </div>
        </Panel>
    </>)
}