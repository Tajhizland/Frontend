"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/campaign/[id]/slider/Form";
import {store} from "@/services/api/admin/campaignSlider";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import {useMutation} from "react-query";

export default function Page() {
    const router = useRouter();
    const {id} = useParams();
    const updateMutation = useMutation({
        mutationKey: [`campaign-slider-update`],
        mutationFn: async (formData: any) => {
            return store({
                campaign_id: Number(id),
                ...formData,
            });
        },
        onSuccess: (response) => {
            toast.success(response?.message as string)
            router.push("/admin/campaign/" + id + "/slider");
        },
    });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "جشنواره",
                href: "campaign"
            },
            {
                title: "اسلایدر ها",
                href: "campaign/" + id + "/slider"
            },
            {
                title: "افزودن اسلایدر",
                href: "campaign/" + id + "/slider/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن اسلایدر
            </PageTitle>
            <div>
                <Form submit={updateMutation.mutateAsync} isLoading={updateMutation.isLoading}/>
            </div>
        </Panel>
    </>)
}
