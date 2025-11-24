"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/discount/Form";
import { store } from "@/services/api/admin/discount";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

export default function Page() {
    const router = useRouter();

    const storeDiscount = useMutation({
        mutationKey: [`store-discount`],
        mutationFn: async (formData: any) => {
            return store({ ...formData  });
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message as string);
                router.push("/admin/discount");
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
                title: "افزودن تخفیف جدید",
                href: "discount/create"
            }
        ]} />
        <Panel>
            <PageTitle>
                ایجاد تخفیف جدید
            </PageTitle>
            <div>
                <Form submit={storeDiscount.mutateAsync} loading={storeDiscount.isLoading} />
            </div>

        </Panel>
    </>)
}
