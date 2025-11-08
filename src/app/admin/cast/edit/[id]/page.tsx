"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/cast/Form";
import {findById, update} from "@/services/api/admin/cast";
import toast from "react-hot-toast";
import {useParams} from "next/navigation"; 
import {useQuery} from "react-query";

export default   function Page()
{
    const { id } = useParams();

    const {data: data } = useQuery({
        queryKey: [`cast_info`, Number(id)],
        queryFn: () =>findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {

        let response=await update(
            {
                id:Number(id),
                title: e.get("title") as string,
                url: e.get("url") as string,
                status: Number(e.get("status")),
                vlog_id: Number(e.get("vlog_id")),
                audio: e.get("audio") as File,
                image: e.get("image") as File,
                description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "cast",
                href: "cast"
            },
            {
                title: "ویرایش cast",
                href: "product/edit/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
               ویرایش cast
            </PageTitle>
            <div>
                <Form submit={submit}  data={data}/>
            </div>
        </Panel>
    </>)
}
