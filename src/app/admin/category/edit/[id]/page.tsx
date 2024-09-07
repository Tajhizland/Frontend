"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import toast from "react-hot-toast";
import Form from "@/app/admin/category/Form";
import {findById, update} from "@/services/api/admin/category";
import { useState } from "react";
import { useParams } from "next/navigation";

export default async function Page() {
    const { id } = useParams();
    const data=await findById(Number(id))

    async function submit(e: FormData) {
        let response=await update(
            {
                id: Number(id),
                name: e.get("name") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                description: e.get("description") as string,
                image:e.get("image"),
                parent_id:e.get("parent_id") as string

            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته بندی",
                href: "category"
            },
            {
                title: "ویرایش دسته بندی",
                href: "category/edit/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش دسته بندی
            </PageTitle>
            <div>
                <Form data={data} submit={submit}/>
            </div>
        </Panel>

    </>)
}