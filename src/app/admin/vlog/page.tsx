"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuArrowDownUp, LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/vlog/TableRow";
 import {update, vlogTable} from "@/services/api/admin/vlog";
import {toast} from "react-hot-toast";
import {VlogResponse} from "@/services/types/vlog";


export default function Page() {
    const submit = (e: VlogResponse) =>
        update(e.id, {title: e.title,
                url: e.url,
                categoryId: e.categoryId,
                status: e.status,
                video: null ,
                poster: null ,
                description:e.description
            });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "ولاگ",
                href: "vlog"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت ولاگ
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/vlog/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>

                <ToolbarButton href="/admin/vlog/sort" icon={<LuArrowDownUp className="w-4 h-4" />}>سورت کردن</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={vlogTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
