"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/contact/TableRow";
import {contactTable} from "@/services/api/admin/contact";

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
            <Table
                fetcher={contactTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
