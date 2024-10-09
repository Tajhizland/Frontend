"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/notification/TableRow";

export default function Page() {

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "اعلان ها",
                href: "notification"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت اعلان ها
            </PageTitle>
            <DataTable
                apiUrl={"admin/notification/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
