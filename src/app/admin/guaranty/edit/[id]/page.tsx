"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/faq/Form";
import {update ,findById} from "@/services/api/admin/faq";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
 import {useQuery} from "react-query";

export default  function Page()
{
    const { id } = useParams();
     const { data: data } = useQuery({
        queryKey: [`faq-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
        let response=await update(
            {
                id:Number(id),
                question: e.get("question") as string,
                status: e.get("status") as string,
                answer: e.get("answer") as string,

            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "تنظیمات پرسش های متداول",
                href: "faq"
            },
            {
                title: "ویرایش پرسش های متداول",
                href: "faq/update/"+id
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
