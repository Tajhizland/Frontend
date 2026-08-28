"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/cast/TableRow";
import {castTable} from "@/services/api/admin/cast";

export default function Page() {


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "cast",
                href: "cast"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت cast
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/cast/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                fetcher={castTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
