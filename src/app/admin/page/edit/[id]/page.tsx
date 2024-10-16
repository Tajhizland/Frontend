"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/page/Form";
import {update} from "@/services/api/admin/page";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {findById} from "@/services/api/admin/page";
import {useQuery} from "react-query";
import PageTab from "@/components/Tabs/PageTab";

export default  function Page()
{
    const { id } = useParams();
     const { data: data } = useQuery({
        queryKey: [`page-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
        let response=await update(
            {
                id:Number(id),
                title: e.get("title") as string,
                url: e.get("url") as string,
                status: e.get("published") as string,
                 image: e.get("image") as File,
                content: e.get("content") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "صفحه",
                href: "page"
            },
            {
                title: "ویرایش صفحه",
                href: "page/edit/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش صفحه
            </PageTitle>
            <PageTab id={id+""} />
            <div>
                <Form data={data} submit={submit} />
            </div>
        </Panel>

    </>)
}
