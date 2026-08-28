"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/category/TableRow";
import {categoryTable, update} from "@/services/api/admin/category";
import {toast} from "react-hot-toast";
import {CategoryResponse} from "@/services/types/category";


export default function Page() {

    const submit = (e: CategoryResponse) =>
        update(e.id, {name: e.name,
                url: e.url,
                status: e.status,
                image: null ,
                description: e.description,
                parent_id:e.parent_id,
                type:e.type
            });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته‌بندی",
                href: "category"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دسته‌بندی
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/category/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={categoryTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
