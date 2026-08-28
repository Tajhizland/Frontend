"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import { SearchPickerItem, SearchPickerModal } from "@/shared/SearchPicker";
import { columns } from "@/app/admin/popular_category/TableRow";
import { popularCategoryTable, remove, store } from "@/services/api/admin/popularCategory";
import { search } from "@/services/api/admin/category";
import { CategoryResponse } from "@/services/types/category";
import { useState } from "react";

export default function Page() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Breadcrump breadcrumb={[{ title: "دسته بندی های پرطرفدار", href: "popular_category" }]} />
            <Panel>
                <PageTitle>دسته بندی های پرطرفدار</PageTitle>
                <PageLink>
                    <ToolbarButton onClick={() => setShowModal(true)} icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
                </PageLink>

                <SearchPickerModal<CategoryResponse>
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    queryKey={["popular-category-search"]}
                    placeholder="جستجوی نام دسته بندی"
                    searchFn={(query) => search({ query })}
                    onPick={(item) => store({ category_id: item.id })}
                    itemKey={(item) => item.id}
                    renderItem={(item) => <SearchPickerItem src={`category/${item.image}`} title={item.name} />}
                />

                <Table onDelete={remove} fetcher={popularCategoryTable} columns={columns} actions={[]} />
            </Panel>
        </>
    );
}
