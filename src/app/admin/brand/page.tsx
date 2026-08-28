"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuArrowDownUp, LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/brand/TableRow";
import { brandTable, update } from "@/services/api/admin/brand";
import { toast } from "react-hot-toast";
import {BrandResponse} from "@/services/types/brand";

export default function Page() {

    const submit = (e: BrandResponse) =>
        update(e.id, {name: e.name,
                url: e.url,
                status: e.status,
                image: null,
                banner: null,
                description: e.description,
            });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "برند",
                href: "brand"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت برند
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/brand/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
                <ToolbarButton href="/admin/brand/sort" icon={<LuArrowDownUp className="w-4 h-4" />}>سورت کردن</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={brandTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
