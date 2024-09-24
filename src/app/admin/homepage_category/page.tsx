"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/homepage_category/TableRow";
import {toast} from "react-hot-toast";
import {remove} from "@/services/api/admin/homepageCategory";


export default function Page() {
    async function removeItem(id: any) {
        let response = await remove(id);
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته‌بندی صفحه اصلی",
                href: "homepage_category"
            }
        ]}/>
        <Panel>
            <PageTitle>
                دسته‌بندی صفحه اصلی
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/homepage_category/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onDelete={removeItem}
                apiUrl={"admin/homepage_category/dataTable"}
                columns={columns}
                buttons={[]}
            />
        </Panel>
    </>)
}
