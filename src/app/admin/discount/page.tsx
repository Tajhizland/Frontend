"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/discount/TableRow";
import {update} from "@/services/api/admin/discount";
import {toast} from "react-hot-toast";
import {DiscountResponse} from "@/services/types/discount";


export default function Page() {
    async function submit(e: DiscountResponse) {
        let response = await update(
            {
                id: e.id,
                title: e.title,
                status: e.status,
                start_date: e.start_date,
                end_date: e.end_date,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "مدیریت تخفیفات",
                href: "discount"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت تخفیفات
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/discount/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/discount/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
