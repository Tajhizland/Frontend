"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/brand/Form";
import {findById, update} from "@/services/api/admin/brand";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";

export default async function Page()
{
    const { id } = useParams();
    const data=await findById(Number(id))

    async function submit(e: FormData) {

        let response=await update(
            {
                id:Number(id),
                name: e.get("name") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                 image: e.get("image") as File,
                description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "برند",
                href: "brand"
            },
            {
                title: "افزودن برند جدید",
                href: "product/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
               ویرایش محصول
            </PageTitle>
            <div>
                <Form submit={submit}  data={data}/>
            </div>
        </Panel>
    </>)
}
