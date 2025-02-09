"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {update ,findById} from "@/services/api/admin/blogCategory";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
 import {useQuery, useQueryClient} from "react-query";
import Form from "@/app/admin/blog_category/Form";

export default  function Page()
{
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: data } = useQuery({
        queryKey: [`blogCategory-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
        let response=await update(
            {
                id:Number(id),
                name: e.get("name") as string,
                status: Number(e.get("status")) ,
                url: e.get("url") as string,
            }
        )
        queryClient.refetchQueries(['blogCategory-info']);

        toast.success(response?.message as string)

    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "مدیریت دسته بندی بلاگ",
                href: "blog_category"
            },
            {
                title: "ویرایش دسته بندی بلاگ",
                href: "blog_category/update/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش دسته بندی بلاگ
            </PageTitle>
            <div>
                <Form data={data} submit={submit} />
            </div>
        </Panel>

    </>)
}
