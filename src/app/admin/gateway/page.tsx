"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/gateway/TableRow";
import {DeliveryResponse} from "@/services/types/delivery";
import {update, gatewayTable} from "@/services/api/admin/gateway";
import {toast} from "react-hot-toast";
import {GatewayResponse} from "@/services/types/gateway";


export default function Page() {
    const submit = (e: GatewayResponse) =>
        update(e.id, {name: e.name,
                status: e.status,
                description: e.description,
            });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "تنظیمات درگاه پرداخت",
                href: "gateway"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت  درگاه پرداخت
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/gateway/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={gatewayTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
