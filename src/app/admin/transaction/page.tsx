"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/transaction/TableRow";
import {transactionTable} from "@/services/api/admin/transaction";

export default function Page() {

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "تراکنش ها",
                href: "transaction"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت تراکنش ها
            </PageTitle>
            <Table
                fetcher={transactionTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
