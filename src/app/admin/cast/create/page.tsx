"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/cast/Form";
import {store} from "@/services/api/admin/cast";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    async function submit(e: FormData) {

        let response = await store(
            {
                title: e.get("title") as string,
                url: e.get("url") as string,
                status: Number(e.get("status")),
                vlog_id: Number(e.get("vlog_id")),
                audio: e.get("audio") as File,
                image: e.get("image") as File,
                description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
        router.push("/admin/cast");

    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "cast",
                href: "cast"
            },
            {
                title: "افزودن cast جدید",
                href: "cast/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد cast جدید
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
