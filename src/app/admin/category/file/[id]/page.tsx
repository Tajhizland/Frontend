"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import FileManager from "@/shared/FileManager/FileManager";
import CategoryTab from "@/components/Tabs/CategoryTab";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "دسته بندی", href: "category" },
                    { title: "ویرایش دسته بندی", href: `category/edit/${id}` },
                    { title: "ویرایش فایل دسته بندی", href: `category/file/${id}` },
                ]}
            />
            <Panel>
                <CategoryTab id={String(id)} />
                <FileManager modelId={Number(id)} modelType="category" showPath="name" />
            </Panel>
        </>
    );
}
