"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {  columns} from "@/app/admin/wallet-transaction/TableRow";
export default function Page() {


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "تراکنش های کیف پول",
                href: "wallet-transaction"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت تراکنش های کیف پول
            </PageTitle>
            <DataTable
                apiUrl={"admin/wallet-transaction/dataTable"}
                columns={columns}
                buttons={[]}
            />
        </Panel>
    </>)
}
