"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import { columns } from "@/app/admin/user/TableRow";
import { adminLoginUser, update, userTable } from "@/services/api/admin/user";
import { toast } from "react-hot-toast";
import { UserResponse } from "@/services/types/user";
import { defineActions } from "@/shared/Table/types";
import { HiMiniPencil } from "react-icons/hi2";
import { setCookie } from "cookies-next";
import { useState } from "react";
import {useApiMutation} from "@/hooks/useApiMutation";

export default function Page() {
    

    const submit = (e: UserResponse) =>
        update(e.id, {name: e.name,
                last_name: e.last_name,
                national_code: e.national_code,
                username: e.username,
                email: e.email,
                gender: e.gender + "",
                role: e.role
            });

    const loginMutation = useApiMutation((userId: number) => adminLoginUser(userId), {
        silent: true,
        onSuccess: (response) => {
            const oneYear = Date.now() + 365 * 24 * 60 * 60 * 1000;
            setCookie("token", response.token, {
                domain: "tajhizland.com",
                path: "/",
                expires: new Date(oneYear),
            });
            window.location.href = "/";
        },
    });

    const actions = defineActions<UserResponse>([
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"} />,
            href: (row) => `user/edit/${row.id}`
        },
        {
            label: loginMutation.isPending ? "در حال ورود" : "ورود",
            color: "primary",
            onClick: (row) => {
                loginMutation.mutate(row.id)
            }
        },
    ])

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "کاربران",
                href: "user"
            }
        ]} />
        <Panel>
            <PageTitle>
                مدیریت کاربران
            </PageTitle>
            <Table
                onEdit={submit}
                fetcher={userTable}
                columns={columns}
                actions={actions}
            />


        </Panel>
    </>)
}
