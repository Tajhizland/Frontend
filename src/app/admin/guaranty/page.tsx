"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/guaranty/TableRow";
import {update, guarantyTable} from "@/services/api/admin/guaranty";
import {toast} from "react-hot-toast";
import {GuarantyResponse} from "@/services/types/guaranty";


export default function Page() {
    const submit = (e: GuarantyResponse) =>
        update(e.id, {name: e.name,
                free:e.free,
                url: e.url,
                status: e.status,
                description: e.description,
            });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "گارانتی",
                href: "guaranty"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت گارانتی
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/guaranty/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={guarantyTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
