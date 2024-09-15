"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/slider/Form";
import {update ,findById} from "@/services/api/admin/slider";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
 import {useQuery} from "react-query";

export default  function Page()
{
    const { id } = useParams();
     const { data: data } = useQuery({
        queryKey: [`slider-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
        let response=await update(
            {
                id:Number(id),
                title: e.get("title") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                image: e.get("image") as File,

            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "اسلایدر",
                href: "slider"
            },
            {
                title: "ویرایش اسلایدر",
                href: "slider/update/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش اسلایدر
            </PageTitle>
            <div>
                <Form data={data} submit={submit} />
            </div>
        </Panel>

    </>)
}
