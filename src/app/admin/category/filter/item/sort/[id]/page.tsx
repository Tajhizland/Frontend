"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList } from "@/shared/SortableList";
import { getFilterItemByFilter, sortFilterItem } from "@/services/api/admin/filter";
import { FilterItemResponse } from "@/services/types/filterItem";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();
    const filterId = Number(id);

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "دسته بندی", href: "category" },
                    { title: "سورت آیتم های فیلتر", href: `category/filter/item/sort/${id}` },
                ]}
            />
            <Panel>
                <SortableList<FilterItemResponse>
                    queryKey={["filter-items", filterId]}
                    queryFn={() => getFilterItemByFilter(filterId)}
                    mutationFn={(filterItem) => sortFilterItem({ filterItem })}
                    emptyText="آیتمی برای این فیلتر ثبت نشده است"
                    renderItem={(item) => <span className="font-medium">{item.value}</span>}
                />
            </Panel>
        </>
    );
}
