"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/option/TableRow";
import {optionTable, update} from "@/services/api/admin/option";
import {toast} from "react-hot-toast";
import {OptionResponse} from "@/services/types/option";


export default function Page() {
    const submit = (e: OptionResponse) =>
        update(e.id, {title: e.title,
                status: e.status,
                category_id:e.category_id
            });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "ویژگی ها",
                href: "option"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت ویژگی ها
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/option/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={optionTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
