"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList, SortablePreview } from "@/shared/SortableList";
import { sortVlog, vlogList } from "@/services/api/admin/vlog";
import { VlogResponse } from "@/services/types/vlog";

export default function Page() {
    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "ولاگ", href: "vlog" },
                    { title: "سورت ولاگ", href: "vlog/sort" },
                ]}
            />
            <Panel>
                <SortableList<VlogResponse>
                    queryKey={["vlog-list"]}
                    queryFn={async () => (await vlogList())?.data}
                    mutationFn={(vlog) => sortVlog({ vlog })}
                    renderItem={(vlog) => <SortablePreview src={`vlog/${vlog.poster}`} title={vlog.title} />}
                />
            </Panel>
        </>
    );
}
