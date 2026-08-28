"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/trusted-brand/TableRow";
import PageLink from "@/shared/PageLink/PageLink";
import {toast} from "react-hot-toast";
import {deleteTrustedBrand, trustedBrandTable} from "@/services/api/admin/trustedBrand";

export default function Page() {
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "برند های تجهیز شده",
                href: "trusted-brand"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت برند های تجهیز شده
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/trusted-brand/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                fetcher={trustedBrandTable}
                columns={columns}
                actions={actions}
                onDelete={deleteTrustedBrand}
            />
        </Panel>
    </>)
}
