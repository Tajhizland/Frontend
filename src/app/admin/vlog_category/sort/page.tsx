"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList } from "@/shared/SortableList";
import { getList, sortVlogCategory } from "@/services/api/admin/vlogCategory";
import { VlogCategoryResponse } from "@/services/types/vlogCategory";

export default function Page() {
    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "دسته بندی ولاگ", href: "vlog_category" },
                    { title: "سورت دسته بندی ولاگ", href: "vlog_category/sort" },
                ]}
            />
            <Panel>
                <SortableList<VlogCategoryResponse>
                    queryKey={["vlog-category-list"]}
                    queryFn={() => getList()}
                    mutationFn={(vlogs) => sortVlogCategory({ vlogs })}
                    renderItem={(category) => <span className="font-medium">{category.name}</span>}
                />
            </Panel>
        </>
    );
}
