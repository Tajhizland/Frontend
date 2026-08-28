"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/delivery/TableRow";
 import {update, deliveryTable} from "@/services/api/admin/delivery";
import {toast} from "react-hot-toast";
import {DeliveryResponse} from "@/services/types/delivery";


export default function Page() {
    const submit = (e: DeliveryResponse) =>
        update(e.id, {name: e.name,
                status: e.status,
                description: e.description,
                logo: null,
                price: e.price
            });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "تنظیمات روش ارسال",
                href: "delivery"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت روش ارسال
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/delivery/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={deliveryTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
