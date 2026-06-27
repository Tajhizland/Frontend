"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/comment/TableRow";
import {commentTable} from "@/services/api/admin/comment";

export default function Page() {

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "کامنت ها",
                href: "comment"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت کامنت ها
            </PageTitle>
            <Table
                fetcher={commentTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
