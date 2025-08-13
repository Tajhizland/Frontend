"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import toast from "react-hot-toast";
import Form from "@/app/admin/product/Form";
import {store, update} from "@/services/api/admin/product";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useMutation} from "react-query";

export default function Page() {
    const [colorCount, setColorCount] = useState(1)
    const router = useRouter();

    const mutation = useMutation({
        mutationKey: [`store-product`],
        mutationFn: async (formData: any) => {
            return store({
                ...formData,
            });
        },
        onSuccess: (data) => {
            toast.success(data?.message ?? "")
            router.push("/admin/product");
        },
    });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "افزودن محصول جدید",
                href: "product/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد محصول جدید
            </PageTitle>
            <div>
                <Form submit={mutation.mutateAsync} colorCount={colorCount} setColorCount={setColorCount}/>
            </div>
        </Panel>

    </>)
}
