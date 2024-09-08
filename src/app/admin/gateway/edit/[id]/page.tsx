"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/gateway/Form";
import {update ,findById} from "@/services/api/admin/gateway";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
 import {useQuery} from "react-query";

export default  function Page()
{
    const { id } = useParams();
     const { data: data } = useQuery({
        queryKey: [`gateway-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
        let response=await update(
            {
                id:Number(id),
                name: e.get("name") as string,
                status: e.get("status") as string,
                description: e.get("description") as string,

            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "تنظیمات درگاه پرداخت",
                href: "gateway"
            },
            {
                title: "ویرایش درگاه پرداخت",
                href: "gateway/update/"+id
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
