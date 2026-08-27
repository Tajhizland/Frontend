"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import FileManager from "@/shared/FileManager/FileManager";
import PageTab from "@/components/Tabs/PageTab";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "صفحه", href: "page" },
                    { title: "ویرایش صفحه", href: `page/edit/${id}` },
                    { title: "مدیریت فایل", href: `page/file/${id}` },
                ]}
            />
            <Panel>
                <PageTab id={String(id)} />
                <FileManager modelId={Number(id)} modelType="page" showPath="url" />
            </Panel>
        </>
    );
}
