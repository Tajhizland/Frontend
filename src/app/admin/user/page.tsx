"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/user/TableRow";
import {update} from "@/services/api/admin/user";
import {toast} from "react-hot-toast";
import {UserResponse} from "@/services/types/user";

export default function Page() {
    async function submit(e: UserResponse) {
        let response = await update(
            {
                id: e.id,
                name: e.name,
                username: e.username,
                role:e.role
            }
        )
        toast.success(response?.message as string)
    }
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
                onEdit={submit}
                apiUrl={"admin/user/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
