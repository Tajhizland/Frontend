"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/vlog_category/TableRow";
 import {update, vlogCategoryTable} from "@/services/api/admin/vlogCategory";
import {toast} from "react-hot-toast";
import {VlogCategoryResponse} from "@/services/types/vlogCategory";


export default function Page() {
    async function submit(e: VlogCategoryResponse) {
        let response=await update(
            {
                id: e.id,
                name: e.name as string,
                url: e.url as string,
                status: Number(e.status) ,
            }
        )
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته بندی ولاگ",
                href: "vlog_category"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دسته بندی ولاگ
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/vlog_category/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
     <Link href={{pathname: "/admin/vlog_category/sort"}}>
                    <ButtonPrimary> سورت کردن</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={vlogCategoryTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
