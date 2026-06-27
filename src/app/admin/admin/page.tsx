"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import { columns } from "@/app/admin/admin/TableRow";
import { adminLoginUser, update, adminUserTable } from "@/services/api/admin/user";
import { toast } from "react-hot-toast";
import { UserResponse } from "@/services/types/user";
import { defineActions } from "@/shared/Table/types";
import { HiMiniPencil } from "react-icons/hi2";
import { setCookie } from "cookies-next";
import { useState } from "react";

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
            let oneYear = Date.now() + 365 * 24 * 60 * 60 * 1000;
            setCookie('token', response.token, {
                domain: "tajhizland.com",
                path: "/",
                expires: new Date(oneYear),
            });
            window.location.href = "/";
        }
        setLoadingLogin(false);

    }

    const actions = defineActions<UserResponse>([
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"} />,
            href: (row) => `user/edit/${row.id}`
        },
        {
            label: loadingLogin ? "در حال ورود" : "ورود",
            color: "primary",
            onClick: (row) => {
                loginToUser(row.id)
            }
        },
    ])

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "ادمین ها",
                href: "admin"
            }
        ]} />
        <Panel>
            <PageTitle>
                مدیریت ادمین ها
            </PageTitle>
            <Table
                onEdit={submit}
                fetcher={adminUserTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
