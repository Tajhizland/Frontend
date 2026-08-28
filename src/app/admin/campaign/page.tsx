"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/campaign/TableRow";
import {campaignTable} from "@/services/api/admin/campaign";

export default function Page() {


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "جشنواره",
                href: "campaign"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت جشنواره
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/campaign/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                fetcher={campaignTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
