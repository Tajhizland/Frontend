"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuArrowDownUp, LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/banner/TableRow";
import PageLink from "@/shared/PageLink/PageLink";
import {toast} from "react-hot-toast";
import {deleteBanner, campaignBannerTable} from "@/services/api/admin/campaignBanner";
import {useParams} from "next/navigation";
import {useMemo} from "react";

export default function Page() {
    const {id} = useParams();
    const fetcher = useMemo(() => campaignBannerTable(id), [id]);


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
                <ToolbarButton href={"/admin/campaign/" + id + "/banner/create"} icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
                <ToolbarButton href={"/admin/campaign/" + id + "/banner/sort"} icon={<LuArrowDownUp className="w-4 h-4" />}>سورت کردن بنر هوم پیج</ToolbarButton>
            </PageLink>
            <Table
                onDelete={deleteBanner}
                fetcher={fetcher}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
