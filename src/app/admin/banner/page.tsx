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
import {deleteBanner, bannerTable} from "@/services/api/admin/banner";

export default function Page() {

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
                <ToolbarButton href="/admin/banner/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
                <ToolbarButton href="/admin/banner/sort" icon={<LuArrowDownUp className="w-4 h-4" />}>سورت کردن بنر هوم پیج</ToolbarButton>
            </PageLink>
            <Table
                onDelete={deleteBanner}
                fetcher={bannerTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
