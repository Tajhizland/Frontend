"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/guaranty/Form";
import {store} from "@/services/api/admin/guaranty";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page()
{
        const router = useRouter();

    async function submit(e: FormData) {
        let response=await store(
            {
                name: e.get("name") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                free: Number(e.get("free")) ,
                icon: e.get("icon") as File,
                description: e.get("description") as string,
            }
        )
        if(response?.success) {
            toast.success(response?.message as string)
            router.push("/admin/guaranty");
        }
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "گارانتی",
                href: "guaranty"
            },
            {
                title: "افزودن گارانتی",
                href: "guaranty/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن گارانتی جدید
            </PageTitle>
            <div>
                <Form submit={submit} />
            </div>
        </Panel>
    </>)
}
