"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import CategoryTab from "@/components/Tabs/CategoryTab";
import { SortableList } from "@/shared/SortableList";
import { findByCategoryId, sortFilter } from "@/services/api/admin/filter";
import { useParams } from "next/navigation";

type SortableFilter = { id: number; name: string; itemCount: number };

export default function Page() {
    const { id } = useParams();
    const categoryId = Number(id);

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "دسته بندی", href: "category" },
                    { title: "ویرایش دسته بندی", href: `category/edit/${id}` },
                    { title: "ویرایش فیلترها", href: `category/filter/${id}` },
                    { title: "سورت", href: `category/filter/sort/${id}` },
                ]}
            />
            <Panel>
                <CategoryTab id={String(id)} />
                <SortableList<SortableFilter>
                    queryKey={["category-filters", categoryId]}
                    queryFn={async () =>
                        (await findByCategoryId(categoryId))?.map((filter) => ({
                            id: Number(filter.id),
                            name: filter.name,
                            itemCount: filter.items?.length ?? 0,
                        }))
                    }
                    mutationFn={(filter) => sortFilter({ filter })}
                    emptyText="فیلتری برای این دسته بندی ثبت نشده است"
                    renderItem={(filter) => (
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{filter.name}</span>
                            <span className="text-xs text-slate-400">({filter.itemCount} آیتم)</span>
                        </div>
                    )}
                />
            </Panel>
        </>
    );
}
