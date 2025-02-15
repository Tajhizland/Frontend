"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import toast from "react-hot-toast";
import Form from "@/app/admin/product/Form";
import {store} from "@/services/api/admin/product";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    const [colorCount, setColorCount] = useState(1)

    const router = useRouter();

    async function submit(e: FormData) {
        let response = await store(
            {
                name: e.get("name") as string,
                url: e.get("url") as string,
                status: Number(e.get("status")),
                brand_id: Number(e.get("brand_id"))  ,
                description: e.get("description") as string,
                meta_description: e.get("meta_description") as string,
                meta_title: e.get("meta_title") as string,
                study: e.get("study") as string,
                categoryId: e.get("category_id") as string,
                guaranty_id: e.get("guaranty_id")as string,
                review: e.get("review")as string,
                guaranty_time: Number(e.get("guaranty_time")),
            }
        )
        toast.success(response?.message as string)
        router.push("/admin/product");
    }

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
                <Form submit={submit} colorCount={colorCount} setColorCount={setColorCount}/>
            </div>
        </Panel>

    </>)
}
