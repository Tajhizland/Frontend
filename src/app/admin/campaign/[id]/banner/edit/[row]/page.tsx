"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/campaign/[id]/banner/Form";
import {update, findById} from "@/services/api/admin/campaignBanner";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {QueryClient, useMutation, useQuery} from "react-query";

export default function Page() {
    const queryClient = new QueryClient();
    const {id, row} = useParams();
    const {data: data} = useQuery({
        queryKey: [`campaign-banner-info`, Number(id)],
        queryFn: () => findById(Number(row)),
        staleTime: 5000,
    });

    const updateMutation = useMutation({
        mutationKey: [`campaign-banner-update`],
        mutationFn: async (formData: any) => {
            return update({
                id: Number(row),
                ...formData,
            });
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries([`campaign-banner-info`, Number(row)]);
            toast.success(response?.message as string)
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
                title: "ویرایش بنر",
                href: "campaign/" + id + "/banner/edit/" + row
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش بنر
            </PageTitle>
            <div>
                <Form data={data} submit={updateMutation.mutateAsync} isLoading={updateMutation.isLoading}/>
            </div>
        </Panel>

    </>)
}
