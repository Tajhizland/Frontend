"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/product/Form";
import {findById, update} from "@/services/api/admin/product";
import { useState } from "react";
import { useParams } from "next/navigation";
import {useQuery} from "react-query";
import toast from "react-hot-toast";
import { IoIosColorPalette, IoMdOptions } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { SiBasicattentiontoken } from "react-icons/si";
export default   function Page() {
    const [colorCount,setColorCount]=useState(1)
    const { id } = useParams();

    const { data: data } = useQuery({
        queryKey: [`product-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

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
                href: "product/edit/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش محصول
            </PageTitle>

            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="me-2">
                        <a href="#" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group gap-x-2">
                        <SiBasicattentiontoken  className="w-5 h-5"/>

                            محصول
                        </a>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group gap-x-2" aria-current="page">
                        <IoIosColorPalette  className="w-5 h-5"/>
                        رنگ
                        </a>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group gap-x-2">
                        <FaFilter className="w-5 h-5"/>
                          فیلتر
                        </a>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group gap-x-2">
                        <IoMdOptions className="w-5 h-5"/>
                        ویژگی
                        </a>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group gap-x-2">
                        <MdOutlinePreview className="w-5 h-5"/>
                        بررسی تخصصی
                        </a>
                    </li>
                </ul>
            </div>

            <div>
                <Form data={data} submit={submit} colorCount={colorCount} setColorCount={setColorCount}/>
            </div>
        </Panel>

    </>)
}
