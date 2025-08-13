"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/vlog_category/Form";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {findById , update} from "@/services/api/admin/vlogCategory";
import {useQuery} from "react-query";
import PageTab from "@/components/Tabs/PageTab";

export default function Page() {
    const {id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`vlog_category-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        let response = await update(
            {
                id: Number(id),
                name: e.get("name") as string,
                status: Number(e.get("status")) ,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته بندی ولاگ",
                href: "vlog_category"
            },
            {
                title: "ویرایش دسته بندی ولاگ",
                href: "vlog_category/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش دسته بندی ولاگ
            </PageTitle>
            <PageTab id={id + ""}/>
            <div>
                <Form data={data} submit={submit}/>
            </div>
        </Panel>

    </>)
}
