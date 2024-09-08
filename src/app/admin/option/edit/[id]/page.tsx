"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/option/Form";
import {update ,findById} from "@/services/api/admin/option";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
 import {useQuery} from "react-query";

export default  function Page()
{
    const { id } = useParams();
     const { data: data } = useQuery({
        queryKey: [`option-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
        let response=await update(
            {
                id:Number(id),
                title: e.get("title") as string,
                category_id: e.get("category_id") as string,
                status: e.get("status") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "ویژگی ها",
                href: "option"
            },
            {
                title: "ویرایش ویژگی",
                href: "option/update/"+id
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
