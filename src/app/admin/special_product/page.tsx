"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuArrowDownUp, LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import { SearchPickerItem, SearchPickerModal } from "@/shared/SearchPicker";
import { columns } from "@/app/admin/special_product/TableRow";
import { remove, specialProductTable, store, updateHomepage } from "@/services/api/admin/specialProduct";
import { search } from "@/services/api/admin/product";
import { ProductResponse } from "@/services/types/product";
import { SpecialProductResponse } from "@/services/types/specialProduct";
import { useState } from "react";

export default function Page() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Breadcrump breadcrumb={[{ title: "تجهیزات خاص", href: "special_product" }]} />
            <Panel>
                <PageTitle>تجهیزات خاص</PageTitle>
                <PageLink>
                    <ToolbarButton onClick={() => setShowModal(true)} icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
                    <ToolbarButton href="/admin/special_product/sort" icon={<LuArrowDownUp className="w-4 h-4" />}>سورت کردن</ToolbarButton>
                </PageLink>

                <SearchPickerModal<ProductResponse>
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    queryKey={["special-product-search"]}
                    placeholder="جستجوی نام محصول"
                    searchFn={(query) => search({ query })}
                    onPick={(item) => store({ product_id: item.id })}
                    itemKey={(item) => item.id}
                    renderItem={(item) => (
                        <SearchPickerItem src={`product/${item.images?.[0]?.url}`} title={item.name} />
                    )}
                />

                <Table
                    onDelete={remove}
                    onEdit={(row: SpecialProductResponse) => updateHomepage(row.id, { homepage: row.homepage })}
                    fetcher={specialProductTable}
                    columns={columns}
                    actions={[]}
                />
            </Panel>
        </>
    );
}
