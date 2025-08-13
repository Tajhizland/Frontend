"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/concept/Form";
import {findById, update} from "@/services/api/admin/concept";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import ConceptTab from "@/components/Tabs/ConceptTab";
import {useQuery} from "react-query";

export default   function Page()
{
    const { id } = useParams();
    const {data: data } = useQuery({
        queryKey: [`concept_info`, Number(id)],
        queryFn: () =>findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {

        let response=await update(
            {
                id:Number(id),
                title: e.get("title") as string,
                 status: e.get("status") as string,
                icon: e.get("icon") as File,
                description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "concept",
                href: "concept"
            },
            {
                title: "ویرایش concept",
                href: "concept/edit/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
               ویرایش concept
            </PageTitle>
            <ConceptTab id={id+""} />
            <div>
                <Form submit={submit}  data={data}/>
            </div>
        </Panel>
    </>)
}
