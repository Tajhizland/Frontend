"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {DataRow, buttons, columns} from "@/app/admin/brand/TableRow";
import { update } from "@/services/api/admin/brand";
import { toast } from "react-hot-toast";

export default function Page() {

    async function submit(e: DataRow) {

        let response=await update(
            {
                id: e.id,
                name: e.name,
                url: e.url,
                status: e.status,
                image: e.image ,
                description: "",
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "برند",
                href: "brand"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت برند
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/brand/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
            onEdit={submit}
                apiUrl={"admin/brand/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
