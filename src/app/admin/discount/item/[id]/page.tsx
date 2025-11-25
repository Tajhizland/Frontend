"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {find, getItem, update} from "@/services/api/admin/discount";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();

    const {data: data} = useQuery({
        queryKey: [`discount_item_info`, Number(id)],
        queryFn: () => getItem(Number(id)),
        staleTime: 5000,
    });

    const setDiscountItem = useMutation({
        mutationKey: [`set-discount-item`],
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

            </div>

        </Panel>
    </>)
}
