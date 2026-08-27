"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import CategoryTab from "@/components/Tabs/CategoryTab";
import { SortableList } from "@/shared/SortableList";
import { findByCategoryId, sortOption } from "@/services/api/admin/option";
import { OptionItemsResponse } from "@/services/types/optionItem";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();
    const categoryId = Number(id);

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "دسته بندی", href: "category" },
                    { title: "ویرایش دسته بندی", href: `category/edit/${id}` },
                    { title: "ویرایش ویژگی ها", href: `category/option/${id}` },
                    { title: "سورت", href: `category/option/sort/${id}` },
                ]}
            />
            <Panel>
                <CategoryTab id={String(id)} />
                <SortableList<OptionItemsResponse>
                    queryKey={["category-options", categoryId]}
                    queryFn={() => findByCategoryId(categoryId)}
                    mutationFn={(option) => sortOption({ option })}
                    renderItem={(option) => <span className="font-medium">{option.title}</span>}
                />
            </Panel>
        </>
    );
}
