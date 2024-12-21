"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/guaranty/Form";
import {update ,findById} from "@/services/api/admin/guaranty";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
 import {useQuery} from "react-query";

export default  function Page()
{
    const { id } = useParams();
     const { data: data } = useQuery({
        queryKey: [`guaranty-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
        let response=await update(
            {
                id:Number(id),
                name: e.get("name") as string,
                free: Number(e.get("free")) ,
                url: e.get("url") as string,
                status: e.get("status") as string,
                description: e.get("description") as string,
                icon: e.get("icon") as File,

            }
        )
        if(response?.success) {

            toast.success(response?.message as string)
    }
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "  گارانتی",
                href: "guaranty"
            },
            {
                title: "ویرایش گارانتی",
                href: "guaranty/update/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش گارانتی
            </PageTitle>
            <div>
                <Form data={data} submit={submit} />
            </div>
        </Panel>

    </>)
}
