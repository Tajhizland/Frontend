"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import CategoryTab from "@/components/Tabs/CategoryTab";
import { SortableList } from "@/shared/SortableList";
import { getOptionItemByOption, sortOptionItem } from "@/services/api/admin/option";
import { OptionItemsResponse } from "@/services/types/optionItem";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();
    const optionId = Number(id);

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "دسته بندی", href: "category" },
                    { title: "ویرایش دسته بندی", href: `category/edit/${id}` },
                    { title: "ویرایش ویژگی ها", href: `category/option/${id}` },
                    { title: "سورت", href: `category/option/item/sort/${id}` },
                ]}
            />
            <Panel>
                <CategoryTab id={String(id)} />
                <SortableList<OptionItemsResponse>
                    queryKey={["option-items", optionId]}
                    queryFn={() => getOptionItemByOption(optionId)}
                    mutationFn={(optionItem) => sortOptionItem({ optionItem })}
                    renderItem={(item) => <span className="font-medium">{item.title}</span>}
                />
            </Panel>
        </>
    );
}
