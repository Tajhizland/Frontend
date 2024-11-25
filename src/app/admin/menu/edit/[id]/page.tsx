"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/menu/Form";
import {findById, update} from "@/services/api/admin/menu";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";

export default   function Page()
{
    const { id } = useParams();
    const {data: data } = useQuery({
        queryKey: [`menu_info`],
        queryFn: () =>findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {

        let response=await update(
            {
                id:Number(id),
                title: e.get("title") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                banner_logo: e.get("banner_logo") as File,
                banner_title: e.get("banner_title") as string,
                banner_link: e.get("banner_link") as string,
                parent_id: e.get("parent_id") as string
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "منو",
                href: "menu"
            },
            {
                title: "ویرایش منو",
                href: "product/edit/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
               ویرایش منو
            </PageTitle>
            <div>
                <Form submit={submit}  data={data}/>
            </div>
        </Panel>
    </>)
}
