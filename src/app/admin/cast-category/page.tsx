"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/cast-category/TableRow";
import {castCategoryTable} from "@/services/api/admin/castCategory";

export default function Page() {


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته tajhizcast",
                href: "cast-category",
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دسته cast
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/cast-category/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                fetcher={castCategoryTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
