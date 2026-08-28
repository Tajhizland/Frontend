"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuArrowDownUp, LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/slider/TableRow";
import PageLink from "@/shared/PageLink/PageLink";
import {removeSlider, sliderTable} from "@/services/api/admin/slider";
import {toast} from "react-hot-toast";

export default function Page() {


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "اسلایدر ها",
                href: "slider"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت اسلایدر ها
            </PageTitle>
            <PageLink>
                <ToolbarButton href="/admin/slider/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
                <ToolbarButton href="/admin/slider/sort-mobile" icon={<LuArrowDownUp className="w-4 h-4" />}>سورت اسلایدر موبایل</ToolbarButton>
                <ToolbarButton href="/admin/slider/sort-desktop" icon={<LuArrowDownUp className="w-4 h-4" />}>سورت اسلایدر دسکتاپ</ToolbarButton>
            </PageLink>
            <Table
                fetcher={sliderTable}
                columns={columns}
                actions={actions}
                onDelete={(id: any) => removeSlider(Number(id))}
            />


        </Panel>
    </>)
}
