"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/concept/Form";
import {store} from "@/services/api/admin/concept";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    async function submit(e: FormData) {

        let response = await store(
            {
                title: e.get("title") as string,
                status: e.get("status") as string,
                image: e.get("image") as File,
                description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
        router.push("/admin/concept");

    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "concept",
                href: "concept"
            },
            {
                title: "افزودن concept جدید",
                href: "concept/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد concept جدید
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
