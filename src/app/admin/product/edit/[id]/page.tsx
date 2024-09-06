"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle"; 
import toast from "react-hot-toast"; 
import Form from "@/app/admin/product/Form";
import {getById, store, update} from "@/services/api/admin/product";
import { useState } from "react";
import { useParams } from "next/navigation";

export default async function page() {
    const [colorCount,setColorCount]=useState(1)
    const { id } = useParams();
    
    const product=await getById(Number(id))
     
    async function submit(e: FormData) {

        const colors = [];
        for (let i = 0; i < colorCount; i++) {
            const colorData = {
                name: e.get(`color[${i}][name]`)as string,
                code: e.get(`color[${i}][code]`)as string,
                delivery_delay: e.get(`color[${i}][delivery_delay]`)as string,
                status: e.get(`color[${i}][status]`)as string,
                price: e.get(`color[${i}][price]`)as string,
                discount: e.get(`color[${i}][discount]`)as string,
                stock: e.get(`color[${i}][stock]`)as string,
            };
            colors.push(colorData);
        }

        let response=await update(
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
                category_id: e.get("category_id") as string,
                color: colors
            }
        ) 
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "ویرایش محصول",
                href: "product/edit/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد محصول جدید
            </PageTitle>
            <div>
                <Form productData={product} submit={submit} colorCount={colorCount} setColorCount={setColorCount}/>
            </div>
        </Panel>

    </>)
}
