"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/brand/TableRow";
import { brandTable, update } from "@/services/api/admin/brand";
import { toast } from "react-hot-toast";
import {BrandResponse} from "@/services/types/brand";

export default function Page() {

    const submit = (e: BrandResponse) =>
        update(e.id, {name: e.name,
                url: e.url,
                status: e.status,
                image: null,
                banner: null,
                description: e.description,
            });

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
                <Link href={"/admin/brand/create"}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
                <Link href={"/admin/brand/sort"}>
                    <ButtonPrimary> سورت کردن</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={brandTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
