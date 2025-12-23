"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/vlog_category/Form";
import {store} from "@/services/api/admin/vlogCategory";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page() {

    const router = useRouter();

    async function submit(e: FormData) {
        let response = await store(
            {
                name: e.get("name") as string,
                url: e.get("url") as string,
                status: Number(e.get("status")),
            }
        )
        toast.success(response?.message as string)
        router.push("/admin/vlog_category");
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
