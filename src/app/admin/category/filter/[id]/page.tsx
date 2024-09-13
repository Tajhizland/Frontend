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
                title: "ویرایش فیلتر دسته بندی  ",
                href: "category/color/"+id
            }
        ]}/>
        <Panel>
         <CategoryTab id={id+""} />
        
        </Panel>

    </>)
} 