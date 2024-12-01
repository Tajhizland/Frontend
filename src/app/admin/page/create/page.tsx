"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/page/Form";
import {store} from "@/services/api/admin/page";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    async function submit(e: FormData) {
        let response = await store(
            {
                title: e.get("title") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                image: e.get("image") as File,
                content: e.get("content") as string,
            }
        )
        toast.success(response?.message as string)
        router.push("/admin/page");

    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "صقحه",
                href: "page"
            },
            {
                title: "افزودن صقحه جدید",
                href: "page/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن صقحه جدید
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
