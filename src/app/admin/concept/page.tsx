"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/concept/TableRow";
 import { toast } from "react-hot-toast";
import {ConceptResponse} from "@/services/types/concept";
import {fastUpdate, conceptTable} from "@/services/api/admin/concept";

export default function Page() {

    const submit = (e: ConceptResponse) =>
        fastUpdate(e.id, {title: e.title,
                status: e.status,
            });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "concept",
                href: "concept"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت concept
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/concept/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
            </PageLink>
            <Table
            onEdit={submit}
                fetcher={conceptTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
