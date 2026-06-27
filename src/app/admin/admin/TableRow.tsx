import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {UserResponse} from "@/services/types/user";

export const columns = defineColumns<UserResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'name', header: 'نام کاربر', editable: true},
    {key: 'wallet', header: 'موجودی کیف پول', editable: false},
    {key: 'username', header: 'نام کاربری', editable: true},
    {
        key: 'role',
        header: 'نقش',
        editable: true,
        filter: 'select',
        options: [
            {
                label: "کاربر",
                value: "user"
            },
            {
                label: "مدیر",
                value: "admin"
            }],
        render: (row) => row.role == "admin" ? <Badge name={"مدیر"} color={"green"}/> :
            <Badge name={"کاربر"} color={"indigo"}/>,

    },

]);
export const actions = defineActions<UserResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        href: (row) => `user/edit/${row.id}`
    },
])
