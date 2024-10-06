"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/brand/TableRow";
import {fastUpdate} from "@/services/api/admin/menu";
import {toast} from "react-hot-toast";
import {MenuResponse} from "@/services/types/menu";

export default function Page() {

    async function submit(e: MenuResponse) {
        let response = await fastUpdate(
            {
                id: e.id,
                title: e.title,
                url: e.url,
                status: e.status,
                parent_id: e.parent_id,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "منو",
                href: "menu"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت منو
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/menu/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/menu/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
