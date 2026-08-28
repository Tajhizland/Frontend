"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuArrowDownUp, LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import { columns} from "@/app/admin/slider/TableRow";
import PageLink from "@/shared/PageLink/PageLink";
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


    const actions = defineActions<SliderResponse>([
        {
            label: <HiMiniPencil className={"w-4 h-4"} title={"ویرایش"}/>,
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
                <ToolbarButton href={"/admin/campaign/" + id + "/slider/create"} icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
                <ToolbarButton href={"/admin/campaign/" + id + "/slider/sort-mobile"} icon={<LuArrowDownUp className="w-4 h-4" />}>سورت اسلایدر موبایل</ToolbarButton>
                <ToolbarButton href={"/admin/campaign/" + id + "/slider/sort-desktop"} icon={<LuArrowDownUp className="w-4 h-4" />}>سورت اسلایدر دسکتاپ</ToolbarButton>
            </PageLink>
            <Table
                fetcher={fetcher}
                columns={columns}
                actions={actions}
                onDelete={(id: any) => removeSlider(Number(id))}
            />


        </Panel>
    </>)
}
