"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList, SortablePreview } from "@/shared/SortableList";
import { getVideo, sortSampleVideo } from "@/services/api/admin/sample";
import { SampleVideoResponse } from "@/services/types/sampleVideo";

export default function Page() {
    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "پروژه های تجهیز شده", href: "sample" },
                    { title: "ویدیو ها", href: "sample/video" },
                    { title: "سورت ویدیو", href: "" },
                ]}
            />
            <Panel>
                <SortableList<SampleVideoResponse>
                    queryKey={["sample-video"]}
                    queryFn={() => getVideo()}
                    mutationFn={(video) => sortSampleVideo({ video })}
                    layout="grid"
                    renderItem={(item) => (
                        <SortablePreview src={`vlog/${item?.vlog?.poster}`} title={item?.vlog?.title} />
                    )}
                />
            </Panel>
        </>
    );
}
