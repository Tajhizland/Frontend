"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/poster/TableRow";
import {posterTable} from "@/services/api/admin/poster";
import PageLink from "@/shared/PageLink/PageLink";

export default function Page() {
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پوستر ها",
                href: "poster"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت پوستر ها
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/poster/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                fetcher={posterTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
