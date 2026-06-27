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
import {deleteBanner, campaignBannerTable} from "@/services/api/admin/campaignBanner";
import {useParams} from "next/navigation";
import {useMemo} from "react";

export default function Page() {
    const {id} = useParams();
    const fetcher = useMemo(() => campaignBannerTable(id), [id]);

    async function removeItem(ids: any) {
        let response = await deleteBanner(ids);
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "جشنواره",
                href: "campaign"
            },
            {
                title: "بنر ها",
                href: "campaign/" + id + "/banner"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت بنر ها
            </PageTitle>
            <PageLink>
                <Link href={"/admin/campaign/" + id + "/banner/create" as Route}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
                <Link href={{pathname: "/admin/campaign/" + id + "/banner/sort"}}>
                    <ButtonPrimary> سورت کردن بنر هوم پیج</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                onDelete={removeItem}
                fetcher={fetcher}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
