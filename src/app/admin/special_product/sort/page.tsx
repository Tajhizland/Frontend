"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList } from "@/shared/SortableList";
import { list, sort } from "@/services/api/admin/specialProduct";
import { ProductResponse } from "@/services/types/product";

export default function Page() {
    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "محصولات ویژه", href: "special_product" },
                    { title: "سورت محصولات ویژه", href: "special_product/sort" },
                ]}
            />
            <Panel>
                <SortableList<ProductResponse>
                    queryKey={["special-product-list"]}
                    queryFn={async () => (await list())?.data}
                    mutationFn={(special) => sort({ special })}
                    renderItem={(product) => <span className="font-medium">{product.name}</span>}
                />
            </Panel>
        </>
    );
}
