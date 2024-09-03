"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Input from "@/shared/Input/Input";
import Label from "@/components/Label/Label";
import Button from "@/shared/Button/Button";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonThird from "@/shared/Button/ButtonThird";
import Select from "@/shared/Select/Select";
import {Options} from "sucrase/dist/types/Options-gen-types";
import toast from "react-hot-toast";
import {useState} from "react";
import {set} from "immutable";
import Form from "@/app/admin/product/Form";
import {store} from "@/services/api/admin/product";

export default function page() {
    async function submit(e: FormData) {

        const colors = [];
        for (let i = 0; i < 1; i++) {
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

        let response=await store(
            {
                name: e.get("name") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                brand_id: e.get("brand_id") as string,
                description: e.get("description") as string,
                meta_description: e.get("meta_description") as string,
                meta_title: e.get("meta_title") as string,
                study: e.get("study") as string,
                categoryId: e.get("category_id") as string,
                colors: colors
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
                title: "افزودن محصول جدید",
                href: "product/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد محصول جدید
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>

    </>)
}
