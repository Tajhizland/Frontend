"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {GatewayFormValues} from "@/app/admin/gateway/Form";
import {update, findById} from "@/services/api/admin/gateway";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";

export default function Page() {
    const {id} = useParams();

    const {data, isLoading} = useQuery({
        queryKey: [`gateway-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-gateway", Number(id)],
        mutationFn: async (values: GatewayFormValues) => {
            return update({
                id: Number(id),
                name: values.name,
                status: values.status,
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
                    {title: "تنظیمات درگاه پرداخت", href: "gateway"},
                    {title: "ویرایش درگاه پرداخت", href: "gateway/update/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش درگاه پرداخت</PageTitle>
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} />
                    )}
                </div>
            </Panel>
        </>
    );
}
