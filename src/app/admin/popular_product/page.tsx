"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import { SearchPickerItem, SearchPickerModal } from "@/shared/SearchPicker";
import { columns } from "@/app/admin/popular_product/TableRow";
import { popularProductTable, remove, store } from "@/services/api/admin/popularProduct";
import { search } from "@/services/api/admin/product";
import { ProductResponse } from "@/services/types/product";
import { useState } from "react";

export default function Page() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Breadcrump breadcrumb={[{ title: "محصولات پر تخفیف", href: "popular_product" }]} />
            <Panel>
                <PageTitle>محصولات پر تخفیف</PageTitle>
                <PageLink>
                    <ToolbarButton onClick={() => setShowModal(true)} icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
                </PageLink>

                <SearchPickerModal<ProductResponse>
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    queryKey={["popular-product-search"]}
                    placeholder="جستجوی نام محصول"
                    searchFn={(query) => search({ query })}
                    onPick={(item) => store({ product_id: item.id })}
                    itemKey={(item) => item.id}
                    renderItem={(item) => (
                        <SearchPickerItem src={`product/${item.images?.[0]?.url}`} title={item.name} />
                    )}
                />

                <Table onDelete={remove} fetcher={popularProductTable} columns={columns} actions={[]} />
            </Panel>
        </>
    );
}
