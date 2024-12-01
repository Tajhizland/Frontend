"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/brand/Form";
import {store} from "@/services/api/admin/brand";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    async function submit(e: FormData) {

        let response = await store(
            {
                name: e.get("name") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                image: e.get("image") as File,
                description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
        router.push("/admin/brand");

    }

    return (<>
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
                ایجاد برند جدید
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
