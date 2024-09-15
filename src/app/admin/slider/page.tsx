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
                title: "اسلایدر ها",
                href: "slider"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت اسلایدر ها
            </PageTitle>
            <DataTable
                apiUrl={"admin/slider/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
