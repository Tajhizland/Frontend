"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/coupon/Form";
import {find, update} from "@/services/api/admin/coupon";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";

export default function Page() {
    const {id} = useParams();

    const {data: data} = useQuery({
        queryKey: [`coupon_info`, Number(id)],
        queryFn: () => find(Number(id)),
        staleTime: 5000,
    });

    const updateCoupon = useMutation({
        mutationKey: [`update-coupon`],
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
                href: "coupon"
            },
            {
                title: "ویرایش تخفیف",
                href: "coupon/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش تخفیف
            </PageTitle>
            <div>
                {data && <Form submit={updateCoupon.mutateAsync} data={data} loading={updateCoupon.isLoading}/>
                }            </div>

        </Panel>
    </>)
}
