"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {DeliveryFormValues} from "@/app/admin/delivery/Form";
import {update, findById} from "@/services/api/admin/delivery";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();
    const [progress, setProgress] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: [`delivery-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-delivery", Number(id)],
        mutationFn: async (values: DeliveryFormValues) => {
            return update({
                id: Number(id),
                name: values.name,
                description: values.description,
                status: values.status,
                price: values.price,
                logo: values.logo ?? null,
                setProgress,
            });
        },
        onSuccess: (response) => {
            if (response.success) toast.success(response.message as string);
        },
        onSettled: () => setProgress(0),
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "تنظیمات سرویس ارسال", href: "delivery"},
                    {title: "ویرایش سرویس ارسال", href: "delivery/update/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش سرویس ارسال</PageTitle>
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} />
                    )}
                </div>
            </Panel>
        </>
    );
}
