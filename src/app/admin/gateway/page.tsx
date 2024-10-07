"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/gateway/TableRow";
import {DeliveryResponse} from "@/services/types/delivery";
import {update} from "@/services/api/admin/gateway";
import {toast} from "react-hot-toast";
import {GatewayResponse} from "@/services/types/gateway";


export default function Page() {
    async function submit(e: GatewayResponse) {
        let response = await update(
            {
                id: e.id,
                name: e.name,
                status: e.status,
                description: e.description,
            }
        )
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "تنظیمات درگاه پرداخت",
                href: "gateway"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت  درگاه پرداخت
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/gateway/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/gateway/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
