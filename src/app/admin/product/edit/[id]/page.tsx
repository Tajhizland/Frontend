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
import { IoIosColorPalette, IoMdOptions } from "react-icons/io";
import { FaFile, FaFilter, FaRegImage } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { SiBasicattentiontoken } from "react-icons/si";
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
                status: e.get("status") as string,
                brand_id: "1" as string,
                description: e.get("description") as string,
                meta_description: e.get("meta_description") as string,
                meta_title: e.get("meta_title") as string,
                study: e.get("study") as string,
                categoryId: e.get("category_id") as string, 
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
