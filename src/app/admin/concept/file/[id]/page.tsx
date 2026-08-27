"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import FileManager from "@/shared/FileManager/FileManager";
import ConceptTab from "@/components/Tabs/ConceptTab";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "concept", href: "concept" },
                    { title: "ویرایش concept", href: `concept/edit/${id}` },
                    { title: "ویرایش فایل", href: `concept/file/${id}` },
                ]}
            />
            <Panel>
                <ConceptTab id={String(id)} />
                <FileManager modelId={Number(id)} modelType="concept" showPath="name" />
            </Panel>
        </>
    );
}
