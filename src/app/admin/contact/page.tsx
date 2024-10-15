"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/comment/TableRow";

export default function Page() {

    return (<>
        <Breadcrump breadcrumb={[
             {
                title: "پیام ها",
                href: "contact"
            },
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت کامنت ها
            </PageTitle>
            <DataTable
                apiUrl={"admin/contact/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
