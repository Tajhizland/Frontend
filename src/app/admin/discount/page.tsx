"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/discount/TableRow";
import {update, discountTable} from "@/services/api/admin/discount";
import {toast} from "react-hot-toast";
import {DiscountResponse} from "@/services/types/discount";


export default function Page() {
    const submit = (e: DiscountResponse) =>
        update(e.id, {title: e.title,
                status: e.status,
                start_date: e.start_date,
                end_date: e.end_date,
            });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "مدیریت تخفیفات",
                href: "discount"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت تخفیفات
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/discount/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={discountTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
