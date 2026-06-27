"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import { columns} from "@/app/admin/slider/TableRow";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {toast} from "react-hot-toast";
import {useParams} from "next/navigation";
import {defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {SliderResponse} from "@/services/types/slider";
import {removeSlider, campaignSliderTable} from "@/services/api/admin/campaignSlider";
import {useMemo} from "react";

export default function Page() {
    const {id} = useParams();
    const fetcher = useMemo(() => campaignSliderTable(id), [id]);

    async function removeItem(id: any) {
        let response = await removeSlider(Number(id));
        toast.success(response?.message as string)
    }

    const actions = defineActions<SliderResponse>([
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
            href: (row) => `/admin/campaign/${id}/slider/edit/${row.id}`
        },
    ])

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "جشنواره",
                href: "campaign"
            },
            {
                title: "اسلایدر ها",
                href: "campaign/" + id + "/slider"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت اسلایدر جشنواره
            </PageTitle>
            <PageLink>
                <Link href={"/admin/campaign/" + id + "/slider/create"}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
                <Link href={"/admin/campaign/" + id + "/slider/sort-mobile"}>
                    <ButtonPrimary> سورت اسلایدر موبایل</ButtonPrimary>
                </Link>
                <Link href={"/admin/campaign/" + id + "/slider/sort-desktop"}>
                    <ButtonPrimary> سورت اسلایدر دسکتاپ</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                fetcher={fetcher}
                columns={columns}
                actions={actions}
                onDelete={removeItem}
            />


        </Panel>
    </>)
}
