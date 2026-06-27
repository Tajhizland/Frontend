"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/notification/TableRow";
import {notificationTable} from "@/services/api/admin/notification";

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
            <Table
                fetcher={notificationTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
