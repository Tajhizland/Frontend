"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/coupon/TableRow";
import {update} from "@/services/api/admin/coupon";
import {toast} from "react-hot-toast";
import {CouponResponse} from "@/services/types/coupon";


export default function Page() {
    async function submit(e: CouponResponse) {
        let response = await update(
            {
                id: e.id,
                code: e.code,
                start_time: e.start_time,
                end_time: e.end_time,
                status: e.status,
                price: e.price,
                percent: e.percent,
                min_order_value: e.min_order_value,
                max_order_value: e.max_order_value,
                user_id: e.user_id
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "مدیریت تخفیفات",
                href: "coupon"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت تخفیفات
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/coupon/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/coupon/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
