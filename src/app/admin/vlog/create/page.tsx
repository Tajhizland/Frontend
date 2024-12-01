"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/vlog/Form";
import {store} from "@/services/api/admin/vlog";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    async function submit(e: FormData) {
        let response = await store(
            {
                title: e.get("title") as string,
                url: e.get("url") as string,
                categoryId: e.get("categoryId") as string,
                status: e.get("status") as string,
                video: e.get("video") as File,
                poster: e.get("poster") as File,
                description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
        router.push("/admin/vlog");
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "ولاگ",
                href: "vlog"
            },
            {
                title: "افزودن ولاگ جدید",
                href: "vlog/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن ولاگ جدید
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
