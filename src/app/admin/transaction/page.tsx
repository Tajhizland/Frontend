"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/transaction/TableRow";

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
            <DataTable
                apiUrl={"admin/transaction/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
