"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/page/TableRow";
 import {update} from "@/services/api/admin/page";
import {toast} from "react-hot-toast";
import {PageResponse} from "@/services/types/page";


export default function Page() {
    async function submit(e: PageResponse) {
        let response=await update(
            {
                id: e.id,
                title: e.title,
                url: e.url,
                status: e.status,
                image: null ,
                content: e.content,
            }
        )
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "صفحه",
                href: "page"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت صفحه
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/page/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/page/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
