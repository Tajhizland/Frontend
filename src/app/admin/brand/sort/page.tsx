"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList } from "@/shared/SortableList";
import { brandList, sortBrands } from "@/services/api/admin/brand";
import { BrandResponse } from "@/services/types/brand";

export default function Page() {
    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "برند", href: "brand" },
                    { title: "سورت برند", href: "brand/sort" },
                ]}
            />
            <Panel>
                <SortableList<BrandResponse>
                    queryKey={["brand-list"]}
                    queryFn={async () => (await brandList())?.data}
                    mutationFn={(brand) => sortBrands({ brand })}
                    renderItem={(brand) => <span className="font-medium">{brand.name}</span>}
                />
            </Panel>
        </>
    );
}
