"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/vlog/Form";
import {update} from "@/services/api/admin/vlog";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {findById} from "@/services/api/admin/vlog";
import {useQuery} from "react-query";
import PageTab from "@/components/Tabs/PageTab";

export default function Page() {
    const {id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`vlog-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        let response = await update(
            {
                id: Number(id),
                title: e.get("title") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                video: e.get("video") as File,
                poster: e.get("poster") as File,
                description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "ولاگ",
                href: "vlog"
            },
            {
                title: "ویرایش ولاگ",
                href: "vlog/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش ولاگ
            </PageTitle>
            <PageTab id={id + ""}/>
            <div>
                <Form data={data} submit={submit}/>
            </div>
        </Panel>

    </>)
}
