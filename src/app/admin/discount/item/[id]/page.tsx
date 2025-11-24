"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/discount/Form";
import {find, update} from "@/services/api/admin/discount";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";

export default function Page() {
    const {id} = useParams(); 

    const {data: data} = useQuery({
        queryKey: [`discount_info`, Number(id)],
        queryFn: () => find(Number(id)),
        staleTime: 5000,
    });

    const updateDiscount = useMutation({
        mutationKey: [`update-discount`],
        mutationFn: async (formData: any) => {
            return update({id: Number(id), ...formData });
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message as string);
            }
        },
    });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "تخفیف",
                href: "discount"
            },
            {
                title: "ویرایش تخفیف",
                href: "discount/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش تخفیف
            </PageTitle>
            <div>
                {data && <Form submit={updateDiscount.mutateAsync} data={data} loading={updateDiscount.isLoading}/>
                }            </div>

        </Panel>
    </>)
}
