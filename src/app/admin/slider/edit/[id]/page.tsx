"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {SliderFormValues} from "@/app/admin/slider/Form";
import {update, findById} from "@/services/api/admin/slider";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();
    const [progress, setProgress] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: [`slider-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-slider", Number(id)],
        mutationFn: async (values: SliderFormValues) => {
            return update({
                id: Number(id),
                title: values.title,
                url: values.url,
                status: values.status,
                type: values.type,
                image: values.image ?? null,
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
                    {title: "اسلایدر", href: "slider"},
                    {title: "ویرایش اسلایدر", href: "slider/update/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش اسلایدر</PageTitle>
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} progress={progress} />
                    )}
                </div>
            </Panel>
        </>
    );
}
