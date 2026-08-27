"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import FileManager from "@/shared/FileManager/FileManager";
import LandingTab from "@/components/Tabs/LandingTab";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "لندینگ", href: "landing" },
                    { title: "ویرایش لندینگ", href: `landing/edit/${id}` },
                    { title: "ویرایش فایل", href: `landing/file/${id}` },
                ]}
            />
            <Panel>
                <LandingTab id={String(id)} />
                <FileManager modelId={Number(id)} modelType="landing" showPath="name" />
            </Panel>
        </>
    );
}
