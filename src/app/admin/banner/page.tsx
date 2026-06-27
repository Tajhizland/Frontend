"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/banner/TableRow";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {Route} from "next";
import {toast} from "react-hot-toast";
import {deleteBanner, bannerTable} from "@/services/api/admin/banner";

export default function Page() {

    async function removeItem(id: any) {
        let response = await deleteBanner(id);
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "بنر ها",
                href: "banner"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت بنر ها
            </PageTitle>
            <PageLink>
                <Link href={"/admin/banner/create" as Route}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
                <Link href={{pathname: "/admin/banner/sort"}}>
                    <ButtonPrimary> سورت کردن بنر هوم پیج</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                onDelete={removeItem}
                fetcher={bannerTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
