"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/page/TableRow";
 import {update} from "@/services/api/admin/vlog";
import {toast} from "react-hot-toast";
import {VlogResponse} from "@/services/types/vlog";


export default function Page() {
    async function submit(e: VlogResponse) {
        let response=await update(
            {
                id: e.id,
                title: e.title,
                url: e.url,
                status: e.status,
                video: null ,
                description:e.description
            }
        )
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "ولاگ",
                href: "vlog"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت ولاگ
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/vlog/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/vlog/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
