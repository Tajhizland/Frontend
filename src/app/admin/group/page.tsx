"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/group/TableRow";
import {defineActions} from "@/shared/Table/types";
import {ProductResponse} from "@/services/types/product";
import {groupTable} from "@/services/api/admin/productGroup";

export default function Page() {
    const actions = defineActions<ProductResponse>([
        { label: "محصولات", color: "primary", href: (row) => `group/product/${row.id}` },
        { label: "فیلد ها", color: "primary", href: (row) => `group/field/${row.id}` },
        { label: "مقدار فیلد", color: "primary", href: (row) => `group/field-value/${row.id}` },
    ])
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات گروهی",
                href: "group"
            }
        ]}/>

        <Panel>
            <PageTitle>
                مدیریت محصولات گروهی
            </PageTitle>
            <Table
                fetcher={groupTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
