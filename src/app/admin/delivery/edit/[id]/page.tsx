"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/delivery/Form";
import {update ,findById} from "@/services/api/admin/delivery";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
 import {useQuery} from "react-query";

export default  function Page()
{
    const { id } = useParams();
     const { data: data } = useQuery({
        queryKey: [`delivery-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
        let response=await update(
            {
                id:Number(id),
                name: e.get("name") as string,
                description: e.get("description") as string,
                status: e.get("status") as string,
                logo: e.get("logo") as File,
                price: e.get("price") as string,

            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "تنظیمات سرویس ارسال",
                href: "delivery"
            },
            {
                title: "ویرایش سرویس ارسال",
                href: "delivery/update/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش سرویس ارسال
            </PageTitle>
            <div>
                <Form data={data} submit={submit} />
            </div>
        </Panel>

    </>)
}
