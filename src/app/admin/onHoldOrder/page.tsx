"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/onHoldOrder/TableRow";
import {updateStatus} from "@/services/api/admin/order";
import {onHoldOrderTable} from "@/services/api/admin/onHoldOrder";
import {OnHoldOrderResponse} from "@/services/types/onHoldOrder";
import {toast} from "react-hot-toast";

export default function Page() {

    async function changeStatus(e: OnHoldOrderResponse) {
        let response = await updateStatus({
            id: e.id,
            status: e.status
        })
        toast.success(response?.message as string);
    }

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

            <Table
                onEdit={changeStatus}
                fetcher={onHoldOrderTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
