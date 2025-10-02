"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/admin/TableRow";
import {adminLoginUser, update} from "@/services/api/admin/user";
import {toast} from "react-hot-toast";
import {UserResponse} from "@/services/types/user";
import {DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {UrlObject} from "node:url";
import {setCookie} from "cookies-next";
import {useState} from "react";

export default function Page() {
    const [loadingLogin, setLoadingLogin] = useState(false);

    async function submit(e: UserResponse) {
        let response = await update(
            {
                id: e.id,
                name: e.name,
                last_name: e.last_name,
                national_code: e.national_code,
                username: e.username,
                email: e.email,
                gender: e.gender + "",
                role: e.role
            }
        )
        toast.success(response?.message as string)
    }

    const loginToUser = async (id: number) => {
        setLoadingLogin(true);

        const response = await adminLoginUser(id);
        if (response) {
            setCookie('token', response?.token);
            window.location.href = "/";
        }
        setLoadingLogin(false);

    }

    const buttons: DataTableButtons[] = [
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
            type: "link",
            colorClass: "bg-white text-white border border-slate-900 outline-none ",
            href: (value: any): UrlObject => {
                return {
                    pathname: 'user/edit/' + value,
                };
            }
        },
        {
            label: loadingLogin ? "در حال ورود" : "ورود",
            type: "action",
            colorClass: "bg-white text-black border border-slate-900 outline-none ",
            action: (id: number) => {
                loginToUser(id)
            }
        },
    ]

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "ادمین ها",
                href: "admin"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت ادمین ها
            </PageTitle>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/user/admin/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
