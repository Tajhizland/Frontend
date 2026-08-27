"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import FileManager from "@/shared/FileManager/FileManager";
import NewsTab from "@/components/Tabs/NewsTab";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "بلاگ", href: "news" },
                    { title: "ویرایش بلاگ", href: `news/edit/${id}` },
                    { title: "مدیریت فایل", href: `news/file/${id}` },
                ]}
            />
            <Panel>
                <NewsTab id={String(id)} />
                <FileManager modelId={Number(id)} modelType="news" showPath="url" />
            </Panel>
        </>
    );
}
