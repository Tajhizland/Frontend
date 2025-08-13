"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/brand/Form";
import {findById, update} from "@/services/api/admin/brand";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import BrandTab from "@/components/Tabs/BrandTab";
import {useQuery} from "react-query";
import {findLandingById} from "@/services/api/admin/landing";

export default   function Page()
{
    const { id } = useParams();

    const {data: data } = useQuery({
        queryKey: [`brand_info`, Number(id)],
        queryFn: () =>findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {

        let response=await update(
            {
                id:Number(id),
                name: e.get("name") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                 image: e.get("image") as File,
                banner: e.get("banner") as File,
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
                title: "ویرایش برند",
                href: "product/edit/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
               ویرایش برند
            </PageTitle>
            <BrandTab id={id+""} />
            <div>
                <Form submit={submit}  data={data}/>
            </div>
        </Panel>
    </>)
}
