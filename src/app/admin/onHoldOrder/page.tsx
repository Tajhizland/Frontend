"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/onHoldOrder/TableRow";
import {updateStatus} from "@/services/api/admin/order";
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

            <DataTable
                onEdit={changeStatus}
                apiUrl={"admin/onHoldOrder/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
