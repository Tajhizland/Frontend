"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import { columns} from "@/app/admin/slider/TableRow";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {toast} from "react-hot-toast";
import {useParams} from "next/navigation";
import {DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {UrlObject} from "node:url";
import {removeSlider} from "@/services/api/admin/campaignSlider";

export default function Page() {
    const {id} = useParams();

    async function removeItem(id: any) {
        let response = await removeSlider(Number(id));
        toast.success(response?.message as string)
    }

    const buttons: DataTableButtons[] = [
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
            type: "link",
            colorClass: "bg-white text-white border border-slate-900 outline-none ",
            href: (value: any): UrlObject => {
                return {
                    pathname: "/admin/campaign/" + id + "/slider/edit/" + value,
                };
            }
        },
    ]

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
            <DataTable
                apiUrl={"admin/campaign-slider/dataTable/" + id}
                columns={columns}
                buttons={buttons}
                onDelete={removeItem}
            />


        </Panel>
    </>)
}
