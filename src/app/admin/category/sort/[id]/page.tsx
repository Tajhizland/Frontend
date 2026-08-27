"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import CategoryTab from "@/components/Tabs/CategoryTab";
import { SortableList } from "@/shared/SortableList";
import { productOfCategory, sort } from "@/services/api/admin/category";
import { ProductResponse } from "@/services/types/product";
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
                    { title: "سورت", href: `category/sort/${id}` },
                ]}
            />
            <Panel>
                <CategoryTab id={String(id)} />
                <SortableList<ProductResponse>
                    queryKey={["category-products", categoryId]}
                    queryFn={() => productOfCategory(categoryId)}
                    mutationFn={(product) => sort({ product })}
                    renderItem={(product) => <span className="font-medium">{product.name}</span>}
                />
            </Panel>
        </>
    );
}
