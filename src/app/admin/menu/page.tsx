"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/menu/TableRow";
import {fastUpdate, menuTable, removeMenuItem} from "@/services/api/admin/menu";
import {toast} from "react-hot-toast";
import {MenuResponse} from "@/services/types/menu";

export default function Page() {

    const submit = (e: MenuResponse) =>
        fastUpdate(e.id, {title: e.title,
                url: e.url,
                status: e.status,
                parent_id: e.parent_id,
            });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "منو",
                href: "menu"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت منو
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/menu/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                onDelete={(id: any) => removeMenuItem(Number(id))}
                onEdit={submit}
                fetcher={menuTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
