"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/campaign/[id]/banner/Form";
import {store} from "@/services/api/admin/campaignBanner";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import {useMutation} from "react-query";

export default function Page() {
    const router = useRouter();
    const {id} = useParams();

    const createMutation = useMutation({
        mutationKey: [`campaign-banner-create`],
        mutationFn: async (formData: any) => {
            return store({
                campaign_id: Number(id),
                ...formData,
            });
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response?.message as string)
                router.push("/admin/campaign/" + id + "/banner");
            }
        },
    });


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "جشنواره",
                href: "campaign"
            },
            {
                title: "بنر ها",
                href: "campaign/" + id + "/banner"
            }, {
                title: "افزودن بنر",
                href: "campaign/" + id + "/banner/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن بنر
            </PageTitle>
            <div>
                <Form submit={createMutation.mutateAsync} isLoading={createMutation.isLoading}/>
            </div>
        </Panel>
    </>)
}
