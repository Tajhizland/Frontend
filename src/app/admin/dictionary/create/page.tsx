"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/dictionary/Form";
import {store} from "@/services/api/admin/dictionary";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page()
{
    const router = useRouter();

    async function submit(e: FormData) {
        let response=await store(
            {
                original_word: e.get("original_word") as string,
                mean: e.get("mean") as string, 
            }
        )

        toast.success(response?.message as string)
        router.push("/admin/dictionary");
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "دیکشنری",
                href: "dictionary"
            },
            {
                title: "افزودن دیکشنری",
                href: "dictionary/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن دیکشنری جدید
            </PageTitle>
            <div>
                <Form submit={submit} />
            </div>
        </Panel>
    </>)
}
