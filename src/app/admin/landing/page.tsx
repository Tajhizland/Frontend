"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/landing/TableRow";
 import { toast } from "react-hot-toast";
import {landingTable, updateLanding} from "@/services/api/admin/landing";
import {LandingResponse} from "@/services/types/landing";

export default function Page() {

    const submit = (e: LandingResponse) =>
        updateLanding(e.id, {title: e.title,
                status: e.status,
                url: e.url,
                description:e.description
            });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "لندینگ",
                href: "landing"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت لندینگ
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/landing/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
            onEdit={submit}
                fetcher={landingTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
