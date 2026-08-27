"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import FileManager from "@/shared/FileManager/FileManager";
import BrandTab from "@/components/Tabs/BrandTab";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "برند", href: "brand" },
                    { title: "ویرایش برند", href: `brand/edit/${id}` },
                    { title: "مدیریت فایل", href: `brand/file/${id}` },
                ]}
            />
            <Panel>
                <BrandTab id={String(id)} />
                <FileManager modelId={Number(id)} modelType="brand" showPath="name" />
            </Panel>
        </>
    );
}
