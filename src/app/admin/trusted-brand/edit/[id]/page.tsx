"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/trusted-brand/Form";
import {update ,findById} from "@/services/api/admin/trustedBrand";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
 import {useQuery} from "react-query";

export default  function Page()
{
    const { id } = useParams();
     const { data: data } = useQuery({
        queryKey: [`trusted-brand-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
        let response=await update(
            {
                id:Number(id),
                logo: e.get("logo") as File,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "برند های تجهیز شده",
                href: "trusted-brand"
            },
            {
                title: "ویرایش",
                href: "trusted-brand/edit/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش برند های تجهیز شده
            </PageTitle>
            <div>
                <Form data={data} submit={submit} />
            </div>
        </Panel>

    </>)
}
