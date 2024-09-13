"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import CategoryTab from "@/components/CategoryTabs/CategoryTab";
import Panel from "@/shared/Panel/Panel";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();

    return (<>
       <Breadcrump breadcrumb={[
            {
                title: "دسته بندی",
                href: "category"
            },
            {
                title: "ویرایش دسته بندی",
                href: "category/edit/"+id
            },
            {
                title: "ویرایش ویژگی دسته بندی  ",
                href: "category/option/"+id
            }
        ]}/>
        <Panel>
         <CategoryTab id={id+""} />
        
        </Panel>

    </>)
} 