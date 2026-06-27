"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {LandingFormValues} from "@/app/admin/landing/Form";
import {findLandingById, updateLanding} from "@/services/api/admin/landing";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import LandingTab from "@/components/Tabs/LandingTab";

export default function Page() {
    const {id} = useParams();

    const {data, isLoading} = useQuery({
        queryKey: [`landing_info`, Number(id)],
        queryFn: () => findLandingById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-landing", Number(id)],
        mutationFn: async (values: LandingFormValues) => {
            return updateLanding({
                id: Number(id),
                title: values.title,
                status: values.status,
                url: values.url,
                description: values.description,
            });
        },
        onSuccess: (response) => {
            if (response.success) toast.success(response.message as string);
        },
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "لندینگ", href: "landing"},
                    {title: "ویرایش لندینگ", href: "landing/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش لندینگ</PageTitle>
                <LandingTab id={id + ""} />
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} />
                    )}
                </div>
            </Panel>
        </>
    );
}
