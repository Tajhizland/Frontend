"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/delivery/TableRow";
 import {update} from "@/services/api/admin/delivery";
import {toast} from "react-hot-toast";
import {DeliveryResponse} from "@/services/types/delivery";


export default function Page() {
    async function submit(e: DeliveryResponse) {
        let response = await update(
            {
                id: e.id,
                name: e.name,
                status: e.status,
                description: e.description,
                logo: null,
                price: e.price
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "تنظیمات روش ارسال",
                href: "delivery"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت روش ارسال
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/delivery/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/delivery/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
