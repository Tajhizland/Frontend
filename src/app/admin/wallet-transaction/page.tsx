"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {  columns} from "@/app/admin/wallet-transaction/TableRow";
import {walletTransactionTable} from "@/services/api/admin/walletTransaction";
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
            <Table
                fetcher={walletTransactionTable}
                columns={columns}
                actions={[]}
            />
        </Panel>
    </>)
}
