"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/news/Form";
import {store} from "@/services/api/admin/news";
import toast from "react-hot-toast";

export default function Page()
{
    async function submit(e: FormData) {
        let response=await store(
            {
                title: e.get("title") as string,
                url: e.get("url") as string,
                published: e.get("published") as string,
                image: e.get("image") ,
                content: e.get("content") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "بلاگ",
                href: "news"
            },
            {
                title: "افزودن بلاگ جدید",
                href: "news/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن بلاگ جدید
            </PageTitle>
            <div>
                <Form submit={submit} />
            </div>
        </Panel>
    </>)
}
