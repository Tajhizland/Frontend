"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/coupon/Form";
import { store } from "@/services/api/admin/coupon";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

export default function Page() {
    const router = useRouter();

    const storeCoupon = useMutation({
        mutationKey: [`store-coupon`],
        mutationFn: async (formData: any) => {
            return store({ ...formData  });
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message as string);
                router.push("/admin/coupon");
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
                title: "افزودن تخفیف جدید",
                href: "coupon/create"
            }
        ]} />
        <Panel>
            <PageTitle>
                ایجاد تخفیف جدید
            </PageTitle>
            <div>
                <Form submit={storeCoupon.mutateAsync} loading={storeCoupon.isLoading} />
            </div>

        </Panel>
    </>)
}
