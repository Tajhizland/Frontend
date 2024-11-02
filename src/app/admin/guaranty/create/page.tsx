"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/guaranty/Form";
import {store} from "@/services/api/admin/guaranty";
import toast from "react-hot-toast";

export default function Page()
{
    async function submit(e: FormData) {
        let response=await store(
            {
                name: e.get("name") as string,
                status: e.get("status") as string,
                icon: e.get("icon") as File,
                description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
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
