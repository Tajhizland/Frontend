"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/landing/Form";
import { findLandingById, updateLanding} from "@/services/api/admin/landing";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import LandingTab from "@/components/Tabs/LandingTab";

export default   function Page() {
    const {id} = useParams();

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`landing_info`],
        queryFn: () => findLandingById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {

        let response = await updateLanding(
            {
                id: Number(id),
                title: e.get("title") as string,
                status: e.get("status") as string,
                url: e.get("url") as string,
                description: e.get("description") as string,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "لندینگ",
                href: "landing"
            },
            {
                title: "ویرایش لندینگ",
                href: "landing/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش لندینگ
            </PageTitle>
            <LandingTab id={id + ""}/>
            <div>
                <Form submit={submit} data={data}/>
            </div>
        </Panel>
    </>)
}
