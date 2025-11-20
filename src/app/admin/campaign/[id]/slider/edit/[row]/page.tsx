"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/campaign/[id]/slider/Form";
import {update, findById} from "@/services/api/admin/campaignSlider";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {QueryClient, useMutation, useQuery} from "react-query";

export default function Page() {
    const queryClient = new QueryClient();
    const {row, id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`campaign-slider-info`, Number(row)],
        queryFn: () => findById(Number(row)),
        staleTime: 5000,
    });


    const updateMutation = useMutation({
        mutationKey: [`campaign-slider-update`],
        mutationFn: async (formData: any) => {
            return update({
                id: Number(row),
                ...formData,
            });
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries([`campaign-slider-info`, Number(row)]);
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
                title: "اسلایدر ها",
                href: "campaign/" + id + "/slider"
            },
            {
                title: "ویرایش اسلایدر",
                href: "campaign/" + id + "/slider" + row
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش اسلایدر
            </PageTitle>
            <div>
                <Form data={data} submit={updateMutation.mutateAsync} isLoading={updateMutation.isLoading}/>
            </div>
        </Panel>

    </>)
}
