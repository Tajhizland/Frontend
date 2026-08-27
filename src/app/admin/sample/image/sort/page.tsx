"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList, SortablePreview } from "@/shared/SortableList";
import { getImages, sortSampleImage } from "@/services/api/admin/sample";
import { SampleImageResponse } from "@/services/types/sampleImage";

export default function Page() {
    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "پروژه های تجهیز شده", href: "sample" },
                    { title: "تصاویر", href: "sample/image" },
                    { title: "سورت تصاویر", href: "" },
                ]}
            />
            <Panel>
                <SortableList<SampleImageResponse>
                    queryKey={["sample-image"]}
                    queryFn={() => getImages()}
                    mutationFn={(image) => sortSampleImage({ image })}
                    layout="grid"
                    renderItem={(item) => <SortablePreview src={`sample/${item.image}`} />}
                />
            </Panel>
        </>
    );
}
