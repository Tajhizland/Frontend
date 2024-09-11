"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ProductTab from "@/components/ProductTabs/ProductTab";
import Panel from "@/shared/Panel/Panel";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();

    return (<>
       <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "ویرایش محصول",
                href: "product/edit/"+id
            },
            {
                title: "ویرایش رنگ محصول",
                href: "product/color/"+id
            }
        ]}/>
        <Panel>
         <ProductTab id={id+""} />
        
        </Panel>

    </>)
} 