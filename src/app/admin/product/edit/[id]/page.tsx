"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/product/Form";
import { findById, update } from "@/services/api/admin/product";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import ProductTab from "@/components/Tabs/ProductTab";
export default function Page() {
    const [colorCount, setColorCount] = useState(1)
    const { id } = useParams();

    const { data: data } = useQuery({
        queryKey: [`product-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {



        let response = await update(
            {
                id: e.get("id") as string,
                name: e.get("name") as string,
                url: e.get("url") as string,
                status: Number(e.get("status")) ,
                brand_id: Number(e.get("brand_id"))  ,
                description: e.get("description") as string,
                meta_description: e.get("meta_description") as string,
                meta_title: e.get("meta_title") as string,
                study: e.get("study") as string,
                review: e.get("review") as string,
                categoryId: e.get("category_id") as string,
                type: e.get("type") as string,
                guaranty_id: (e.get("guaranty_id"))as string,
                guaranty_time:Number(e.get("guaranty_time"))
            }
        )
        toast.success(response?.message as string)

    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "ویرایش محصول",
                href: "product/edit/" + id
            }
        ]} />
        <Panel>
            <PageTitle>
                ویرایش محصول
            </PageTitle>
            <ProductTab id={id + ""} />

            <div>
                <Form data={data} submit={submit} colorCount={colorCount} setColorCount={setColorCount} />
            </div>
        </Panel>

    </>)
}
