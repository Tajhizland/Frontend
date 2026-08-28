"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuArrowDownUp, LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/vlog_category/TableRow";
 import {update, vlogCategoryTable} from "@/services/api/admin/vlogCategory";
import {toast} from "react-hot-toast";
import {VlogCategoryResponse} from "@/services/types/vlogCategory";


export default function Page() {
    const submit = (e: VlogCategoryResponse) =>
        update(e.id, {name: e.name as string,
                url: e.url as string,
                status: Number(e.status) ,
            });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته بندی ولاگ",
                href: "vlog_category"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دسته بندی ولاگ
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/vlog_category/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
     <ToolbarButton href="/admin/vlog_category/sort" icon={<LuArrowDownUp className="w-4 h-4" />}>سورت کردن</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={vlogCategoryTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
