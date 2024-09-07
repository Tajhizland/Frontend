"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/user/TableRow";

export default function Page() {

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "کاربران",
                href: "user"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت کاربران
            </PageTitle>
            <DataTable
                apiUrl={"admin/user/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
