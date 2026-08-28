"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/onHoldOrder/TableRow";
import {onHoldOrderTable} from "@/services/api/admin/onHoldOrder";

export default function Page() {
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "سفارشات معلق",
                href: "onHoldOrder"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت سفارشات معلق
            </PageTitle>

            {/* وضعیت درخواست فقط از صفحه‌ی مشاهده (تایید/رد) تغییر می‌کند، نه با ویرایش سریع. */}
            <Table
                fetcher={onHoldOrderTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
