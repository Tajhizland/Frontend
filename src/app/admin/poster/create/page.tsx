"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/poster/Form";
import {store} from "@/services/api/admin/poster";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    async function submit(e: FormData) {
        let response = await store(
            {
                image: e.get("image") as File,
            }
        )
        toast.success(response?.message as string)
        router.push("/admin/poster");

    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پوستر ها",
                href: "poster"
            },
            {
                title: "افزودن پوستر",
                href: "poster/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن پوستر
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
