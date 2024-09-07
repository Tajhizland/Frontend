"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/brand/Form";
import {update} from "@/services/api/admin/news";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {findById} from "@/services/api/admin/category";

export default async function Page()
{
    const { id } = useParams();
    const data=await findById(Number(id))

    async function submit(e: FormData) {
        let response=await update(
            {
                id:Number(id),
                title: e.get("title") as string,
                url: e.get("url") as string,
                published: e.get("published") as string,
                image: e.get("image") ,
                content: e.get("content") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "بلاگ",
                href: "news"
            },
            {
                title: "ویرایش بلاگ",
                href: "news/edit/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش بلاگ
            </PageTitle>
            <div>
                <Form data={data} submit={submit} />
            </div>
        </Panel>

    </>)
}
